var app = angular.module("myApp", ['ngMaterial', 'chart.js']);
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
      url: supurl+'/diputados/profile/dip/get',
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

            $scope.labels = ['Trabajo Legislativo', 'Extra Legislativo', 'Rol Politico'];
            $scope.data = [val.legislator_news_score_sil, val.legislator_extra_score_sil, val.legislator_rol_score_sil];

            $scope.workProfile = val.legislator_news_score_sil;
            $scope.extraProfile = val.legislator_extra_score_sil;
            $scope.rolProfile = val.legislator_rol_score_sil;

            if(val.legislator_gender_sil=="M" && val.legislator_chamber_sil=="diputado"){
                val.legislator_chamber_sil="Diputado";
                $scope.chamberProfile=val.legislator_chamber_sil;
            }

            if(val.legislator_gender_sil=="F" && val.legislator_chamber_sil=="diputado"){
                val.legislator_chamber_sil="Diputada";
                $scope.chamberProfile=val.legislator_chamber_sil;
            }

            if(val.legislator_gender_sil=="M" && val.legislator_chamber_sil=="senador"){
                val.legislator_chamber_sil="Senador";
                $scope.chamberProfile=val.legislator_chamber_sil;
            }

            if(val.legislator_gender_sil=="F" && val.legislator_chamber_sil=="senador"){
                val.legislator_chamber_sil="Senadora";
                $scope.chamberProfile=val.legislator_chamber_sil;
            }

            $scope.nameProfile=val.legislator_first_name_sil;
            $scope.lastNameProfile=val.legislator_last_name_sil;

            var state = val.legislator_state_sil;
            var zone = val.legislator_zone_sil;

            if(state){
              val.legislator_state_sil = val.legislator_state_sil.trim().toLowerCase();
              if(val.legislator_state_sil == "baja california sur"){
                val.legislator_state_sil = "baja california s."
              }

              if(val.legislator_state_sil == "s/e"){
                val.legislator_state_sil = "cdmx"
              }
              if(val.legislator_state_sil == "df"){
                $val.legislator_state_sil = "cdmx"
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
                val.legislator_zone_sil = "bcs";
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

            $scope.stateProfile = val.legislator_state_sil;
            $scope.zoneProfile = val.legislator_zone_sil;
            console.log("Estado"+ state);
            console.log("Zona"+zone);

            $scope.photoProfile=val.id_photo_sil;

            // if(val.legislator_election_sil == "RP" ){
            //   $scope.electionProfile.val.legislator_election_sil = "Representación Proporcional"
            // }
            //
            // if(val.legislator_election_sil == "MR"){
            //   $scope.electionProfile.val.legislator_election_sil = "Mayoria Relativa"
            // }
            //
            // if(val.legislator_election_sil == "PM"){
            //   $scope.electionProfile.val.legislator_election_sil = "Representación Proporcional"
            // }
            //
            // if(val.legislator_facebook_sil){
            //   $scope.electionProfile.val.legislator_facebook_sil = val.legislator_facebook_sil;
            // }else{
            //   $scope.electionProfile.val.legislator_facebook_sil = "none";
            // }
            //
            // if(val.legislator_twitter_senate){
            //   $scope.electionProfile.val.legislator_twitter_senate = val.legislator_twitter_senate;
            // }else{
            //   $scope.electionProfile.val.legislator_twitter_senate = "none";
            // }
            //
            // if(val.legislator_mail_sil){
            //   $scope.electionProfile.val.legislator_mail_sil = val.legislator_mail_sil;
            // }else{
            //   $scope.electionProfile.val.legislator_mail_sil = "none";
            // }

            $scope.scoreProfile=val.legislator_score_sil;
            $scope.partyProfile=val.legislator_party_sil;
        }
      }
    },function(response) {
      $scope.data = response.data || 'Request failed';
      $scope.status = response.status;
      console.log("Connected Failed :(", response);
    });
 }]);

 app.config(['ChartJsProvider', function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    chartColors: ['#EE4353', '#ffc73f', '#ff974c'],
    responsive: false
  });
  // Configure all line charts
  ChartJsProvider.setOptions('line', {
    showLines: false
  });
}])
