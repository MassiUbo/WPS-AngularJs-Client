
var myApp= angular.module("angularApp",[]);    //declaration du module

myApp.controller("myController", function($scope){
$scope.textname = ""; 

$scope.items = [{
id: 1,
label: 'degree',
subItem: [{ name: 'ser1-1' },
        { name: '4' },{ name: '5' },
        { name: '6' }]
}, {
id: 2,
label: 'geoserver',
subItem: [{ name: 'JST:difference', data: [{ var1: 'text', desc: 'type your name Please' },{ var1: 'text' , desc: 'how old are you'},{ var1: 'radio' , desc: ' wa cliki 3la dik dawara ' }] },
          { name: 'ser2-2', data: [{ var1: 'radio' },{ var2: 'image' },{ var3: 'text' }] },
          { name: 'ser2-3', data: [{ var1: 'checkbox' },{ var2: 'image' },{ var3: 'radio' }] },
          { name: 'ser2-4', data: [{ var1: 'text' },{ var2: 'radio' }] }
          ]
}];

$scope.selected = null;
$scope.select = null;

});