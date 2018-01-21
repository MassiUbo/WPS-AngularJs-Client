
var myApp = angular.module("angularApp", [])      //declaration du module


myApp.controller("myController", function ($scope, $http) {   // controller 

	$scope.visible;
	$scope.txtname = "";

	$scope.items = [{
		id: 1,
		label: 'http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService',
	},
	{
		id: 2,
		label: 'https://geobretagne.fr/geoserver/ows',

	},
	{
		id: 3,
		label: 'http://zoo-project.org/zoo',

	}

	];


	$scope.selected = null;
	$scope.select = null;
	$scope.pinchou = [];
	$scope.result = null;
	$scope.wps = null;
	$scope.processes = null;
	$scope.process = null;
	$scope.selectedprocess = null;
	$scope.result2 = null;
	$scope.descriptionProcess = null;
	$scope.inputs = false;
	

	$scope.ajout = function () {
		if ($scope.monServeur.label != "") {
			$scope.items.push($scope.monServeur);
			$scope.monServeur = "";
		}
	}


	$scope.config = function () {
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=GetCapabilities').then(function (response) {
			console.log("===>CC", response);
			$scope.result = response.data;
			console.log("===>DATA ", response.data);
		});


	};
	$scope.getData = function () {

		var x2js = new X2JS();
		var aftCnv = x2js.xml_str2json($scope.result);
		console.log("===>DATA CONVERTED ", aftCnv.Capabilities);
		$scope.processes = aftCnv.Capabilities.ProcessOfferings.Process;
		$scope.wps = aftCnv.Capabilities;
	};

	$scope.getDescriptionProcess = function (id) {
		console.log("===>DATA ");
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=DescribeProcess&Identifier=' + id).then(function (response) {
			console.log("===>CC", response);
			$scope.result2 = response.data;
			console.log("===>DATA ", response.data);
		});


	};
	$scope.getData2 = function () {

		var x2js = new X2JS();
		var aftCnv = x2js.xml_str2json($scope.result2);
		console.log("===>DATA CONVERTED ", aftCnv);
		$scope.descriptionProcess = aftCnv;
		$scope.inputs = $scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input;
		$scope.inputs = angular.isArray;
		//$scope.wps = aftCnv.Capabilities;  
	};


	$scope.ExecuteProcess = function (id) {
		console.log("===>DATA ");
		var valeurtext = document.getElementById('myInputs').value;
		console.log('txt>>>',valeurtext);
		var nominput = document.getElementById('contenu').innerHTML;
		console.log('txt>>>',nominput);
           
            // a utiliser
           //  listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;

		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + id+'&DataInputs='+nominput+"=" +valeurtext).then(function (response) {
			console.log("===>CC", response);
			$scope.result3 = response.data;
			console.log("===>DATA ", response.data);

		});
	};


	$scope.getData3 = function () {
		var x3js = new X2JS();
		var aftCnv3 = x3js.xml_str2json($scope.result3);
		$scope.result4 = aftCnv3;
		console.log("===>DATA CONVERTED 3 ", aftCnv3);
		$scope.resProcess = aftCnv3;
	};
});


