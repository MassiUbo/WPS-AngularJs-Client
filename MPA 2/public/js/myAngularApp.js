
var myApp = angular.module("angularApp", [])      //declaration du module

myApp.controller("myController", function ($scope, $http) {   // controller 

	$scope.visible;
	$scope.txtname = "";

	// refresh pour éviter d'acctualiser 
	var refresh = function () {
		$http.get('/items').then(function (response) {
			console.log("j'ai recu la liste des serveurs")
			$scope.items = response.data;
			var date = response.data
			for (i = 0; i < date.length; i++)
				var k = date[i].process
			console.log(k)
			$scope.listepro = k
			// pour verification 
			$scope.good = false;

		});
	};

	// on appel refresh ici pour rafrichir la page 
	refresh();

	// fonction suppression 
	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/items/' + id).success(function (response) {
			window.alert('serveur supprimé avec succès !')
			refresh();
		});
	};

	$scope.remove2 = function (id) {
		console.log(id);
		$http.post('/items2/' + id).success(function (response) {
			window.alert('process supprimé avec succès !')
			refresh();
		});
	};

	/*** suppression */
	$scope.removeChecked = function () {
		angular.forEach($scope.checked, function (val) {
			$http.delete('/items/' + val._id).success(function (response) {
				//	window.alert('serveur supprimé avec succès !')
				refresh();
				$scope.checked = [];
			});

		})

	}

	// suppression de tous les serveur de la base de données
	$scope.removeAll = function () {
		angular.forEach($scope.items, function (val) {
			$http.delete('/items/' + val._id).success(function (response) {
				//	window.alert('serveur supprimé avec succès !')
				refresh();
				$scope.checked = [];
			});
		})
	}

