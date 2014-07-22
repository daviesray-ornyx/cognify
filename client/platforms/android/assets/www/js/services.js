angular.module('myApp.Services',[])
    .factory('AuthService', function($http) {
        return {
            currentUser: {
                isLoggedIn : false,
                username : "",
                IQ : "",
                Tests : []
            },
            registerUser : function (user) {
                alert('Into user services!!!!');
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/users',
                    data: {'username' : user.username, 'password' : user.password}
                });
            },
            processLogin: function (user) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/users/login',
                    data: {'username': user.username, 'password': user.password}
                });
            }
        }
    })
    .factory('TestService', function($http) {
        return {
            currentTest: {
                isLoggedIn : false,
                username : "",
                IQ : "",
                Tests : []
            },
            createTest : function (test) {
                alert('Into user services!!!!');
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/tests',
                    data: test
                });
            }

        }
    })

