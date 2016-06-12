var services = angular.module('scrapServices', []);

services.factory('DataService', function() {

    var email = '';
    var password = '';

    return {

      getEmail: function() {
        return email;
      },

      setEmail: function(val) {
        email = val;
      },

      getPassword: function() {
        return password;
      },

      setPassword: function(val) {
        password = val;
      }
    };
  });
