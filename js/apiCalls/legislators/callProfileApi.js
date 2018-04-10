var app = angular.module("myApp", ['ngMaterial']);
// var supurl='http://localhost:8000';
var supurl='http://104.239.248.102:8000';

function getQueryVariable(variable) {
   // Estoy asumiendo que query es window.location.search.substring(1);
   var query = window.location.search.substring(1);
   var vars = query.split("&");
  //  alert(vars);
   for (var i=0; i < vars.length; i++) {
       var pair = vars[i].split("=");
       if (pair[0] == variable) {
           return pair[1];
       }
   }
   return false;
}

var dataChamberSenator = $.param({ id_legislator_sil: (getQueryVariable('id'))});

app.controller('searchLegislatorController', ['$scope', '$http', function ($scope, $http) {
    $http({
      url: supurl+'/diputados/dip/get',
      method: "POST",
      cache:true,
      headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
      data: dataChamberSenator
    }).then(function(response) {
      $scope.status = response.status;
      $scope.data = response.data;
      console.log("Connected and Work Deputys :)");
      arrAll = response.data.dip;
      if(arrAll){
        for (var i = 0; i < arrAll.length; i++) {
            val=arrAll[i];
            console.log(val);
            $scope.nameProfile=val.legislator_name_sil;
        }
      }
    },function(response) {
      $scope.data = response.data || 'Request failed';
      $scope.status = response.status;
      console.log("Connected Failed :(", response);
    });
 }]);
