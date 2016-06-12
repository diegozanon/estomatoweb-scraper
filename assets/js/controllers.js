var ctrls = angular.module('scrapControllers', []);

ctrls.controller('LoginController', function(DataService, $scope, $location) {
  $scope.login = {};
  $scope.errMsg = false;

  $scope.continue = function() {

    if (!$scope.login.email || !$scope.login.password) {
      $scope.errMsg = true;
      return;
    }

    DataService.setEmail($scope.login.email);
    DataService.setPassword($scope.login.password);

    $location.url('options');
  }
});

ctrls.controller('OptionsController', function(DataService, $scope, $location) {

  $scope.continue = function() {

    $location.url('download');
  }
});

ctrls.controller('DownloadController', function(DataService, $scope) {

  var scrap = require("./lib/scrap");
  var login = require("./lib/login");
  var pageNavigator = require("./lib/pageNavigator");
  var patientData = require("./lib/patientData");
  var fileWriter = require("./lib/fileWriter");
  var utils = require("./lib/utils");

  var loginData = {
      email: DataService.getEmail(),
      password: DataService.getPassword()
  };

  var scrapModules = {
      login: login,
      pageNavigator: pageNavigator,
      targetData: patientData,
      writer: fileWriter
  };

  scrap.start(loginData, scrapModules, function(err) {
      if(err) throw err;
      $scope.showFinishedMsg = true;
      $scope.$apply();
  });

  $scope.downloadValue = 0;

  setInterval(function() {
    var loginFailed = utils.getLoginFailed();
    if (loginFailed !== undefined) {
      if (loginFailed) {
        $scope.loginFailed = true;
      } else {
        $scope.loginSuccess = true;
      }
    }

    var nbOfPatients = utils.getNbOfPatients();
    if (nbOfPatients > 0) {
      $scope.nbOfPatients = nbOfPatients;
    }

    $scope.downloadValue = utils.getPercentage();
    if ($scope.downloadValue > 0) {
      $scope.downloadPercentage = $scope.downloadValue.toFixed(0) + '%';
    }

    $scope.$apply();
  }, 250);
});
