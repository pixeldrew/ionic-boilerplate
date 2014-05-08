define(['app'], function(app) {

    app.controller('HomeController', ['$scope', function($scope) {

        $scope.booted = "I'm alive!";

    }]);

});