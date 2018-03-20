var app = angular.module("myApp", ['ngMaterial','ngRoute', 'ngMessages']);
var dataChamberDeputy = $.param({ legislator_chamber_sil: "diputado" }, {id_legislator_sil:1});
var dataChamberSenator = $.param({ legislator_chamber_sil: "senador" });
var supurl='http://localhost:8000';
// var supurl='http://104.239.248.102:8000';

function openPerfilPage (url){
  window.open(url)
}
app.controller('deputyController', ['$scope', '$http', '$cacheFactory', function ($scope, $http, $cacheFactory) {
  var lruCache = $cacheFactory('lruCache', { capacity:0 });

    $http({
      url: supurl+'/diputados/dip/get',
      method: "POST",
      cache:lruCache,
      headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
      data: dataChamberDeputy
    }).then(function(response) {
      $scope.status = response.status;
      $scope.data = response.data;
      arrAll = response.data.dip; //variable save array with all legislators in the api call
      var legislstors_all = [];

      console.log("Connected and Work Deputys :)", legislstors_all);

      if(arrAll){
        for (var i = 0; i < arrAll.length; i++) {

            val=arrAll[i];

            if(val.legislator_gender_senate=="Masculino"){
                val.legislator_chamber_sil="Diputado";
            }

            if(val.legislator_gender_senate=="Femenino"){
                val.legislator_chamber_sil="Diputada";
            }

            var state = val.legislator_state_sil.trim();
            console.log(state);
              if(val.legislator_election_sil == "RP" ){
                val.legislator_election_sil = "Representación Proporcional"
              }

              if(val.legislator_election_sil == "MR"){
                val.legislator_election_sil = "Mayoria Relativa"
              }

              if(val.legislator_election_sil == "PM"){
                val.legislator_election_sil = "Representación Proporcional"
              }

              var facebook = val.legislator_facebook_sil;

                if(facebook == "FACEBOOK" || facebook == null){
                  var class_none_facebook = "none";
                }else{
                      class_none_facebook = "block";
                }

                $scope.classFacebook = class_none_facebook;

              var twitter = val.legislator_twitter_senate;

                if(twitter == null){
                  var class_none_twitter = "none";
                }else{
                      class_none_twitter = "block";
                }

                $scope.classTwitter = class_none_twitter;


              var mail = val.legislator_mail_sil;

                if(mail == null){
                  var class_none_mail = "none";
                }else{
                      class_none_mail = "block";
                }

                $scope.classMail = class_none_mail;


            legislstors_all.push(val);
        }
        $scope.deputysApi=legislstors_all;
      }

    }, function(response) {
       $scope.data = response.data || 'Request failed';
       $scope.status = response.status;
       console.log("Connected Failed :(", response);
    });
 }]);

 app.controller('senatorController',  ['$scope', '$http', '$cacheFactory', function ($scope, $http, $cacheFactory) {
   var Cache = $cacheFactory('Cache', { capacity:0 });
     $http({
       url: supurl+'/diputaos/sen/get',
       method: "POST",
       cache:Cache,
       headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
       data: dataChamberSenator
     }).then(function(response) {
       $scope.status = response.status;
       $scope.data = response.data;
       console.log("Connected and Work Senators :)");
       arrAll = response.data.dip;

       if(arrAll){
         for (var i = 0; i < arrAll.length; i++) {
           val=arrAll[i];

           if(val.legislator_chamber_sil=="senador"){
             $scope.senatorsApi=response.data.dip;
             console.log(val.legislator_chamber_sil);
           }
         }
       }

     }, function(response) {
       $scope.data = response.data || 'Request failed';
       $scope.status = response.status;
       console.log("Connected Failed :(", response);
     });
  }]);
