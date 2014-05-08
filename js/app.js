define(['ionic-angular'], function(angular) {

    'use strict';

    var app = angular.module('app', ['ionic'])
        .config(function() {

            /* Setup your application config here (routes/providers) */

        })
        .run(['$ionicPlatform', function($ionicPlatform) {
            $ionicPlatform.ready(function() {

            });
        }]);

    var $html = angular.element(document.getElementsByTagName('html')[0]);

    $html.ready(function() {
        angular.resumeBootstrap([app.name]);
    });

    return app;
});