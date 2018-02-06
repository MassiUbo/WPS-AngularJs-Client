
var myApp = angular.module("angularApp", [])      //declaration du module


myApp.controller("myController", function ($scope, $http) {   // controller 

	$scope.visible;
	$scope.txtname = "";

	// refresh pour éviter d'acctualiser 
   var refresh = function () {
	$http.get('/items').then(function (response) {
		console.log("j'ai recu la liste des serveurs")
		$scope.items = response.data;
		console.log("", response.data)
		
	});
}; 

// on appel refresh ici 
refresh();

// fonction suppression 
$scope.remove = function (id){
	console.log(id);
	$http.delete('/items/'+ id).success(function (response){
		window.alert('serveur supprimé avec succès !')
		refresh();
	});
	};

	// Ajout d'un process à une base de données 
	$scope.ajoutprobdd = function (_id,process){
		console.log(_id);
	
		$http.put('/items/'+ _id ,{process}).then(function (response) {
			window.alert("Ajout process SUCCEED !!");
			//$scope.monServeur = "";
			refresh();
		});
	
	}

	$scope.selected = null;
	$scope.select = null;
	$scope.pinchou = [];
	$scope.result = null;
	$scope.good = null;
	$scope.wps = null;
	$scope.processes = null;
	$scope.process = null;
	$scope.selectedprocess = null;
	$scope.result2 = null;
	$scope.descriptionProcess = null;
	$scope.inputs = false;


	$scope.verification = function () {
		if ($scope.monServeur != "") {
			
			$http.get($scope.monServeur.label+'?service=WPS&version=1.0.0&request=GetCapabilities').then(function (response) {
					
				   $scope.good = true;
				    window.alert('serveur correcte !')		
				});
			
				if ($scope.good != true){
				//	window.alert("Serveur Incorrecte !")
					$scope.good = false;
				  }		

		}
	}

	$scope.ajout = function () {
		if ($scope.monServeur != "") {

			if ($scope.good === true) {
				$http.post('/items', $scope.monServeur).then(function (response) {
					window.alert("Ajout server SUCCEED !!");
					//$scope.monServeur = "";
					refresh();
				});
				//$scope.items.push($scope.monServeur);
			}
			else {
				window.alert("verifier votre serveur !")
			}
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
		console.log('txt>>>', valeurtext);
		var nominput = document.getElementById('contenu').innerHTML;
		console.log('txt>>>', nominput);

		// a utiliser
		//  listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;

		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + id + '&DataInputs=' + nominput + "=" + valeurtext).then(function (response) {
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


