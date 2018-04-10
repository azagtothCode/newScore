var app = angular.module("myApp", ['ngMaterial','ngRoute', 'ngMessages']);
// app.config( [ '$httpProvider', function( $httpProvider ) {
//     $httpProvider.defaults.cache = false;
// } ] );
var dataChamberDeputy = $.param({ legislator_chamber_sil: "diputado" }, {id_legislator_sil:1});
var dataChamberSenator = $.param({ legislator_chamber_sil: "senador" });
var supurl='http://localhost:8000';
// var supurl='http://104.239.248.102:8000';

// if (typeof(Storage) !== "undefined") {
//     // LocalStorage disponible
//     console.log("simon");
//     // localStorage.setItem("titulo", "Curso de Angular avanzado - Víctor Robles");
//     // console.log("Creada",localStorage.getItem("titulo"));
    // localStorage.removeItem("diputados");
//     // console.log("Eliminada",localStorage.getItem("titulo"));
//
// } else {
//   console.log("nariz");
//
//     // LocalStorage no soportado en este navegador
// }


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

    var customCache = $cacheFactory.get('customCache', {
        capacity: 0
    });

    $http({
      url: supurl+'/diputados/dip/get',
      method: "POST",
      cache: true,
      // mask: {
      //             save        : true, //tell that save request response in session
      //             fetch       : true, //check local data first before next fetch,
      //             fetchSource : true
      //        },
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
      //           legislator_legislature_sil:'LXIII',
      //           legislator_mail_sil: 'javier.herrera@congreso.gob.mx',
      //           legislator_facebook_sil: 'javier.herrera@congreso.gob.mx',
      //           legislator_twitter_senate: 'javier.herrera@congreso.gob.mx',
      //           legislator_supl_sil: '9219729'},
      //           {id_legislator_sil: '9219728',id_photo_sil: '9219728',
      //                     legislator_chamber_sil: 'diputado',
      //                     legislator_name_sil: 'Javier Octavio Herrera Borunda',
      //                     legislator_last_name_sil: 'Herrera Borunda',
      //                     legislator_first_name_sil: 'Javier Octavio',
      //                     legislator_status_sil: 'ACTIVO',
      //                     legislator_party_sil: 'PVEM',
      //                     legislator_score_sil: '100',
      //                     legislator_age_sil: '25/06/1980',
      //                     legislator_state_sil: ' Veracruz',
      //                     legislator_city_sil: ' Cosamaloapan',
      //                     legislator_election_sil: 'RP',
      //                     legislator_zone_sil: 'Veracruz',
      //                     legislator_protest_sil: '29/08/2015',
      //                     legislator_legislature_sil:'LXII',
      //                     legislator_mail_sil: 'javier.herrera@congreso.gob.mx',
      //                     legislator_facebook_sil: 'javier.herrera@congreso.gob.mx',
      //                     legislator_twitter_senate: 'javier.herrera@congreso.gob.mx',
      //                     legislator_supl_sil: '9219729'}];

      var legislstors_all_leg_deputy = [];
      $scope.filtersDeputys = { };

      if(arrAll){
        for (var i = 0; i < arrAll.length; i++) {

            val=arrAll[i];
              if(val.legislator_gender_sil=="M"){
                  val.legislator_chamber_sil="Diputado";
              }

              if(val.legislator_gender_sil=="F"){
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
                val.legislator_facebook_sil = val.legislator_facebook_sil;
              }else{
                val.legislator_facebook_sil = "none";
              }

              if(val.legislator_twitter_senate){
                val.legislator_twitter_senate = val.legislator_twitter_senate;
              }else{
                val.legislator_twitter_senate = "none";
              }

              if(val.legislator_mail_sil){
                val.legislator_mail_sil = val.legislator_mail_sil;
              }else{
                val.legislator_mail_sil = "none";
              }

            legislstors_all_leg_deputy.push(val);
        }
        $scope.deputysApi=legislstors_all_leg_deputy;
        console.log("Connected and Work Deputys :)" );
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
       cache:true,
       // mask: {
       //                   save        : true, //tell that save request response in session
       //                   fetch       : true, //check local data first before next fetch,
       //                   fetchSource : true
       //              },
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
       //           legislator_legislature_sil:'LXIII',
       //           legislator_mail_sil: 'javier.herrera@congreso.gob.mx',
       //           legislator_facebook_sil: 'javier.herrera@congreso.gob.mx',
       //           legislator_twitter_senate: 'javier.herrera@congreso.gob.mx',
       //           legislator_supl_sil: '9219729'},
       //           {id_legislator_sil: '9219728',id_photo_sil: '9219728',
       //                     legislator_chamber_sil: 'diputado',
       //                     legislator_name_sil: 'Javier Octavio Herrera Borunda',
       //                     legislator_last_name_sil: 'Herrera Borunda',
       //                     legislator_first_name_sil: 'Javier Octavio',
       //                     legislator_status_sil: 'ACTIVO',
       //                     legislator_party_sil: 'PVEM',
       //                     legislator_score_sil: '100',
       //                     legislator_age_sil: '25/06/1980',
       //                     legislator_state_sil: ' Veracruz',
       //                     legislator_city_sil: ' Cosamaloapan',
       //                     legislator_election_sil: 'RP',
       //                     legislator_zone_sil: 'Veracruz',
       //                     legislator_protest_sil: '29/08/2015',
       //                     legislator_legislature_sil:'LXII',
       //                     legislator_mail_sil: 'javier.herrera@congreso.gob.mx',
       //                     legislator_facebook_sil: 'javier.herrera@congreso.gob.mx',
       //                     legislator_twitter_senate: 'javier.herrera@congreso.gob.mx',
       //                     legislator_supl_sil: '9219729'}];

       var legislstors_all_sen = [];
       var legislstors_all_sen_legant = [];

       $scope.filtersSenators = { };

       if(arrAll){
         for (var i = 0; i < arrAll.length; i++) {

             val=arrAll[i];
          if(val.legislator_legislature_sil=="LXIII"){

             if(val.legislator_gender_sil=="M"){
                 val.legislator_chamber_sil="Senador";
             }

             if(val.legislator_gender_sil=="F"){
                 val.legislator_chamber_sil="Senadora";
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
               val.legislator_facebook_sil = val.legislator_facebook_sil;
             }else{
               val.legislator_facebook_sil = "none";
             }

             if(val.legislator_twitter_senate){
               val.legislator_twitter_senate = val.legislator_twitter_senate;
             }else{
               val.legislator_twitter_senate = "none";
             }

             if(val.legislator_mail_sil){
               val.legislator_mail_sil = val.legislator_mail_sil;
             }else{
               val.legislator_mail_sil = "none";
             }

             legislstors_all_sen.push(val);
           }

           if(val.legislator_legislature_sil=="LXII"){

              if(val.legislator_gender_sil=="M"){
                  val.legislator_chamber_sil="Senador";
              }

              if(val.legislator_gender_sil=="F"){
                  val.legislator_chamber_sil="Senadora";
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
                val.legislator_facebook_sil = val.legislator_facebook_sil;
              }else{
                val.legislator_facebook_sil = "none";
              }

              if(val.legislator_twitter_senate){
                val.legislator_twitter_senate = val.legislator_twitter_senate;
              }else{
                val.legislator_twitter_senate = "none";
              }

              if(val.legislator_mail_sil){
                val.legislator_mail_sil = val.legislator_mail_sil;
              }else{
                val.legislator_mail_sil = "none";
              }

              legislstors_all_sen_legant.push(val);
            }
         }

         $scope.senatorsApi=legislstors_all_sen;
         $scope.senatorsApiLegant=legislstors_all_sen_legant;
         console.log("Connected and Work Senators :)" );

       }

     }, function(response) {
       $scope.data = response.data || 'Request failed';
       $scope.status = response.status;
       console.log("Connected Failed :(", response);
     });
  }]);
