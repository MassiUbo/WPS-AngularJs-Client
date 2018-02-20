
var myApp = angular.module("angularApp", [])      //declaration du module

myApp.controller("myController", function ($scope, $http) {   // controller 

   // fonction affichage  

   $scope.visible=false;

   $scope.affichage1=function(){
   if ($scope.visible==false){
   $scope.visible=true;
   $scope.visible2=false;
   $scope.visible3=false;
   $scope.visible4=false;
   $scope.visible5=false;
   $scope.selected = null;
   $scope.resultverif = null;

   }
   else{
   $scope.visible=false;
   }
   }
   
   // fonction affichage2  

   $scope.visible2=false;
   
	  $scope.affichage2=function(){
	  if ($scope.visible2==false){
	  $scope.visible2=true;
	  $scope.visible=false;
	  $scope.visible3=false;
	  $scope.visible4=false;
	  $scope.visible5=false;  
	  $scope.selected = null;
	}
	  else{
	  $scope.visible2=false;
	  }
	  }

// fonction affichage2  

$scope.visible3=false;

   $scope.affichage3=function(){
   if ($scope.visible3==false){
   $scope.visible3=true;
   $scope.visible=false;
   $scope.visible2=false;
   $scope.visible4=false;
   $scope.visible5=false;
   $scope.selected = null;
   }
   else{
   $scope.visible3=false;
   }
   }

   $scope.visible4=false;
   
	  $scope.affichage4=function(){
	  if ($scope.visible4==false){
	  $scope.visible4=true;
	  $scope.selected = null;
	  $scope.visible=false;
	  $scope.visible2=false;
	  $scope.visible3=false;
	  $scope.visible5=false;
	  $scope.descriptionProcess = null;
	  
	  }
	  else{
	  $scope.visible4=false;
	  }
	  }

	  $scope.visible5=false;
	  
		 $scope.affichage5=function(){
		 if ($scope.visible5==false){
		 $scope.visible5=true;
		 $scope.selected = null;
		 $scope.visible=false;
		 $scope.visible2=false;
		 $scope.visible3=false;
		 $scope.visible4=false;
		 $scope.descriptionProcess = null;
		 $scope.result4 = null;
		 }
		 else{
		 $scope.visible5=false;
		 }
		 }

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

	// recuperation depuis configuration
	var refresh2 = function () {
		$http.get('/configuration').then(function (response) {
			console.log("j'ai recu la liste des entrées")
			$scope.configuration = response.data;
			var date = response.data
			$scope.date2 = response.data          // pour utiliser dans liste configuration
			for (i = 0; i < date.length; i++)
				$scope.entre = date[i]
			//	console.log("pikkkkk",entre)
		});
	};

	refresh2();

	$scope.recup = function (id, ii) {
		console.log("process", id)
		var donnee = ii
		console.log("données", donnee)
  
		// On test si la configuration est compatible 
		if (donnee.process == id) {
			// si process contient plusieurs paramètres
			if (pp.length > 0) {

				for (i = 0; i < pp.length; i++) {
					document.getElementById('myInputs' + i).value = donnee.inputs[i]
				}
			}
		  // si non le process contient une seule entrée
			else
				document.getElementById('myInputs').value = donnee.inputs[0]
		  // si configuration non compatible 		
		} else {
			window.alert('configuration non compatible ! ')
		}
	}

	// on appel refresh ici pour rafrichir recuperation liste serveurs 
	refresh();

	// fonction suppression d'un serveur

	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/items/' + id).success(function (response) {
			window.alert('serveur supprimé avec succès !')
			refresh();
		});
	};

	/*	$scope.remove2 = function (id) {
			console.log(id);
			$http.post('/items2/' + id).success(function (response) {
				window.alert('process supprimé avec succès !')
				refresh();
			});
		};  */

	// fonction suppression process
	$scope.remove2 = function (item) {
		console.log(item._id);
		angular.forEach($scope.checked2, function (val) {
			$http.post('/items2/' + item._id + '/' + val.name).success(function (response) {
				//window.alert('process supprimé avec succès !')
				console.log("====> zakaria", item._id)
				refresh();
				$scope.checked2 = [];
			});
		})
	};

	// suppression avec case à coché
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
	$scope.selectedconf = null
	$scope.selected = null;
	$scope.select = null;
	$scope.result = null;
	$scope.good = null;
	$scope.wps = null;
	$scope.processes = null;
	$scope.process = null;
	$scope.selectedprocess = null;
	$scope.result2 = null;
	$scope.descriptionProcess = null;
	$scope.inputs = false;
	$scope.resultverif = null

	// variable zakaria
	$scope.checked = null;
	$scope.checked2 = null;
	$scope.selectAll = null;

	// variable verfication entier 
	$scope.min = 6;
	$scope.max = 20;
	$scope.step = 10;
	// tableau entrees
	var pp = null

	//  variables cheked
	$scope.checked = [];
	$scope.checked2 = [];

	// fonctions reliés à cases à cochées
	$scope.exist = function (item) {
		return $scope.checked.indexOf(item) > -1;
	}

	$scope.exist2 = function (item) {
		return $scope.checked2.indexOf(item) > -1;
	}

	// selectionné toute la liste de serveurs
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

	// fonction ajout selection
	$scope.toggleSelection = function (item) {
		var idx = $scope.checked.indexOf(item);
		if (idx > -1) {
			$scope.checked.splice(idx, 1);
		}
		else {
			$scope.checked.push(item);
		}
	}

	// toggle de processs
	$scope.toggleSelection2 = function (item) {

		var idx = $scope.checked2.indexOf(item);
		if (idx > -1) {
			$scope.checked2.splice(idx, 1);
			console.log("====> checked2", $scope.checked2)
		}
		else {
			$scope.checked2.push(item);
			console.log("====> checked2", $scope.checked2)
		}
	}

	$scope.check = function (event) {
		if (this.checked == true)
			alert(event.target.checked);
	};

	// fonction verification d'un serveur
	$scope.verification = function () {
		if ($scope.monServeur != null) {

			$http.get($scope.monServeur.label + '?service=WPS&version=1.0.0&request=GetCapabilities').then(function (response) {

				$scope.good = true;
				window.alert('serveur correcte !')
				$scope.resultverif = response.data;
				$scope.resultv = response.data;

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

		if ($scope.selected== null) {
			window.alert(" veuillez séléctionné un serveur !")
		}
		else {
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=GetCapabilities').then(function (response) {
			console.log("===>CC", response);
			if (response)
				window.alert("données recupérés")
			$scope.result = response.data;
			console.log("===>DATA ", response.data);
		});
	}
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
		$scope.descriptionProcess = null
		$scope.result4 = null;
		if (id === undefined) {
			window.alert(" veuillez séléctionnez un process !")
		 }
		else { 
		console.log("===>DATA ");
		$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=DescribeProcess&Identifier=' + id).then(function (response) {
			console.log("===>CC", response);
			if (response)
				window.alert("SUCCESS !")
			$scope.result2 = response.data;
			console.log("===>DATA ", response.data);
		});
	}
	};

	// recuperation données process
	$scope.getData2 = function () {
		var x2js = new X2JS();
		var aftCnv = x2js.xml_str2json($scope.result2);
		console.log("===>DATA CONVERTED ", aftCnv);
		$scope.descriptionProcess = aftCnv;
		$scope.inputs = $scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input;
		//$scope.inputs = angular.isArray;
		pp = $scope.inputs;
		console.log("inputs test :", pp)
	};

	// Ajout d'un process à une base de données 
	$scope.ajoutprobdd = function (_id, process) {
		if (process === undefined) {
			window.alert(" veuillez séléctionnez un process !")
		 }
		 else {
		console.log(_id);
		$http.put('/items/' + _id, { process }).then(function (response) {
			window.alert("Ajout process SUCCEED !!");
			//$scope.monServeur = "";
			refresh();
		});
	}
	}

	// Exécution d'un process séléctionnée
	$scope.ExecuteProcess = function (id) {
		console.log("===>DATA EXECUTION ");
		var requestinput = ""
		if ($scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input.Title) {
			var nominput = document.getElementById('contenu').innerHTML;
			var valeurtext = document.getElementById('myInputs').value;
			console.log('txt>>>', valeurtext);
			console.log('txt input>>>', nominput);

			// exéctution de requete avec une seule entrée
			$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + id + '&DataInputs=' + nominput + "=" + valeurtext).then(function (response) {
				console.log("===>CC", response);
				if (response)
					window.alert("Requête exécuté !")
				$scope.result3 = response.data;
				console.log("===>DATA ", response.data);
			});
		}
		else {
			console.log("mmm" + $scope.inputs)
			for (i = 0; i < pp.length; i++) {
				var nominput = document.getElementById('contenu' + i).innerHTML;
				var valeurtext = document.getElementById('myInputs' + i).value;
				/*try{
				var valeurtext = document.getElementById('myInputs'+i).value;
				}catch(error) {
					console.log(error);
					var valeurtext = document.getElementById('inputint').value;
					console.log("dddddd",valeurtext);
				}*/
				console.log('txt input>>>', nominput);
				console.log('txt input>>>', valeurtext);
				requestinput += nominput + "=" + valeurtext + ";"
				requestinput.trim()
				console.log(requestinput)
			}

			// execution requête avec plusieurs entrées
			$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + id + '&DataInputs=' + requestinput).then(function (response) {
				console.log("===>CC", response);
				$scope.result3 = response.data;
				console.log("===>DATA ", response.data);
			});

		}
	};

	// sauvgarde configuration
	$scope.sauvgardeconf = function (id) {
		console.log("===>DATA ");

		// cas une seule entrée
		if ($scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input.Title) {
			var requestinput = new Array();
			var valeurtext = document.getElementById('myInputs').value;
			console.log('txt>>>', valeurtext);
			var nominput = document.getElementById('contenu').innerHTML;
			console.log('txt input>>>', nominput);
			requestinput.push(valeurtext)
			// à utiliser
			//  listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
			$http.post('/configuration/' + id, { requestinput }).then(function (response) {
				window.alert("Ajout bdd configuration!!");
				//$scope.monServeur = "";
				refresh2();
			});
		}

		// cas plusieures entrées
		else {
			var requestinput = new Array()
			var nominput
			var valeurtext
			for (i = 0; i < pp.length; i++) {
				nominput = document.getElementById('contenu' + i).innerHTML;
				valeurtext = document.getElementById('myInputs' + i).value;
				requestinput.push(valeurtext)
				console.log("reqqq", requestinput)
			}
			console.log("conf" + requestinput)
			$http.post('/configuration2/' + id, { requestinput }).then(function (response) {
				window.alert("Ajout bdd configuration!!");
				//$scope.monServeur = "";
				refresh2();
			});
		}
	};

	// recuperation resltat exécution
	$scope.getData3 = function () {
		var x3js = new X2JS();
		var aftCnv3 = x3js.xml_str2json($scope.result3);
		$scope.result4 = aftCnv3;
		console.log("===>DATA CONVERTED 3 ", aftCnv3);
		$scope.resProcess = aftCnv3;
	};

	// fonction de verification du min max / entrée 
	$scope.verifEntier = function () {

		var min = parseInt(document.getElementById('minint').value, 10)
		for (i = 0; i < pp.length; i++) {
			console.log("cc", pp)
			if (pp[i].LiteralData)
				var input = parseInt(document.getElementById('myInputs' + i).value, 10)
		}
		var max = parseInt(document.getElementById('maxint').value, 10)

		if (input > max || input < min) {
			window.alert("L'entree doit être entre min et max ");
		}
		else if (min > max) {
			window.alert("Warning" + "\n " + "min est supérieur à max");
		}
		else if (min < 0 || max < 0)
			window.alert("valeur min ou max négatif !!")
		else if (isNaN(min) || isNaN(max) || isNaN(input)) {
			window.alert("vous avez laissé un champs vide ou erreur saisie !!")
		}
		else
			window.alert("Entier correcte!!")
	}

	// changement de configuration de Min et Max
	$scope.activer = function () {
		for (i = 0; i < pp.length; i++) {
			if (pp[i].LiteralData)
				document.getElementById('myInputs' + i).disabled = false
		}
		document.getElementById('minint').disabled = false;
		document.getElementById('maxint').disabled = false;
	}

	$scope.desactiver = function () {
		for (i = 0; i < pp.length; i++) {
			if (pp[i].LiteralData)
				document.getElementById('myInputs' + i).disabled = true
		}

		//document.getElementById('inputint').disabled=true;
		document.getElementById('minint').disabled = true;
		document.getElementById('maxint').disabled = true;
	}

});


