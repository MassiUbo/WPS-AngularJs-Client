
var myApp = angular.module("angularApp", [])           //declaration du module
myApp.controller("myController", function ($scope) {   // controller 

        //$scope.txtname = ""; 
        $scope.txtname = "";
        $scope.visible=false;
        // pour affichage process
        $scope.affichage=function(){
                $scope.visible = true;
                return visible;
                }
      
        $scope.items = [{
                id: 1,
                label: 'http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService',
                subItem: [{
                        name: 'processus',
                        data: [{ var1: 'text', desc: 'Input' },
                        { var1: 'text', desc: 'voila' },
                        { var1: 'radio', desc: ' rond' }],

                        Type: [{ var1: 'text', desc: 'text' },
                        { var1: 'text', desc: 'reference' },
                        { var1: 'text', desc: 'Subproces' }],

                        app: [{ var1: 'text', desc: 'application/json' },
                        { var1: 'text', desc: 'application/wkt' },
                        { var1: 'text', desc: 'application/gml-3.1.1' }],
                }]
        },
        {
                id: 2,
                label: 'https://geobretagne.fr/geoserver/ows?',
                subItem: [{
                        name: 'JST:difference',
                        data: [{ var1: 'text', desc: 'Input' },
                        { var1: 'text', desc: 'how old are you' },
                        { var1: 'radio', desc: ' rond' }],

                        Type: [{ var1: 'text', desc: 'text' },
                        { var1: 'text', desc: 'reference' },
                        { var1: 'text', desc: 'Subproces' }],

                        app: [{ var1: 'text', desc: 'application/json' },
                        { var1: 'text', desc: 'application/wkt' },
                        { var1: 'text', desc: 'application/gml-3.1.1' }],

                        input1: [{ var1: 'text', desc: 'a* - geometry ' },
                        { var1: 'text', desc: 'First input geometry ' }],

                        input2: [{ var1: 'text', desc: 'b* - geometry ' },
                        { var1: 'text', desc: 'Second input geometry ' }]
                }]
        },
        {
                id: 3,
                label: 'http://zoo-project.org/zoo',
                subItem: [{
                        name: 'JST:difference',
                        data: [{ var1: 'text', desc: 'Input' },
                        { var1: 'text', desc: 'how old are you' },
                        { var1: 'radio', desc: ' rond' }],

                        Type: [{ var1: 'text', desc: 'text' },
                        { var1: 'text', desc: 'reference' },
                        { var1: 'text', desc: 'Subproces' }],

                        app: [{ var1: 'text', desc: 'application/json' },
                        { var1: 'text', desc: 'application/wkt' },
                        { var1: 'text', desc: 'application/gml-3.1.1' }],

                        input1: [{ var1: 'text', desc: 'a* - geometry ' },
                        { var1: 'text', desc: 'First input geometry ' }],

                        input2: [{ var1: 'text', desc: 'b* - geometry ' },
                        { var1: 'text', desc: 'Second input geometry ' }]
                }]
        }

];

        $scope.selected = null;
        $scope.select = null;

});