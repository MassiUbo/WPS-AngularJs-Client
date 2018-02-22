/**
 * @author Massinissa HADJ-SAI
 * @author Zakaria Madhouni
 *
 */

var myApp = angular.module("angularApp", [])      //declaration du module

/**
 * Controlleur : Gère l'intégralité de notre vue
 * @argument $scope : Intéraction entre Vue et controlleur
 * @argument $http : Module http pour éxécution de requête
 */

myApp.controller("myController", function ($scope, $http) {   // controller 

	/**
	 *  Fonctions qui gère l'affichage de notre vue 
	 */

	// Affichage 1 : Ajout serveur 	
	$scope.visible = false;
	$scope.affichage1 = function () {
		if ($scope.visible == false) {
			$scope.visible = true;
			$scope.visible2 = false;
			$scope.visible3 = false;
			$scope.visible4 = false;
			$scope.visible5 = false;
			$scope.selected = null;
			$scope.resultverif = null;
		}
		else {
			$scope.visible = false;
		}
	}

	// Affichage 2 : Liste serveurs
	$scope.visible2 = false;
	$scope.affichage2 = function () {
		if ($scope.visible2 == false) {
			$scope.visible2 = true;
			$scope.visible = false;
			$scope.visible3 = false;
			$scope.visible4 = false;
			$scope.visible5 = false;
			$scope.selected = null;
		}
		else {
			$scope.visible2 = false;
		}
	}

	// affichage3 : Gestion serveur
	$scope.visible3 = false;
	$scope.affichage3 = function () {
		if ($scope.visible3 == false) {
			$scope.visible3 = true;
			$scope.visible = false;
			$scope.visible2 = false;
			$scope.visible4 = false;
			$scope.visible5 = false;
			$scope.selected = null;
		}
		else {
			$scope.visible3 = false;
		}
	}

	// Affichage4 : Ajout process  
	$scope.visible4 = false;
	$scope.affichage4 = function () {
		if ($scope.visible4 == false) {
			$scope.visible4 = true;
			$scope.selected = null;
			$scope.visible = false;
			$scope.visible2 = false;
			$scope.visible3 = false;
			$scope.visible5 = false;
			$scope.descriptionProcess = null;
			$scope.processes = null;
		}
		else {
			$scope.visible4 = false;
		}
	}

	// Affichage5 : Exécution de requêtes
	$scope.visible5 = false;
	$scope.affichage5 = function () {
		if ($scope.visible5 == false) {
			$scope.visible5 = true;
			$scope.selected = null;
			$scope.visible = false;
			$scope.visible2 = false;
			$scope.visible3 = false;
			$scope.visible4 = false;
			$scope.descriptionProcess = null;
			$scope.result4 = null;
		}
		else {
			$scope.visible5 = false;
		}
	}

	/**
	 * @method refresh : Raffrichissement après récupération données 
	 * de base de données items
	 */
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

	/**
	 *@method refresh2 : Raffrichissement après récupération données 
	 * de base de données configuration
	 */
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

	/**
	 * @method recup : récuperation de liste de configuration
	 * @augments : id : le nom d'un process, ii : Entrées
	 */
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
					displayinfo(" configuration récupéré !")
				}
			}
			// si non le process contient une seule entrée
			else {
				document.getElementById('myInputs').value = donnee.inputs[0]
				displayinfo(" configuration récupéré !")
			}
			// si configuration non compatible 		
		} else {
			displayinfo(" configuration non compatible !")
			//window.alert('configuration non compatible ! ')
		}
	}

	// on appel refresh ici pour rafrichir recuperation liste serveurs 
	refresh();

	/**
	 * @method remove : suppression d'un serveur 
	 * @argument id : id d'un serveur dans la vase de données 
	 */

	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/items/' + id).success(function (response) {
			window.alert('serveur supprimé avec succès !')
			refresh();
		});
	};


	/**
	 * @method remove2 : suppression de process 
	 * @argument item : represente le serveur relié aux process 
	 */
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

	/**
	 * @method removeCheked: suppresion serveur avec cases à cocher
	 */
	$scope.removeChecked = function () {
		angular.forEach($scope.checked, function (val) {
			$http.delete('/items/' + val._id).success(function (response) {
				//	window.alert('serveur supprimé avec succès !')
				refresh();
				$scope.checked = [];
			});
		})
	}

	/**
	 * @method removeAll : Suppresion de tous les serveurs
	 */

	$scope.removeAll = function () {
		angular.forEach($scope.items, function (val) {
			$http.delete('/items/' + val._id).success(function (response) {
				//	window.alert('serveur supprimé avec succès !')
				refresh();
				$scope.checked = [];
			});
		})
	}

	// Affichage Welcome au lancement de l'application
	document.getElementById('info').innerHTML = "<h3>Welcome !</h3>";
	temp = document.getElementById('info')
	setTimeout('temp.style.display="none"', 3000);

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
	$scope.checked = null;
	$scope.checked2 = null;
	$scope.selectAll = null;

	// variable verfication entier 
	$scope.min = 0;
	$scope.max = 100;
	$scope.step = 50;
	$scope.step2 = 2;


	// tableau entrees
	var pp = null

	//  variables cheked
	$scope.checked = [];
	$scope.checked2 = [];

	/**
	 * Fonction exist1/2 : relié aux cases à coché
	 */
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

	/**
	 * @method toggleSelection : relié à la méthode suppresionn avec 
	 * cases à cocher (serveur)
	 */
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

	/**
	 * @method displayinfo : afficher informations (erreurs / success)
	 */
	displayinfo = function (a) {
		document.getElementById('info').innerHTML = "<b>" + a + "</b>";
		temp = document.getElementById('info')
		temp.style.display = "block";
		setTimeout('temp.style.display="none"', 3000);
	}

	/**
	 * @method verification : verification de la validité d'un serveur
	 */

	$scope.verification = function () {

		if ($scope.monServeur == null || document.getElementById('serveur').value == null
			&& document.getElementById('serveur').value == ""
			&& document.getElementById('serveur').value == undefined) {
			displayinfo("champ vide" + "\n" + "veuillez entrer une URL ")
			//window.alert("champ vide" + "\n"+ "veuillez entrer une URL ");
		}

		if ($scope.monServeur != null && document.getElementById('serveur').value != null
			&& document.getElementById('serveur').value != ""
			&& document.getElementById('serveur').value != undefined) {

			$http.get($scope.monServeur.label + '?service=WPS&version=1.0.0&request=GetCapabilities').success(function (response) {
				displayinfo("serveur valide !")
				//window.alert('serveur correcte !');
				$scope.resultverif = response;
				$scope.resultv = response;
				console.log('ll', response)
				console.log("verification serveur ");
				$scope.good = true;
			}).error(function (response) {
				displayinfo("Bad request " + "\n" + "serveur non valide !")
				//window.alert("Bad request " + "\n" + "put an valid server" );
				$scope.good = false;
				$scope.resultverif = response;
				$scope.resultv = response;
			});
		}
	}

	/**
	 * @method ajout: fonction ajout d'un serveur valide
	 */
	$scope.ajout = function () {
		if ($scope.monServeur != null && document.getElementById('serveur').value != null
			&& document.getElementById('serveur').value != ""
			&& document.getElementById('serveur').value != undefined) {
			if ($scope.good === true) {


				$http.get($scope.monServeur.label + '?service=WPS&version=1.0.0&request=GetCapabilities').success(function (response) {
					$http.post('/items', $scope.monServeur).then(function (response) {
						//window.alert("Ajout server SUCCEED !!");
						displayinfo("Ajout server réussi !!")
						$scope.monServeur = null;
						refresh();
					});
				}).error(function (response) {
					//	window.alert("vous avez modifié l' URL du serveur aprés vérfication" );
					displayinfo("vous avez modifié l' URL du serveur aprés vérfication !")
					$scope.good = false;
				});
			}
			else {
				//window.alert("verifier votre serveur !")
				displayinfo("verifier votre serveur !")
			}
		} else {
			displayinfo("nom vide !")
			//window.alert(" nom vide !")
		}
	}

	/**
	 *@method: config : Récuperation de données depuis serveur (GetCapabilties)
	 */
	$scope.config = function () {
		if ($scope.selected == null) {
			displayinfo("Veuillez séléctionné un serveur !")
			//window.alert(" veuillez séléctionné un serveur !")
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

	/**
	 * @method getData : conversion en format JSON
	 */
	$scope.getData = function () {
		var x2js = new X2JS();
		var aftCnv = x2js.xml_str2json($scope.result);
		console.log("===>DATA CONVERTED ", aftCnv.Capabilities);
		$scope.processes = aftCnv.Capabilities.ProcessOfferings.Process;
		$scope.wps = aftCnv.Capabilities;
	};

	/**
	 * @method getDescriptionProcess : récupération données relié à un process
	 * d'un serveur WPS 
	 */

	$scope.getDescriptionProcess = function (id) {
		$scope.descriptionProcess = null
		$scope.result4 = null;
		if (id === undefined) {
			displayinfo("Veuillez séléctionné un process !")
			//	window.alert(" veuillez séléctionnez un process !")
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

	// Conversion en format JSON 
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

	/**
	 * @method ajoutprobdd: Ajour d'un process à la base de données
	 * @param _id : id du serveur
	 * @param process : process séléctionné à ajouter
	 */
	$scope.ajoutprobdd = function (_id, process) {
		if (process === undefined) {
			displayinfo("Veuillez séléctionner un process !")
			//window.alert(" veuillez séléctionnez un process !")
		}
		else {
			console.log(_id);
			$http.put('/items/' + _id, { process }).then(function (response) {
				displayinfo("Ajout process réussi !")
				//window.alert("Ajout process SUCCEED !!");
				//$scope.monServeur = "";
				refresh();
			});
		}
	}

	/**
	 * @method ExecuteProcess : exécution d'un process sur le serveur WPS
	 * @param id : represente un process
	 */
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
				if (response) {
					//	window.alert("Requête exécuté !")
					displayinfo("Requête éxécuté !")
				}
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
				if (response) {
					//	window.alert("Requête exécuté !")
					displayinfo("Requête éxécuté !")
				}
				$scope.result3 = response.data;
				console.log("===>DATA ", response.data);
			});

		}
	};

	/**
	 *@method sauvgardeconf : sauvegarder une configuration
	 */

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
				//window.alert("Ajout bdd configuration!!");
				displayinfo("Ajout à la base de données réussi !")
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
				displayinfo("Ajout à la base de données réussi !")
				//window.alert("Ajout bdd configuration!!");
				//$scope.monServeur = "";
				refresh2();
			});
		}
	};

	// Conversion résultat exécution en format JSON
	$scope.getData3 = function () {
		var x3js = new X2JS();
		var aftCnv3 = x3js.xml_str2json($scope.result3);
		$scope.result4 = aftCnv3;
		console.log("===>DATA CONVERTED 3 ", aftCnv3);
		$scope.resProcess = aftCnv3;
	};

	/**
	 * @method verifEntier : verification d'un entier
	 */
	$scope.verifEntier = function () {
		var min = parseInt(document.getElementById('minint').value, 10)
		for (i = 0; i < pp.length; i++) {
			console.log("cc", pp)
			if (pp[i].LiteralData)
				var input = parseInt(document.getElementById('myInputs' + i).value, 10)
		}
		var max = parseInt(document.getElementById('maxint').value, 10)

		if (input > max || input < min) {
			//displayinfo("L'entrée doit être entre min et max")
			window.alert("L'entree doit être entre min et max ");
		}
		else if (min > max) {
			///displayinfo("Warning ! min est supérieur à max")
			window.alert("Warning" + "\n " + "min est supérieur à max");
		}
		else if (min < 0 || max < 0)
			//window.alert("valeur min ou max négatif !!")
			displayinfo("Valeur min ou max négatif !")
		else if (isNaN(min) || isNaN(max) || isNaN(input)) {
			window.alert("vous avez laissé un champs vide ou erreur saisie !!")
			//displayinfo("Vous avez laissé un champs vide ou erreur saisie !")
		}
		else
			window.alert("Entier correcte!!")
	}

	/**
	 * @method activer/desactiver : changement de configuration dun entier
	 */
	$scope.activer = function () {
		for (i = 0; i < pp.length; i++) {
			if (pp[i].LiteralData)
				document.getElementById('myInputs' + i).disabled = false
		}
		document.getElementById('minint').disabled = false;
		document.getElementById('step2').disabled = false;
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
		document.getElementById('step2').disabled = true;
	}
	$scope.changestep = function () {
		var s = parseInt(document.getElementById('step2').value, 10)
		for (i = 0; i < pp.length; i++) {
			if (pp[i].LiteralData)
				document.getElementById('myInputs' + i).step = s
		}
		displayinfo("configuration pris en compte !")

	}
});


