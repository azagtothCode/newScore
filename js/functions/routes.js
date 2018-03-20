app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "sites/scoreLegs.html"
    })
    .when("/deputys", {
        templateUrl : "sites/dirDeps.html",
    })
    .when("/senators", {
        templateUrl : "sites/dirSens.html",

    })
});
