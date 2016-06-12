angular.module('scrapApp').config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/login.html',
        controller: 'LoginController'
      })
      .when('/options', {
        templateUrl: '/partials/options.html',
        controller: 'OptionsController'
      })
      .when('/download', {
        templateUrl: '/partials/download.html',
        controller: 'DownloadController'
      });
  });
