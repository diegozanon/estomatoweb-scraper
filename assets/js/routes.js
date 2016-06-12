angular.module('scrapApp').config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/login.html',
        controller: 'LoginController'
      });
  });
