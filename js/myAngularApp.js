
var myApp = angular.module("angularApp", [])   //declaration du module
myApp.controller("myController", function ($scope) {
    
    $scope.txtname = ""; 
    $scope.items = [{
      id: 1,
      label: 'degree',
      subItem: [{ name: 'process1',
                 data: [{ var1: 'text', desc: 'Input' },
                        { var1: 'text' , desc: 'voila'},
                        { var1: 'radio' , desc: ' rond' }] ,
                 
                Type : [{var1 :'text' , desc :'text'},
                        {var1 : 'text' , desc : 'reference'},
                        {var1 : 'text' , desc :'Subproces'}] ,
                 
                 app : [{ var1: 'text', desc: 'application/json' } ,
                        { var1: 'text', desc: 'application/wkt' } ,
                        { var1: 'text', desc: 'application/gml-3.1.1' }        
                       ] ,
                },
                  ]
    },     
                    {
      id: 2,
      label: 'geoserver',
      subItem: [{ name: 'JST:difference',
                 data: [{ var1: 'text', desc: 'Input' },
                        { var1: 'text' , desc: 'how old are you'},
                        { var1: 'radio' , desc: ' rond' }] ,
                 
                Type : [{var1 :'text' , desc :'text'},
                        {var1 : 'text' , desc : 'reference'},
                        {var1 : 'text' , desc :'Subproces'}] ,
                 
                 app : [{ var1: 'text', desc: 'application/json' } ,
                        { var1: 'text', desc: 'application/wkt' },
                        { var1: 'text', desc: 'application/gml-3.1.1' } , ] ,
                        
                  input1: [{ var1: 'text', desc: 'a* - geometry ' },
                        { var1: 'text' , desc: 'First input geometry '},
                        ] ,
                 
                 input2: [{ var1: 'text', desc: 'b* - geometry ' },
                        { var1: 'text' , desc: 'Second input geometry '},
                        ] ,
                },]
    }];
    $scope.selected = null;
    $scope.select = null;
});