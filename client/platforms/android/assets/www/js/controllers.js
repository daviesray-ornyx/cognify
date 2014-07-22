angular.module('myApp.controllers',[])
    .controller('AuthController',function($rootScope,$scope,$state,AuthService){
        $scope.user = AuthService.currentUser;
        $scope.user.username = AuthService.currentUser.username;
        $scope.user.password = "";
        $scope.login = function (user) {
            AuthService.processLogin(user).success(function(userr, status, headers, config) {
                AuthService.currentUser = userr;
                AuthService.currentUser.isLoggedIn = true;
                // take user to profile page
                $rootScope.$broadcast('successfulLoginEvent');
                $state.go('profile');
            }).error(function(data, status, headers, config) {
                return;
            })

        }
    })
    .controller('UserController',function($scope,$state,AuthService){
        if(!AuthService.currentUser.isLoggedIn)
            $state.go('auth');
        $scope.user = AuthService.currentUser;
        $scope.user.username = AuthService.currentUser.username;
        $scope.user.IQ = AuthService.currentUser.IQ;
        $scope.user.tests = AuthService.currentUser.Tests;


    })
    .controller('RegController',function($scope,$state,AuthService){
        $scope.user = {};
        $scope.user.username = "";
        $scope.user.password = "";
        $scope.user.confirmPassword = "";
        $scope.registerUser = function (user) {
            $scope.user = user;
            if($scope.user.password != $scope.user.confirmPassword)
                return;
            AuthService.registerUser($scope.user).success(function(user, status, headers, config) {
                AuthService.currentUser = user;
                $state.go('profile');
            }).error(function(data, status, headers, config) {
                return;
            })

        }
    })
    .controller('MainController',function($scope,AuthService,TestService,$state,$ionicSideMenuDelegate){

        $scope.createTest = function(){
            var test = {
                scenario : "This is a brand new test omera",
                weight : 3,
                questions : [
                    {
                        description : "where the hell are we?",
                        points : 2,
                        answers : ["Nowhere","Somewhere","Here","There"]
                    },
                    {
                        description : "where the hell are we not?",
                        points : 2,
                        answers : ["Nairobi","Kisumu","Mombasa","Nigeria"]
                    }
                ]
            }
            console.log(test);

            TestService.createTest(test).success(function(test, status, headers, confi){
                alert('Success Saving test');
            }).error(function(test, status, headers, confi){
                alert('Error saving user');
            })

        }

        $scope.setAuthStatusDetails = function (isLoggedIn) {
            if(isLoggedIn)
            {
                $scope.authStatusText = 'Logout';
                $scope.authStatusIcon = 'ion-log-out';
            }
            if(!isLoggedIn)
            {
                $scope.authStatusText = 'Login';
                $scope.authStatusIcon = 'ion-log-in';
            }
        }

        $scope.setAuthStatusDetails(AuthService.currentUser.isLoggedIn);

        $scope.showRegistrationItem = function () {
            return !AuthService.currentUser.isLoggedIn;
        }

        $scope.showAnonymousTestText = function () {
            return !AuthService.currentUser.isLoggedIn;
        }

        $scope.showLoginForm = function(){
            $state.go('auth');
        }

        $scope.showRegistrationForm = function () {
            $state.go('reg');
        }

        $scope.showTestingForm = function(){
            $state.go('testing');
        }

        $scope.showUserProfileForm = function () {
            $state.go('profile');
        }

        $scope.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.$on('successfulLoginEvent', function(){
            $scope.setAuthStatusDetails(AuthService.currentUser.isLoggedIn);
        })

    })
    .controller('HomeController',function($scope,$state,$ionicSideMenuDelegate){


    })
    .controller('TestController',function($scope,$state,AuthService){
        $scope.test = {}

        // need to keep track of whether the test should be anonymous or profiled!!

    })

