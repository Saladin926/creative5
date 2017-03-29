var app = window.angular.module('app', ['chart.js']);
app.factory('heightInterfacer', heightInterfacer)
app.controller('mainCtrl', mainCtrl)



function heightInterfacer ($http) {

  var API_ROOT = 'api/height'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post worked");
         })
    }
  }
}




function mainCtrl ($scope) {
  $scope.total = 10;
  $scope.height = {
  	feet:5,
  	inches:11,
    total:0,
  	gender: "Male",
  };
  $scope.height.total = $scope.height.feet * 12 + $scope.height.inches;

  $scope.submitHeight = function(){
    console.log('submit');
    console.log($scope.height);
  };


  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  $scope.change = function(){
    if($scope.height.inches >= 12){
      var rem = $scope.height.inches % 12;
      $scope.height.feet += ($scope.height.inches - rem)/12;
      $scope.height.inches = rem;
    }
    $scope.height.total = $scope.height.feet * 12 + $scope.height.inches
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };


}