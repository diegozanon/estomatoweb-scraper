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

  var options = require("./lib/enums").options;

  var rows = [
    [{ obj: options.NAME }, { obj: options.CITY }, { obj: options.EXTERNAL_LESION }],
    [{ obj: options.REGISTRATION }, { obj: options.STATE }, { obj: options.INTERNAL_LESION }],
    [{ obj: options.DOB }, { obj: options.SMOKE }, { obj: options.INTERNAL_LESION_LOC }],
    [{ obj: options.AGE_WHEN_DIAGNOSED }, { obj: options.STOPPED_SMOKING }, { obj: options.CLINICAL_DIAGNOSIS }],
    [{ obj: options.GENRE }, { obj: options.DRINK }, { obj: options.ADDITIONAL_EXAMS }],
    [{ obj: options.NEIGHBORHOOD }, { obj: options.STOPPED_DRINKING }, { obj: options.FINAL_DIAGNOSIS }]
  ];

  _.map(rows, function(row) {
    return _.map(row, function(item) {
      item.name = item.obj.txt;
      item.code = item.obj.code;
      item.selected = true;
      delete item.obj;
      return item;
    });
  });

  $scope.rows = rows;

  function isSelected(option) {

    var selected =
      _.chain($scope.rows)
      .flatMapDeep()
      .filter(o => o.code === option.code)
      .map(o => o.selected)
      .head()
      .value();

    return selected;
  }

  $scope.continue = function() {

    DataService.setOptions({
      name: isSelected(options.NAME),
      registration: isSelected(options.REGISTRATION),
      dob: isSelected(options.DOB),
      ageWhenDiagnosed: isSelected(options.AGE_WHEN_DIAGNOSED),
      genre: isSelected(options.GENRE),
      neighborhood: isSelected(options.NEIGHBORHOOD),
      city: isSelected(options.CITY),
      state: isSelected(options.STATE),
      smoke: isSelected(options.SMOKE),
      stoppedSmoking: isSelected(options.STOPPED_SMOKING),
      drink: isSelected(options.DRINK),
      stoppedDrinking: isSelected(options.STOPPED_DRINKING),
      externalLesion: isSelected(options.EXTERNAL_LESION),
      internalLesion: isSelected(options.INTERNAL_LESION),
      internalLesionLoc: isSelected(options.INTERNAL_LESION_LOC),
      clinicalDiagnosis: isSelected(options.CLINICAL_DIAGNOSIS),
      additionalExams: isSelected(options.ADDITIONAL_EXAMS),
      finalDiagnosis: isSelected(options.FINAL_DIAGNOSIS)
    });

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
  var constants = require("./lib/constants");

  var loginData = {
      email: DataService.getEmail(),
      password: DataService.getPassword(),
      options: DataService.getOptions()
  };

  var scrapModules = {
      login: login,
      pageNavigator: pageNavigator,
      targetData: patientData,
      writer: fileWriter
  };

  scrap.start(loginData, scrapModules, function(err) {
      if(err) {
        console.error(err.stack || err);
        return;
      }

      $scope.showFinishedMsg = true;
      $scope.$apply();
      console.log("Finished with success.");
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

  $scope.openFolder = function() {
    var fullpath = utils.getFullPath(constants.FILE_NAME);
    nw.Shell.showItemInFolder(fullpath);
  };
});
