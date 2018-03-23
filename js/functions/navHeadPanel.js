app.controller('PanelCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */

    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  })
  //controller open panel side left
  app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })

  //controller open panel side left
  app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  })

  app.controller('PanelContentIndexController', function($scope) {

    var imagePathLegis   = 'imgs/svg/logo_borde.svg';
    var imagePathSen     = 'imgs/svg/logo_borde.svg';
    var imagePathIub     = 'imgs/svg/logo_inter.svg';
    var imagePathJuridico = 'imgs/svg/logo_juridico.svg';
    var imagePathPolitico  = 'imgs/svg/logo_politico.svg';
    var imagePathReforma = 'imgs/svg/logo_reforma.svg';
    var imagePathInco    = 'imgs/svg/logo_inco.svg';
    var imagePathPhone   = 'imgs/svg/logo_politico.svg';

    $scope.linksDirectoryLegislators = [

      {
        face : imagePathLegis,
        who: 'Diputados',
        address: '#!deputys'
      },
      {
        face : imagePathLegis,
        who: 'Senadores',
        address: '#!senators'

      }
    ];

    $scope.linksDirectoryOtherSites = [

      {
        face : imagePathInco,
        who: 'Incorruptible',
        address: 'http://incorruptible.mx/'
      },
      {
        face : imagePathPolitico,
        who: 'Borde Politico',
        address: 'http://bordepolitico.com/'

      },
      {
        face : imagePathJuridico,
        who: 'Borde Juridico',
        address: 'http://bordejuridico.com'
      },
      {
        face : imagePathReforma,
        who: 'Justicia sin Pretextos',
        address: 'http://reformapenal.org/'
      },
      {
        face : imagePathReforma,
        who: 'Plataforma de Articulación Ciudadana',
        address: 'http://reformapenal.org/'
      }
    ];

})
app.controller('PanelContentProfileController', function($scope) {

  var imagePathLegis   = '../svg/logo_borde.svg';
  var imagePathSen     = '../svg/logo_juridico.svg';
  var imagePathIub     = '../svg/logo_inter.svg';
  var imagePathJalisco = '../svg/logo_juridico.svg';
  var imagePathPuebla  = '../svg/logo_politico.svg';
  var imagePathReforma = '../svg/logo_reforma.svg';
  var imagePathInco    = '../svg/logo_inco.svg';
  var imagePathPhone   = '../svg/logo_politico.svg';

  $scope.linksDirectoryOtherSites = [
    {
      face : imagePathIub,
      who: 'Interfaz de Usuario'
    },
    {
      face : imagePathJalisco,
      who: 'Borde Jalisco'
    },
    {
      face : imagePathPuebla,
      who: 'Borde Puebla'
    },
    {
      face : imagePathInco,
      who: 'App Incorruptible'
    },
    {
      face : imagePathReforma,
      who: 'Reforma Penal'
    }
  ];

  $scope.phones = [
    {
      type: 'Local',
      number: '(55) 5251-1234',
      options: {
        face : imagePathPhone,
        icon: 'communication:phone'
      }
    }
  ];
})


app.controller('OpenWindowController', function($scope) {
   $scope.openBorde = function() {
   window.open("http://bordepolitico.com/",'_blank');
   };
})

app.controller('OpenFacebookController', function($scope) {
   $scope.openFace = function() {
   window.open("https://es-la.facebook.com/BordePolitico/",'_blank');
   };
})

app.controller('OpenTwitterController', function($scope) {
   $scope.openTwit = function() {
   window.open("https://twitter.com/bordepolitico?lang=es",'_blank');
   };
})

app.controller('OpenBordePanel', function($scope) {
   $scope.openBordePanel = function() {
   window.open("http://bordepolitico.com/",'_blank');
   };
})

app.controller('OpenHomeController', function($scope) {
   $scope.openHome = function() {
   window.open("http://app.bordepolitico.com/",'_self');
   };
})

app.controller('OpenFederalController', function($scope) {
   $scope.openFederal = function() {
   window.open("http://app.bordepolitico.com/",'_self');
   };
})

app.controller('OpenJaliscoController', function($scope) {
   $scope.openJalisco = function() {
   window.open("http://appjalisco.bordepolitico.com/",'_blank');
   };
})

app.controller('OpenPueblaController', function($scope) {
   $scope.openPuebla = function() {
   window.open("http://apppuebla.bordepolitico.com/",'_blank');
   };
})

app.controller('OpenCDMXController', function($scope) {
   $scope.openCDMX = function() {
   window.open("http://appcdmx.bordepolitico.com/",'_blank');
   };
})

app.controller('OpenCSVController', function($scope) {
   $scope.openCSV = function() {
   window.open("docs/score.xlsx",'_blank');
   };
})

app.controller('OpenHowAboutController', function($scope) {
   $scope.openAbout = function() {
   window.open("http://bordepolitico.com/infografia-borde-score/",'_blank');
   };
})

app.controller('OpenPanelScoreController', function($scope, $mdDialog) {
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.openAbout = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/about.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openPartys = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/party.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openStates = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/states.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openSex = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/sex.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openAge = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/age.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openElection = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/election.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openPerfil = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/perfil.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openSatatesProfile = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/states.profile.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  $scope.openGraphs = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'sites/graphs.score.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
      console.log(answer);
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
      console.log("close dialog");
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})

app.controller('OpenPerfilController', function($scope) {
   $scope.openPerfilPage = function(legId){
    //  window.open("other_sites/profile_"+legId+".html",'_blank');
     window.open("sites/profile.html",'_blank');
   };
})

var doughnutData = [
                {
                    value: 20,
                    color:"#EE4455",
                    highlight: "#FF5A5E",
                    label: "Trabajo",
                },
                {
                    value: 50,
                    color: "#FFC73F",
                    highlight: "#FFC870",
                    label: "Rol"
                },
                {
                    value: 30,
                    color: "#FF974C",
                    highlight: "#FFC870",
                    label: "Extra"
                }

            ];


// var ctx1 = $("#d1").get(0).getContext("2d");
// var myChart1 = new Chart(ctx1).Doughnut(doughnutData, {
//     percentageInnerCutout: 70
// });
//
// var ctx1 = $("#d2").get(0).getContext("2d");
// var myChart1 = new Chart(ctx1).Doughnut(doughnutData, {
//     percentageInnerCutout: 80
// });


// open /Applications/Google\ Chrome.app --args --allow-file-access-from-files