// Declaration des variables

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

	// var zaki
	$scope.checked = null;
	$scope.selectAll = null;

	// variable verfication entier 
	$scope.min = 6;
	$scope.max = 20;
	$scope.step = 2;
	//$scope.entier =4 ;

	// cheked
	$scope.checked = [];
	$scope.exist = function (item) {
		return $scope.checked.indexOf(item) > -1;
	}

	/** partie zaki */
	$scope.checkAll = function () {
		if ($scope.selectAll) {
			angular.forEach($scope.items, function (item) {
				var idx = $scope.checked.indexOf(item);
				if (idx >= 0) {
					return true;
				}
				else {
					$scope.checked.push(item);
				}
			})
		}
		else {
			$scope.checked = [];
		}
	}

	$scope.toggleSelection = function (item) {
		var idx = $scope.checked.indexOf(item);
		if (idx > -1) {
			$scope.checked.splice(idx, 1);
		}
		else {
			$scope.checked.push(item);
		}
	}

	$scope.check = function (event) {
		// how to check if checkbox is selected or not
		if (this.checked == true)
			alert(event.target.checked);
	};

	// fonction verification d'un serveur
	$scope.verification = function () {
		if ($scope.monServeur != null) {

			$http.get($scope.monServeur.label + '?service=WPS&version=1.0.0&request=GetCapabilities').then(function (response) {

				$scope.good = true;
				window.alert('serveur correcte !')

			});

			if ($scope.good != true) {
				//	window.alert("Serveur Incorrecte !")
				$scope.good = false;
			}
		}
		else {
			window.alert('nom vide !')
		}
	}

	// Fonction ajout d'un serveur
	$scope.ajout = function () {
		if ($scope.monServeur != null) {
			if ($scope.good === true) {
				$http.post('/items', $scope.monServeur).then(function (response) {
					window.alert("Ajout server SUCCEED !!");
					$scope.monServeur = null;
					refresh();
				});
				//$scope.items.push($scope.monServeur);
			}
			else {
				window.alert("verifier votre serveur !")
			}
		} else {
			window.alert(" nom vide !")
		}
	}

	// execution requete getCapabilities
	$scope.config = function () {
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=GetCapabilities').then(function (response) {
			console.log("===>CC", response);
			$scope.result = response.data;
			console.log("===>DATA ", response.data);
		});
	};

	// recuperation données Getcapabilities
	$scope.getData = function () {
		var x2js = new X2JS();
		var aftCnv = x2js.xml_str2json($scope.result);
		console.log("===>DATA CONVERTED ", aftCnv.Capabilities);
		$scope.processes = aftCnv.Capabilities.ProcessOfferings.Process;
		$scope.wps = aftCnv.Capabilities;
	};

 	// requête execution process
	$scope.getDescriptionProcess = function (id) {
		console.log("===>DATA ");
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=DescribeProcess&Identifier=' + id).then(function (response) {
			console.log("===>CC", response);
			$scope.result2 = response.data;
			console.log("===>DATA ", response.data);
		});


	};
	// recuperation données process
	$scope.getData2 = function () {
		var x2js = new X2JS();
		var aftCnv = x2js.xml_str2json($scope.result2);
		console.log("===>DATA CONVERTED ", aftCnv);
		$scope.descriptionProcess = aftCnv;
		$scope.inputs = $scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input;
		//$scope.inputs = angular.isArray;
		var pp = $scope.inputs;
		console.log("inputs test :", pp) 
	};

	// Ajout d'un process à une base de données 
	$scope.ajoutprobdd = function (_id, process) {
		console.log(_id);

		$http.put('/items/' + _id, { process }).then(function (response) {
			window.alert("Ajout process SUCCEED !!");
			//$scope.monServeur = "";
			refresh();
		});
	}

	// Exécution d'un process
	$scope.ExecuteProcess = function (id) {
		console.log("===>DATA EXECUTION ");
	
		var requestinput=""
		if ($scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input.Title){
		var nominput = document.getElementById('contenu').innerHTML;
		var valeurtext = document.getElementById('myInputs').value;
		console.log('txt>>>', valeurtext);
		console.log('txt input>>>', nominput);

		// exéctution de requete avec une seule entrée
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + id + '&DataInputs=' + nominput + "=" + valeurtext).then(function (response) {
			console.log("===>CC", response);
			$scope.result3 = response.data;
			console.log("===>DATA ", response.data);
		});
		}
		else {
			console.log("mmm"+$scope.inputs)
		for (i=0;i<$scope.inputs.length;i++){
		var nominput = document.getElementById('contenu'+i).innerHTML;
		var valeurtext = document.getElementById('myInputs'+i).value;
		
		console.log('txt input>>>', nominput);
		console.log('txt input>>>', valeurtext);
		requestinput+=nominput+"="+valeurtext+";"
		requestinput.trim()
		console.log(requestinput)
	}
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + id + '&DataInputs='+requestinput).then(function (response) {
			console.log("===>CC", response);
			$scope.result3 = response.data;
			console.log("===>DATA ", response.data);
		});
	
	}
	
		
	};

	// sauvgarde configuration
	$scope.sauvgardeconf = function (id) {
		console.log("===>DATA ");
		var valeurtext = document.getElementById('myInputs').value;
		console.log('txt>>>', valeurtext);
		var nominput = document.getElementById('contenu').innerHTML;
		console.log('txt input>>>', nominput);
		// a utiliser
		//  listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
		$http.post('/configuration/' + id + '/' + valeurtext + '/' + nominput).then(function (response) {
			window.alert("Ajout bdd configuration!!");
			//$scope.monServeur = "";
			//refresh();
		});
	};


	$scope.getData3 = function () {
		var x3js = new X2JS();
		var aftCnv3 = x3js.xml_str2json($scope.result3);
		$scope.result4 = aftCnv3;
		console.log("===>DATA CONVERTED 3 ", aftCnv3);
		$scope.resProcess = aftCnv3;
	};

	// fonction de verification du min 
	$scope.verifEntier = function () {
       
		var min = parseInt(document.getElementById('minint').value, 10)
		var input = parseInt(document.getElementById('inputint').value, 10)
		var max = parseInt(document.getElementById('maxint').value, 10)
		
	    if (input > max || input < min) {
			window.alert("L'entree doit être entre min et max ");
		}
		else if (min > max) {
			window.alert("Warning" + "\n " + "min est supérieur à max");
		}
	    else if ( isNaN(min) || isNaN(max) || isNaN(input)) {
			window.alert("vous avez laissé un champs vide ou erreur saisie !!")
		}
		else 
		window.alert("Entier correcte!!")
	}
});


