var app = window.angular.module('app', ['chart.js']);
app.controller('mainCtrl', mainCtrl)

function mainCtrl ($scope,$http) {
  $scope.total = 10;
  $scope.height = {
  	feet:5,
  	inches:11,
    total:0,
  	gender: "Male",
  };
  $scope.height.total = $scope.height.feet * 12 + $scope.height.inches;

  $scope.submitHeight = function(){
   $http.post("api/height",$scope.height)
       .then(function (resp) {
         console.log(resp);
       })
  };
  $scope.change = function(){
    if($scope.height.inches >= 12){
      var rem = $scope.height.inches % 12;
      $scope.height.feet += ($scope.height.inches - rem)/12;
      $scope.height.inches = rem;
    }
    $scope.height.total = $scope.height.feet * 12 + $scope.height.inches
  };

  //graph stuff
  $scope.series = ['Male', 'Female'];
  $scope.labels = [];
  $scope.data = [[],[]];

  $http.get("api/heights").then(function(resp){
    //we get all of the heights, but we need to group them by total inches
    var totalInches = {};
    var inchesKeys = [];
    angular.forEach(resp.data,function(height){
      if(["Male","Female"].indexOf(height.gender) == -1 ){
        console.log("There are only two genders");
      }else{
        if(!(height.total in totalInches)){
          totalInches[height.total] = {Male:0,Female:0};
          inchesKeys.push(height.total);
        }
        totalInches[height.total][height.gender] += 1;
      }
    });
    //take the keys and sort them
    inchesKeys.sort();
    $scope.labels = inchesKeys;
    var maleHeights = [];
    var femaleHeights = [];
    angular.forEach(inchesKeys,function(key){
      maleHeights.push(totalInches[key].Male);
      femaleHeights.push(totalInches[key].Female);
    });
    $scope.data = [maleHeights,femaleHeights];
  });

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
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