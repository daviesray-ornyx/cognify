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
                        points : 1,
                        answers : ["Nairobi","Kisumu","Mombasa","Nigeria"]
                    }
                ]
            }


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
    .controller('TestController',function($scope,$rootScope,$state,AuthService,TestService){

        $scope.setNextTestDetails = function(){
            $scope.test = TestService.currentTest;
            $scope.test.scenario = TestService.currentTest.scenario;
            $scope.test.weight = TestService.currentTest.weight;
            $scope.test.questions = TestService.currentTest.questions;
        }

        $scope.setNextTestDetails(TestService.currentTest);

        $scope.markTest = function(test){
            var totalScore = 0;
            for(var index in test.questions){
                for(var ansIndex in test.questions[index].answers){
                    if(test.questions[index].givenAnswer == test.questions[index].answers[ansIndex])
                    {
                        totalScore += test.questions[index].points;
                        break;
                    }
                }
            }
            //Update total score
            if(AuthService.isLoggedIn){
                // user is logged in
                    // update his details
                AuthService.currentUser.totalScore += totalScore;
                AuthService.currentUser.totalPossibleScore += test.weight;
                AuthService.currentUser.Tests.push(TestService.currentTest);    //update tests
                // update user details in server
                AuthService.updateScore(AuthService.currentUser,TestService.currentTest).
                    success(function(data, status, headers, config) {
                    // User score updated successfully
                        // show results page
                        $state.go('results');
                }).
                    error(function(data, status, headers, config) {
                    // Error updating user score
                        // Tell user to retry or that the updates wil be done another time
                    return;
                })
            }
            else{
                // User profile not being tracked. Calculate IQ and displa
                AuthService.currentUser.totalScore = totalScore;
                AuthService.currentUser.totalPossibleScore = test.weight
                // show results page
                $state.go('results');
            }
        }

        $scope.showResults = function(){
            //We handle showing of results
            //$scope.isResultsMode = true;
        }

        $scope.$on('successfulNextTestRetrieval', function(){
            $scope.setNextTestDetails(TestService.currentTest);
        })

        // need to keep track of whether the test should be anonymous or profiled!!
        TestService.getNextTest(AuthService.currentUser.username).success(function(tester, status, headers, config) {
            //AuthService.currentUser = user;
            //$state.go('profile');
            TestService.currentTest = tester;
            console.log('answers found' + TestService.currentTest.questions[0].answers);
            //broadcast retrieval of current test
            $rootScope.$broadcast('successfulNextTestRetrieval');
        }).error(function(data, status, headers, config) {
            return;
        })
    })

