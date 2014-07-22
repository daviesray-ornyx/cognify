// Ionic myApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'myApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myApp', ['ionic','myApp.controllers','myApp.Services']).

    run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }).

    /*config(function($compileProvider){
        // Set the whitelist for certain URLs just to be safe
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }).*/

    config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })
            .state('reg', {
                url: '/reg',
                templateUrl: 'templates/reg.html',
                controller: 'RegController'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'templates/profile.html',
                controller: 'UserController'
            })
            .state('auth', {
                url: '/auth',
                templateUrl: 'templates/auth.html',
                controller: 'AuthController'
            })
            .state('test', {
                url: '/test',
                templateUrl: 'templates/test.html',
                controller: 'TestController'
            })
            .state('testing', {
                url: '/testing',
                templateUrl: 'templates/testing.html',
                controller: 'TestController'
            })



            $urlRouterProvider.otherwise("/home");
    })





