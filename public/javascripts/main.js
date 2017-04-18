var app = window.angular.module('app', ['chart.js']);
app.controller('mainCtrl', mainCtrl)

function mainCtrl ($scope,$http) {
  $scope.login = false;
  $http.get('/user').then(function(resp){
    if(typeof resp.data !== 'undefined' && typeof resp.data.user !== 'undefined') {
      $scope.login = resp.data.user;
    }
  });

  $scope.weight = {'day' : new Date(), 'weight' : 150};

  $scope.submitWeight = function(){
   $http.post("api/weight",$scope.weight)
       .then(function (resp) {
         $scope.updateGraph();
       })
  };

  //graph stuff
  $scope.series = [];
  $scope.labels = [];
  $scope.data = [];

  $scope.updateGraph = function(){
    $http.get("api/weights").then(function(resp){
      // Generate the day labels for the graph. We'll use the current month to today.
      var labels = [];
      var dateObj = new Date();
      var day = dateObj.getUTCDate();
      var month = dateObj.getUTCMonth() + 1; //months are zero indexed
      var year = dateObj.getUTCFullYear();
      if (month < 10) {
        month = '0'+month;
      }
      for (var i = 1; i <= day; i++) {
        labels.push((i < 10 ?  '0'+i : i )+'-'+month+'-'+year);
      }
      $scope.labels = labels;

      // Hold all of the weight data in a 2D array
      var allWeights = [];
      // Generate the Series names (we'll keep them anonymous)
      var series = [];
      var userCount = 0;
      angular.forEach(resp.data, function(user) {
        if (typeof user.weightlog === 'undefined') {
          // Skip over users that don't have any weight data yet
          return;
        }
        // Go through all the days and collect user weight data
        var weightData = [];
        var hasDataInRange = false;
        angular.forEach(labels, function(key) {
          if (typeof user.weightlog[key] !== 'undefined') {
            weightData.push(user.weightlog[key]);
            hasDataInRange = true;
          } else {
            weightData.push(0);
          }
        });
        if (hasDataInRange) {
          // Add all the user's weight log to the weights
          allWeights.push(weightData);
          series.push('User #' + userCount++);
        }
      });

      $scope.series = series;
      $scope.data = allWeights;
    });
  };
  $scope.updateGraph();


  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}