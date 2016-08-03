var app= angular.module('weatherApp', []);

app.factory('weatherApi', function($http){
  var obj={};
  obj.getLoc= function(){
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
  obj.getCurrent= function(city){
    var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var units = '&units=imperial';
    var appid = '&appid=17da82ca4defd04c287ca7be973a936a'
    var callbck = '&callback=JSON_CALLBACK';
    return $http.jsonp(api+city+units+appid+callbck);
  };
  return obj
});

app.controller('MainCtrl', function($scope, weatherApi){
  $scope.Data={};
  $scope.Data.unit='F';
  weatherApi.getLoc().success(function(data){
    var city= data.city+','+data.country;
    $scope.Data.city=data.city;
    $scope.Data.country=data.country;
    weatherApi.getCurrent(city).success(function(data){
      currentWeather(data)
    });
  });
  
  function currentWeather(data){
    $scope.Data.temp=Math.round(data.main.temp);
    $scope.Data.Cel = Math.round(data.main.temp);
    $scope.Data.des = data.weather[0].main;
    $scope.Data.Fah = Math.round( ($scope.Data.temp * 9)/5 + 32 );
    $scope.Data.humid= data.main.humidity;
    $scope.Data.low= Math.round(data.main.temp_min);
    $scope.Data.high= Math.round(data.main.temp_max);
    
  } 
});
  





