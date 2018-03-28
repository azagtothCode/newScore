var app = angular.module("myApp", ['ngMaterial','ngRoute', 'ngMessages']);
var dataChamberDeputy = $.param({ legislator_chamber_sil: "diputado" }, {id_legislator_sil:1});
var dataChamberSenator = $.param({ legislator_chamber_sil: "senador" });
var supurl='http://localhost:8000';
// var supurl='http://104.239.248.102:8000';

function openPerfilPage (url){
  window.open(url)
}

app.controller('classCtrl', function ($scope) {

	$scope.isActive = false;

  $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
  }

  $scope.activeButtonDouble = function() {
    $scope.isActived = !$scope.isActived;
  }
});

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
      arrAll = response.data.dip; //variable save array with all legislators in the api call/

      // arrAll = [{id_legislator_sil: '9219728',id_photo_sil: '9219728',
      //           legislator_chamber_sil: 'diputado',
      //           legislator_name_sil: 'Javier Octavio Herrera Borunda',
      //           legislator_last_name_sil: 'Herrera Borunda',
      //           legislator_first_name_sil: 'Javier Octavio',
      //           legislator_status_sil: 'ACTIVO',
      //           legislator_party_sil: 'PVEM',
      //           legislator_score_sil: '100',
      //           legislator_age_sil: '25/06/1980',
      //           legislator_state_sil: ' Veracruz',
      //           legislator_city_sil: ' Cosamaloapan',
      //           legislator_election_sil: 'RP',
      //           legislator_zone_sil: 'Veracruz',
      //           legislator_protest_sil: '29/08/2015',
      //           legislator_mail_sil: 'javier.herrera@congreso.gob.mx',
      //           legislator_twitter_senate: 'javier.herrera@congreso.gob.mx',
      //           legislator_supl_sil: '9219729'}];

      var legislstors_all = [];
      $scope.filtersDeputys = { };
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

            var state = val.legislator_state_sil;
            var zone = val.legislator_zone_sil;
            // console.log("Estado"+ state);
            // console.log("Zona"+zone);

            if(state){
              val.legislator_state_sil = val.legislator_state_sil.trim().toLowerCase();
              if(val.legislator_state_sil == "baja california sur"){
                val.legislator_state_sil = "baja california s."
              }

              if(val.legislator_state_sil == "s/e"){
                val.legislator_state_sil = "cdmx"
              }
              if(val.legislator_state_sil == "df"){
                val.legislator_state_sil = "cdmx"
              }
              if(val.legislator_state_sil == "méxico"){
                val.legislator_state_sil = "cdmx"
              }
              if(val.legislator_state_sil == "distrito federal"){
                val.legislator_state_sil = "cdmx"
              }
            }

            if(zone){
              val.legislator_zone_sil = val.legislator_zone_sil.trim().toLowerCase();

              if(val.legislator_zone_sil == "baja california sur"){
                val.legislator_zone_sil = "bcs"
              }

              if(val.legislator_zone_sil == "baja california"){
                val.legislator_zone_sil = "bc"
              }

              if(val.legislator_zone_sil == "s/e"){
                val.legislator_zone_sil = "cdmx"
              }

              if(val.legislator_zone_sil == "df"){
                val.legislator_zone_sil = "cdmx"
              }

              if(val.legislator_zone_sil == "m&#xe9;xico"){
                val.legislator_zone_sil = "cdmx"
              }

              if(val.legislator_zone_sil == "distrito federal"){
                val.legislator_zone_sil = "cdmx"
              }

              if(val.legislator_zone_sil == "michoac&#xe1;n"){
                val.legislator_zone_sil = "michoacan"
              }

              if(val.legislator_zone_sil == "nuevo le&#xf3;n"){
                val.legislator_zone_sil = "nl"
              }

              if(val.legislator_zone_sil == "quintana roo"){
                val.legislator_zone_sil = "qr"
              }

              if(val.legislator_zone_sil == "yucat&#xe1;n"){
                val.legislator_zone_sil = "yucatan"
              }

              if(val.legislator_zone_sil == "n/a"){
                val.legislator_zone_sil = "cdmx"
              }

              if(val.legislator_zone_sil == "quer&#xe9;taro"){
                val.legislator_zone_sil = "queretaro"
              }

              if(val.legislator_zone_sil == "aguascalientes"){
                val.legislator_zone_sil = "agc"
              }

              if(val.legislator_zone_sil == "san luis potos&#xed;"){
                val.legislator_zone_sil = "slp"
              }
            }

            if(val.legislator_election_sil == "RP" ){
              val.legislator_election_sil = "Representación Proporcional"
            }

            if(val.legislator_election_sil == "MR"){
              val.legislator_election_sil = "Mayoria Relativa"
            }

            if(val.legislator_election_sil == "PM"){
              val.legislator_election_sil = "Representación Proporcional"
            }

            if(val.legislator_facebook_sil){
              $scope.classFacebook = "block";
            }else{
              $scope.classFacebook = "none";
            }

            if(val.legislator_twitter_senate){
              $scope.classTwitter = "block";
            }else{
              $scope.classFacebook = "none";
            }

            if(val.legislator_mail_sil){
              $scope.classMail = "block";
            }else{
              $scope.classMail = "none";
            }
            //

            //


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
       url: supurl+'/diputados/sen/get',
       method: "POST",
       cache:Cache,
       headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
       data: dataChamberSenator
     }).then(function(response) {
       $scope.status = response.status;
       $scope.data = response.data;
       arrAll = response.data.dip;

       // arrAll = [{id_legislator_sil: '9219728',id_photo_sil: '9219728',
       //           legislator_chamber_sil: 'diputado',
       //           legislator_name_sil: 'Javier Octavio Herrera Borunda',
       //           legislator_last_name_sil: 'Herrera Borunda',
       //           legislator_first_name_sil: 'Javier Octavio',
       //           legislator_status_sil: 'ACTIVO',
       //           legislator_party_sil: 'PVEM',
       //           legislator_score_sil: '100',
       //           legislator_age_sil: '25/06/1980',
       //           legislator_state_sil: ' Veracruz',
       //           legislator_city_sil: ' Cosamaloapan',
       //           legislator_election_sil: 'RP',
       //           legislator_zone_sil: 'Veracruz',
       //           legislator_protest_sil: '29/08/2015',
       //           legislator_mail_sil: 'javier.herrera@congreso.gob.mx',
       //           legislator_facebook_sil: 'javier.herrera@congreso.gob.mx',
       //           legislator_twitter_senate: 'javier.herrera@congreso.gob.mx',
       //           legislator_supl_sil: '9219729'}];

       var legislstors_all = [];
       $scope.filtersSenators = { };
       console.log("Connected and Work Senators :)", legislstors_all);

       if(arrAll){
         for (var i = 0; i < arrAll.length; i++) {

             val=arrAll[i];

             if(val.legislator_gender_senate=="Masculino"){
                 val.legislator_chamber_sil="Diputado";
             }

             if(val.legislator_gender_senate=="Femenino"){
                 val.legislator_chamber_sil="Diputada";
             }

             var state = val.legislator_state_sil;
             var zone = val.legislator_zone_sil;
             // console.log("Estado"+ state);
             // console.log("Zona"+zone);

             if(state){
               val.legislator_state_sil = val.legislator_state_sil.trim().toLowerCase();
               if(val.legislator_state_sil == "baja california sur"){
                 val.legislator_state_sil = "baja california s."
               }

               if(val.legislator_state_sil == "s/e"){
                 val.legislator_state_sil = "cdmx"
               }
               if(val.legislator_state_sil == "df"){
                 val.legislator_state_sil = "cdmx"
               }
               if(val.legislator_state_sil == "méxico"){
                 val.legislator_state_sil = "cdmx"
               }
               if(val.legislator_state_sil == "distrito federal"){
                 val.legislator_state_sil = "cdmx"
               }
             }

             if(zone){
               val.legislator_zone_sil = val.legislator_zone_sil.trim().toLowerCase();

               if(val.legislator_zone_sil == "baja california sur"){
                 val.legislator_zone_sil = "bcs"
               }

               if(val.legislator_zone_sil == "baja california"){
                 val.legislator_zone_sil = "bc"
               }

               if(val.legislator_zone_sil == "s/e"){
                 val.legislator_zone_sil = "cdmx"
               }

               if(val.legislator_zone_sil == "df"){
                 val.legislator_zone_sil = "cdmx"
               }

               if(val.legislator_zone_sil == "m&#xe9;xico"){
                 val.legislator_zone_sil = "cdmx"
               }

               if(val.legislator_zone_sil == "distrito federal"){
                 val.legislator_zone_sil = "cdmx"
               }

               if(val.legislator_zone_sil == "michoac&#xe1;n"){
                 val.legislator_zone_sil = "michoacan"
               }

               if(val.legislator_zone_sil == "nuevo le&#xf3;n"){
                 val.legislator_zone_sil = "nl"
               }

               if(val.legislator_zone_sil == "quintana roo"){
                 val.legislator_zone_sil = "qr"
               }

               if(val.legislator_zone_sil == "yucat&#xe1;n"){
                 val.legislator_zone_sil = "yucatan"
               }

               if(val.legislator_zone_sil == "n/a"){
                 val.legislator_zone_sil = "cdmx"
               }

               if(val.legislator_zone_sil == "quer&#xe9;taro"){
                 val.legislator_zone_sil = "queretaro"
               }

               if(val.legislator_zone_sil == "aguascalientes"){
                 val.legislator_zone_sil = "agc"
               }

               if(val.legislator_zone_sil == "san luis potos&#xed;"){
                 val.legislator_zone_sil = "slp"
               }
             }

             if(val.legislator_election_sil == "RP" ){
               val.legislator_election_sil = "Representación Proporcional"
             }

             if(val.legislator_election_sil == "MR"){
               val.legislator_election_sil = "Mayoria Relativa"
             }

             if(val.legislator_election_sil == "PM"){
               val.legislator_election_sil = "Representación Proporcional"
             }

             if(val.legislator_facebook_sil){
               $scope.classFacebook = "block";
             }else{
               $scope.classFacebook = "none";
             }

             if(val.legislator_twitter_senate){
               $scope.classTwitter = "block";
             }else{
               $scope.classFacebook = "none";
             }

             if(val.legislator_mail_sil){
               $scope.classMail = "block";
             }else{
               $scope.classMail = "none";
             }

             legislstors_all.push(val);
         }
         $scope.senatorsApi=legislstors_all;
       }

     }, function(response) {
       $scope.data = response.data || 'Request failed';
       $scope.status = response.status;
       console.log("Connected Failed :(", response);
     });
  }]);
