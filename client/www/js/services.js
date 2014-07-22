angular.module('myApp.Services',[])
    .factory('AuthService', function($http) {
        return {
            currentUser: {
                isLoggedIn : false,
                username : "",
                totalScore : 0,
                totalPossibleScore : 0,
                IQ : function(){
                    return totalScore/totalPossibleScore;
                },
                Tests : []
            },
            registerUser : function (user) {
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
            },
            updateScore : function (user,test,testScore) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/users/updateScore',
                    data: {'username' : user.username, 'test' : test,'testScore' : user.totalScore}
                });
            }
        }
    })
    .factory('TestService', function($http) {
        return {
            currentTest: {
            },
            createTest : function (test) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/tests/',
                    data: test
                });
            },
            getNextTest : function(username){
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/tests/getNextTest',
                    data : {'username' : username }
                });
            }

        }
    })

