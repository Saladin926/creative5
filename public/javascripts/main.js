var app = window.angular.module('app', ['chart.js']);
app.controller('mainCtrl', mainCtrl);

function mainCtrl ($scope) {

  $scope.height = {
  	feet:6,
  	inch:11,
  	gender: "Male",
  };


  $scope.submitHeight = function() {/*
    var formData = {name:$scope.Name,avatarUrl:$scope.Url};
    console.log(formData);
    pokemonFetcher.post(formData); // Send the data to the back end
    $scope.pokemon.push(formData); // Update the model*/
    console.log('submit');
  }


}