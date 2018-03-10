/**
 * @author Massinissa HADJ-SAID
 * @author Zakaria Madhouni
 *
 */

var myApp = angular.module("angularApp", [])      //declaration du module

/**
 * Controleur : Gère l'intégralité de notre vue
 * @argument $scope : Intéraction entre Vue et controlleur
 * @argument $http : Module http pour éxécution de requête
 */

myApp.controller("myController", function ($scope, $http) {   // controller 

	/**
	 *  Fonctions qui gère l'affichage de notre vue 
	 */

	// Affichage 1 : Ajouter serveur 	
	$scope.visible = false;
	$scope.affichage1 = function () {
		if ($scope.visible == false) {
			$scope.visible = true;
			$scope.visible2 = false;
			$scope.visible3 = false;
			$scope.visible4 = false;
			$scope.visible5 = false;
			$scope.visible6 = false;
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
			$scope.visible6 = false;
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
			$scope.visible6 = false;
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
			$scope.visible6 = false;
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
			pp = null;
			$scope.inputs = null
			$scope.visible5 = true;
			$scope.selected = null;
			$scope.visible = false;
			$scope.visible2 = false;
			$scope.visible3 = false;
			$scope.visible4 = false;
			$scope.visible6 = false;
			$scope.descriptionProcess = null;
			$scope.result4 = null;

		}
		else {
			$scope.visible5 = false;
		}
	}

	// Exécution de reuquêtes

	$scope.visible6 = false;
	$scope.affichage6 = function () {
		if ($scope.visible6 == false) {
			$scope.inputs = null
			pp = null;
			$scope.visible6 = true;
			$scope.selected = null;
			$scope.visible = false;
			$scope.visible2 = false;
			$scope.visible3 = false;
			$scope.visible4 = false;
			$scope.visible5 = false;
			$scope.descriptionProcess = null;
			$scope.result4 = null;
		}
		else {
			$scope.visible6 = false;
		}
	}

	/**
	 * @method refresh : Raffrichissement après récupération données 
	 * de base de données items.
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
			// pour verification serveur 
			$scope.good = false;
		});
	};

	/**
	 *@method refresh2 : Raffrichissement après récupération données 
	 * de base de données configuration.
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
	 * @method recup21: temporisation entre récuperation de données depuis le serveur
	 * et leur conversion au format JSON.
	 * 
	 */

	$scope.recup21 = function (process) {
		$scope.getDescriptionProcess(process)
		setTimeout($scope.getData2, 3000);
		setTimeout($scope.$apply, 3000);
	}

	$scope.recup22 = function () {
		$scope.config()
		setTimeout($scope.getData, 3000);
		setTimeout($scope.$apply, 3000);
	}


	// ** 

	$scope.recup3 = function (id){

		$scope.result4 = null;
		$scope.result5 = id
		var boite = document.getElementById('toto') 
		while( boite.firstChild) {
		// suppression des child à chaque fois 
			boite.removeChild( boite.firstChild);
		}
		if (id!=null){
        console.log("llkkk",id)
		console.log("process", id.inputs)
		console.log("process", id.inputs.length)
        
		for (i=0; i< id.inputs.length; i++){
		
		if (id.typeinputs[i]=="(integer)")
		{
			document.getElementById('toto').innerHTML += 
			'<div id="contenu'+i+'">'+id.nameinputs[i]+'</div>'
			document.getElementById('toto').innerHTML += 
			'<div id="type'+i+'">'+id.typeinputs[i]+'</div>'
			document.getElementById('toto').innerHTML += 
			'<div><input type="range" id="myInputs1'+i+'"value="'+id.inputs[i]+' "max="100" min="0" step="'+id.step+'"/></div>'
			document.getElementById('myInputs1' + i).disabled = id.config[i]	
		} 
		
		else {	
		document.getElementById('toto').innerHTML += 
		'<div id="contenu'+i+'">'+id.nameinputs[i]+'</div>'
		document.getElementById('toto').innerHTML += 
		'<div id="type'+i+'">'+id.typeinputs[i]+'</div>'
		document.getElementById('toto').innerHTML += 
		'<div><input type="text" id="myInputs1'+i+'"value="'+id.inputs[i]+'"/></div>'
		document.getElementById('myInputs1' + i).disabled = id.config[i]
	}
	}
	}
	else console.log("process null")
 	} 

	// On appel refresh ici pour rafrichir recuperation liste serveurs 
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
	document.getElementById('info').innerHTML = "<h1>Welcome !</h1>";
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

	// variables cheked
	$scope.checked = [];
	$scope.checked2 = [];

	// variables references

	$scope.typeGeom = 'text';
	$scope.typeGeom1 = 'text';
	$scope.options = ['text', 'reference'];

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
		document.getElementById('info').innerHTML = "<h2>" + a + "</h2>";
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
				document.getElementById("ajout").disabled = false
				//window.alert('serveur correcte !');
				$scope.resultverif = response;
				$scope.resultv = response;
				console.log('ll', response)
				console.log("verification serveur ");
				$scope.good = true;
			}).error(function (response) {
				displayinfo("Serveur non valide !")
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
						document.getElementById("ajout").disabled = true
						refresh();
					});
				}).error(function (response) {
					//	window.alert("vous avez modifié l' URL du serveur aprés vérfication" );
					displayinfo("vous avez modifié l' URL du serveur aprés vérfication !")
					document.getElementById("ajout").disabled = true
					$scope.good = false;
				});
			}
			else {
				//window.alert("verifier votre serveur !")
				displayinfo("verifier votre serveur !")
				document.getElementById("ajout").disabled = true
			}
		} else {
			displayinfo("nom vide !")
			document.getElementById("ajout").disabled = true
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
					displayinfo("données recupérés")
				$scope.result = response.data;
				console.log("===>DATA ", response.data);
			});
		}
	};

	/**
	 * @method getData : conversion en format JSON réponse GetCapabilities
	 */
	$scope.getData = function () {
		var x2js = new X2JS();
		var aftCnv = x2js.xml_str2json($scope.result);
		console.log("===>DATA CONVERTED ", aftCnv.Capabilities);
		$scope.processes = aftCnv.Capabilities.ProcessOfferings.Process;
		$scope.wps = aftCnv.Capabilities;
	};

	/**
	 * @method getDescriptionProcess : Récupération données relié à un process
	 * d'un serveur WPS.
	 */
	$scope.getDescriptionProcess = function (id) {
		$scope.descriptionProcess = null
		$scope.result4 = null;
		if (id === undefined) {
			displayinfo("Veuillez séléctionné un process !")
			//window.alert(" veuillez séléctionnez un process !")
		}
		else {
			console.log("===>DATA ");
			$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=DescribeProcess&Identifier=' + id).then(function (response) {
				console.log("===>CC", response);
				if (response)
					displayinfo("Données récupérés !")
				$scope.result2 = response.data;
				console.log("===>DATA ", response.data);
			});
		}
	};

	// Conversion en format JSON Reponse DescribeProcess 
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

		if ($scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input.Title) {
			var texRef = document.getElementById('typeGeom').value;

			console.log("===> type geom " + document.getElementById('typeGeom').value);
			console.log("===>DATA EXECUTION ");

			if (texRef == 0) {
				{
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
			}

			else if (texRef == 1) {
				var nominput = document.getElementById('contenu').innerHTML;
				var valeurtext = document.getElementById('myInputs').value;

				$http({
					method: 'GET', url: "http://portail.indigeo.fr/geoserver/LETG-BREST/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LETG-BREST%3AREF_VOUG&maxFeatures=50&outputFormat=application%2Fjson"

				}).then(function (response) {
					console.log("===>CC ref", response);
					$scope.result = response.data;
					console.log("===>DATA ref ", response.data);
					var x = response.data.features[0].geometry.coordinates[0][0];
					var y = response.data.features[0].geometry.coordinates[0][1];
					console.log("===>DATA x ", x);

					$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + 'JTS:getX' + '&DataInputs=geom=point(' + x + ' ' + y + ')'
					).then(function (response) {
						console.log("===>CC", response);
						$scope.result3 = response.data;
						console.log("===>DATA ", response.data);
					});
				});
			}
		}
		else {
			var requestinput = ""
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

	/**
	 *@method sauvgardeconf : sauvegarder une configuration dans la base de données
	 */

	$scope.sauvgardeconf = function (id) {
		console.log("===>DATA ");
		
		// cas une seule entrée
		if ($scope.descriptionProcess.ProcessDescriptions.ProcessDescription.DataInputs.Input.Title) {
			var bool = new  Array();
			var b
			var requestinput = new Array();
			var nominputs = new Array();
			var typeentre = new Array();
 
			var valeurtype= document.getElementById('type').innerHTML;
			console.log('txt>>>', valeurtype);

			var valeurtext = document.getElementById('myInputs').value;
			console.log('txt>>>', valeurtext);
			var nominput = document.getElementById('contenu').innerHTML;
			nominputs.push(nominput)
			console.log('txt input>>>', nominput);
			requestinput.push(valeurtext);
			b = document.getElementById('myInputs').disabled
			bool.push(b)
			typeentre.push(valeurtype)
			// à utiliser
			//  listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
			$http.post('/configuration/' + id, { bool, nominputs, typeentre, requestinput }).then(function (response) {
				//window.alert("Ajout bdd configuration!!");
				displayinfo("Ajout à la base de données réussi !")
				//$scope.monServeur = "";
				refresh2();
			});
		}

		// Cas plusieures entrées
		else {
			var typeentre = new Array();
			var requestinput = new Array()
			var nominputs= new Array()
			var valeurtext
			var b
			var nominput 
			var valeurtype
			var step=null
			var bool = new Array()
			for (i = 0; i < pp.length; i++) {
				nominput = document.getElementById('contenu' + i).innerHTML;
				valeurtext = document.getElementById('myInputs' + i).value;

				valeurtype= document.getElementById('type'+i).innerHTML;
				console.log('txt>>>', valeurtype);

                if (document.getElementById('type'+i).innerHTML == "(integer)")
	            step = document.getElementById('step2'+i).value;
				
				requestinput.push(valeurtext)  // changement ici
				b = document.getElementById('myInputs' + i).disabled
				bool.push(b)
				nominputs.push(nominput);
				typeentre.push(valeurtype)
				console.log("mmmm", bool)
				console.log("reqqq", requestinput)
			}
			console.log("conf" + requestinput)
			$http.post('/configuration2/' + id, { bool, nominputs, typeentre, step, requestinput }).then(function (response) {
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
	$scope.verifEntier = function (a) {
		console.log("mm" + a)
		var min = parseInt(document.getElementById('minint' + a).value, 10)
		var input = parseInt(document.getElementById('myInputs' + a).value, 10)
		var max = parseInt(document.getElementById('maxint' + a).value, 10)

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
	 * @method activer/desactiver : activer modification / non modification d'une entrée
	 * @param a : index de l'entrée
	 */
	$scope.activer = function (a) {
		if (pp[a].LiteralData) {

			document.getElementById('step2' + a).disabled = false;
			document.getElementById('myInputs' + a).disabled = false
		} else {
			document.getElementById('myInputs' + a).disabled = false
		}
	}

	$scope.activer2 = function () {
		document.getElementById('myInputs').disabled = false
	}

	$scope.desactiver = function (a) {
		if (pp[a].LiteralData) {

			document.getElementById('step2' + a).disabled = true;
			document.getElementById('myInputs' + a).disabled = true
		} else {
			document.getElementById('myInputs' + a).disabled = true
		}

	}
	$scope.desactiver2 = function () {
		document.getElementById('myInputs').disabled = true
	}

	/**
	 * @method changstep: changement du step
	 */
	$scope.changestep = function (a) {
		var s = parseInt(document.getElementById('step2' + a).value, 10)
		document.getElementById('myInputs' + a).step = s;
		displayinfo("configuration pris en compte !")
	}

	//**********Cas configuration*********//


	/**
	 * @method changstep: changement du step
	 */
	$scope.changestep1 = function (a) {
		var s = parseInt(document.getElementById('step21' + a).value, 10)
		document.getElementById('myInputs1' + a).step = s;
		displayinfo("configuration pris en compte !")
	}

	/**
	 * Vérification d'un entrier dans le cans modification 
	 */
	$scope.verifEntier1 = function (a) {
		var min = parseInt(document.getElementById('minint' + a).value, 10)
		var input = parseInt(document.getElementById('myInputs1' + a).value, 10)
		var max = parseInt(document.getElementById('maxint' + a).value, 10)

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

	// Exécute process configuration //  

	/**
	 * @method ExecuteProcess1 : exécution d'un process sur le serveur WPS
	 * @param id : represente un process
	 */

	$scope.ExecuteProcess1 = function (id) {
		
		 
			var requestinput = ""
			console.log("mmm" + $scope.inputs)
			for (i = 0; i < id.inputs.length; i++) {
				var nominput = document.getElementById('contenu' + i).innerHTML;
				var valeurtext = document.getElementById('myInputs1' + i).value;
				console.log('txt input>>>', nominput);
				console.log('txt input>>>', valeurtext);
				requestinput += nominput + "=" + valeurtext + ";"
				requestinput.trim()
				console.log(requestinput)
			}

			// execution requête avec plusieurs entrées
			$http.get($scope.selected.label + '?service=WPS&version=1.0.0&request=Execute&Identifier=' + id.process + '&DataInputs=' + requestinput).then(function (response) {
				console.log("===>CC", response);
				$scope.result3 = response.data;
				if (response)
				window.alert("Requête exécuté !")
				console.log("===>DATA ", response.data);
			});

		
	};
});




