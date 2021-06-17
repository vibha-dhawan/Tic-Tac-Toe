var app = angular.module('myApp',[]);

app.controller('myController',function($scope){
    $scope.enter=function()
    {
    	window.location.href="tictactoe.html";
    }
});