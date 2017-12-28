//id du process selectionnÃ©
var adresseWps;
var versionWps;
// description du processus		
var processId;
var processDescription;
var identifier;
var currentIndex;
var min = new Array();
var max= new Array();
var step = new Array();

var defaultValue = new Array();
var typeValue = new Array();
var usedValue = new Array();
var isFixed = new Array();
var isLiteral = new Array();

var inputValue = new Array();
inputValue[0] = new Array();

var idInputs =new Array();
idInputs[0] = new Array();

var isFixed = new Array();
isFixed[0] = new Array();

var isWeb = new Array();
isWeb[0] = new Array();

var fileName = new Array();
fileName[0] = new Array();

var idfavwps = new Array();
var adrfavwps = new Array();
var nbinputfavwps = new Array();
var nboutputfavwps = new Array();

var nb;
var nbo;

function setProcessDescription(p) {
	processDescription = p;
}

function getProcessDescription() {
    return processDescription;
}

function setProcessId(p) {
	processId = p;
}

function getProcessId() {
    return processId;
}

function setAdresseWps(a) {
	adresseWps = a;
}

function getAdresseWps() {
    return adresseWps;
}

function setVersionWps(v) {
	versionWps = v;
}

function getVersionWps() {
    return versionWps;
}

function setIdentifier(i) {
	identifier = i;
}

function getIdentifier() {
    return identifier;
}

function setCurrentIndex(i) {
	currentIndex = i;
}

function getCurrentIndex() {
    return currentIndex;
}

function chargerFichier(idInputFile, idSortie) {
    "use strict";
    var entree, fichier, fr;

    if (typeof window.FileReader !== "function") {
        alert("L'API file n'est pas encore supportée par votre navigateur.");
        return;
    }
    entree= document.getElementById(idInputFile);
    if (!entree.files[0]) {
        alert("S'il vous plaît sélectionnez un fichier avant de cliquer sur «Chargement».");
    } else {
        fichier = entree.files[0];
        fr = new FileReader();
        
        fr.onload = function () {
            document.getElementById(idSortie).innerHTML = fr.result;
        };
        fr.readAsText(fichier);
    }
}
window.onload = function () {
    "use strict";
    document.getElementById("boutonCharger").onkeyup = function () {
        chargerFichier("fichierEntre", "sortie");
    };
    document.getElementById("boutonCharger").onclick = function () {
        chargerFichier("fichierEntre", "sortie");
    };
};

function addOptions()
{
	var List = document.getElementById("wps");
	var elOption = new Array(
                    new Option(document.getElementById("newWpsAdresse").value, document.getElementById("newWpsAdresse").value, false, false)
                     );
 
	var i, n;
	n = elOption.length;
 
	for (i=0; i<n; i++)
	{
		List.options.add(elOption[i]);
	}
	document.getElementById("verificationRunning").style.display = "none";
}


function verificationWPS(){
	document.getElementById("verificationRunning").style.display = "block";
	    $.ajax({
	        type: "GET",
	        url: document.getElementById("newWpsAdresse").value + "SERVICE=WPS&VERSION=1.0.0&REQUEST=GetCapabilities",
	        dataType: "script",
	        cache: false,
	        success: function () {
	        	addOptions();
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });
}

function executeLaunch() {

	setProcessId( $('#processes option:selected').text());
	var inputnbr = 0;
	var inputGenerator = new InputGenerator();
	var inputTab= new Array();
	setIdentifier(processDescription.processOffering.process.identifier);
	
	
	var selectedIndex = $("select[id='wpsfav'] option:selected").index();
	selectedIndex = selectedIndex -1 ;
	
	for (var indexInput in processDescription.processOffering.process.inputs)	{
		var n=0;

		while ((n < processDescription.processOffering.process.inputs[indexInput].maxOccurs)){
			if(document.getElementById("notused" +indexInput + n).checked){
			
			inputnbr = inputnbr +1;
			if (processDescription.processOffering.process.inputs[indexInput].literalData != null ){	
				inputTab[indexInput] = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0(idInputs[0][indexInput], 'undefined', 'undefined', inputValue[0][indexInput]);
			}
			else if (processDescription.processOffering.process.inputs[indexInput].complexData != null){
				inputTab[indexInput] = inputGenerator.createComplexDataInput_wps_1_0_and_2_0(idInputs[0][indexInput],'undefined', 'undefined', 'undefined', false, inputValue[0][indexInput]);
			}
			}
		n=n+1;
		}
	}

	var outputGenerator = new OutputGenerator();
	var outputTab= new Array();				
	for (var outputIndex in processDescription.processOffering.process.outputs)	{
		var currentOutput = processDescription.processOffering.process.outputs[outputIndex];
		
		if (currentOutput.literalData != null ){	
				outputTab[outputIndex]=outputGenerator.createLiteralOutput_WPS_1_0(currentOutput.identifier, false);
			}
		else if (currentOutput.complexData != null){
				outputTab[outputIndex] = outputGenerator.createComplexOutput_WPS_1_0(currentOutput.identifier,false, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');
		}
	}
	wpsService.setUrl(adresseWps);
	var listeInputs = ""; 
	var i=0;

		
	while (i<nbinputfavwps[selectedIndex]){
		
		if (inputValue[selectedIndex][i].indexOf(adressewfs) >= 0){
			
			var defaultParameters = {
				    service: 'WFS',
				    version: '1.0.0',
				    request: 'GetFeature',
				    typeName: couchewfs,
				    //maxFeatures: 1,
				};
				var parameters = L.Util.extend(defaultParameters);
				var wfsrequest = adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters);

				
			inputValue[selectedIndex][i] = idInputs[selectedIndex][i] + '=@xlink:href='+wfsrequest+'@method=POST@mimeType=text/xml@encoding=UTF-8@outputFormat='+ formatwfs+ ';';			
		}

		
		listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
		i=i+1;
	}

	identifier = idfavwps[selectedIndex];
	
	
	
	    $.ajax({
	        type: "GET",
	        url: adresseWps,
	        data : {
	        	Service:"WPS",
	        	Version: versionWps,
	        	Request:"Execute",
	        	Identifier : identifier,
	        	DataInputs : listeInputs
	        },
	        cache: false,
	        success: function(data) {
	        	executeCallback(data, this.url);
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });
}



var Download = 
{
    click : function(node) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return node.dispatchEvent(ev);
    },
    encode : function(data) {
            return 'data:application/octet-stream;base64,' + btoa( data );
    },
    link : function(data, name){
        var a = document.createElement('a');
        a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
        a.href = data || self.location.href;
        return a;
    }
};
Download.save = function(data, name)
{
    this.click(
        this.link(
            this.encode( data ),
            name
        )
    );
};

function executeCallback (data, url) {
	response = (new XMLSerializer()).serializeToString(data);
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, "text/xml");
	wpsResponse = xmlToJson(xml) ;
	var selectedIndex = $("select[id='wpsfav'] option:selected").index();
	selectedIndex = selectedIndex -1 ;

	 
	 if (isWeb[selectedIndex][0] == false) {
		 Download.save(JSON.stringify(wpsResponse),fileName[selectedIndex] + ".txt");
	 }
	 else{
		 window.open(url);
	 }


	
	try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]
	
	} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
		}
	

	
	
	if(isLiteral.length > 1){
		initConfig(6);
	}
}

// initialize wpsService
var wpsService = new WpsService({
	url: "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService",
	version: "1.0.0"
});	
	
	var capabilities, processDescription; // the process description
		
	var capabilitiesCallback = function(response) {
		capabilities = response;
		// extract processes, add them to process-list
		//array of processes
		var processes = response.capabilities.processes;
			
		var _select = $('<select>');
		$.each(processes, function(index, process) {
			    _select.append(
			            $('<option></option>').val(process.identifier).html(process.identifier)
			        );
		});

			$('#processes').append(_select.html());
			$('#processes_execute').append(_select.html());	
		

			
	// set value of textarea
	var capabilitiesDocument = capabilities.responseDocument;
	$("textarea#capabilitiesText").val((new XMLSerializer()).serializeToString(capabilitiesDocument));
	};
		
	var describeProcessCallback = function(response) {
	
		setProcessDescription(response);
		setIdentifier(response.processOffering.process.identifier);

		
		
		if(($("divForm").length)>0){
			var x = $("divForm").length - 1;
			document.getElementById("divId" +  x).style.display = 'none';
			
			var element = document.getElementById("divId" +  x);
			element.parentNode.removeChild(element);
			
		}
		
	   // alert(identifier);
	   // alert(document.getElementById("wpsfav").value);
	   
	    	
		var outputOffering = '';
	
		
		if (response.processOffering.version != null){
			outputOffering += "version : " + response.processOffering.version+'; \n';
		}
		
		outputOffering += "process : " + response.processOffering.process.title+'; \n';
		outputOffering += "description : " + response.processOffering.process.abstractValue+'; \n';
		
		inputs = 'Inputs: \n';
		
		newdiv =document.createElement('divForm');
		newdiv.innerHTML = "Inputs <br>";
		nb=0;
		for (var inputIndex in response.processOffering.process.inputs)	{
			
			for (var property in response.processOffering.process.inputs[inputIndex]) {
				inputs += property +': ' + response.processOffering.process.inputs[inputIndex][property]+'; \n';
				
				if ((property == "literalData")||(property == "complexData")){
					

					newdiv.innerHTML += "<br>" +response.processOffering.process.inputs[inputIndex].title;
						if( response.processOffering.process.inputs[inputIndex].minOccurs==1){
						newdiv.innerHTML += "*";
						}
						var n=0;
						
						while (n < response.processOffering.process.inputs[inputIndex].maxOccurs){
						
							var char = "onclick='checker('check1" + inputIndex + "','check2" + inputIndex + "');";
							newdiv.innerHTML += " <br><input type='checkbox' checked='unchecked' name='notused" + inputIndex +  n +"' " +"' id='notused" + inputIndex + n +"' /> ";
							
						
							
							newdiv.innerHTML += "<textarea type='text' name='myInputs[" + nb + "]'  id='myInputs[" + inputIndex + n + "]'  style='width:250px;height:15px;' value='"+defaultValue[inputIndex]+"'></textarea>" ;

							
							newdiv.innerHTML += "fixed  <input type='checkbox' checked='checked' name='1" + inputIndex + n + "' " +"' id='1" + inputIndex + n + "' onclick='checker(1" + inputIndex + n + ",2" + inputIndex + n + ");' />";
							newdiv.innerHTML +=  "user <input type='checkbox' name='2" + inputIndex + n + "' id='2" + inputIndex + n + "' onclick='checker(2" + inputIndex + n + " ,1" + inputIndex + n + ");' />";
							var d=document.wpsfavform.wpsfav;
							idInputs[d.length-1][nb] = response.processOffering.process.inputs[nb].title;
							
					
						    $.ajax({
						        type: "GET",
						        url: adresseWps + 'service=WPS&version=' + versionWps + '&request=DescribeProcess&identifier='+ identifier,
						 //       dataType: "xml",
						        cache: false,
						      //  success : executeCallback,
							    success: function(data, status, headers, config) {
							        // use the tool to parse the data
							    	
							    	response2 = (new XMLSerializer()).serializeToString(data);
							    	var parser = new DOMParser();
							    	var xml = parser.parseFromString(response2, "text/xml");
							    	var i=0;
							    	 $(xml).find('LiteralData').each( function(){
							    		//alert($(this).find('DefaultValue').text());
							    		defaultValue[i]=$(this).find('DefaultValue').text();
							    		var m = 0;
							    			while (m < response.processOffering.process.inputs[i].maxOccurs){
							    					//alert('myInputs[' + i  + m +   ']');
							    					var myTextArea = document.getElementById('myInputs[' + i  + m +   ']');
							    					myTextArea.innerHTML = defaultValue[i];
							    					m=m+1;
							    			}
							    		i=i+1;
							    	});
						        },
						        error: function () {
						        	setTimeout(timeout, 2000);
						        },
						        async: true
						    });
							
							if (property == "literalData"){
							}
							else if (property == "complexData"){
							newdiv.innerHTML+= '<form name="wfsfavform2" id="wfsfavform2" style="display:block">'
						//	newdiv.innerHTML += '<form name="wfsfavform2" id="wfsfavform2" style="display:block"> <SELECT NAME="wfsfav" id="wfsfav" onChange="wfsFav2();">		<OPTION VALUE="">Choisir un favori WFS<OPTION VALUE="https://geobretagne.fr/geoserver/ows?^dreal_b:stationnement_littoral">https://geobretagne.fr/geoserver//ows?^dreal_b:stationnement_littoral<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:tasmania_state_boundaries">http://geoserver.ics.perm.ru/geoserver//ows?^topp:tasmania_state_boundaries<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:tasmania_roads">http://geoserver.ics.perm.ru/geoserver//ows?^topp:tasmania_roads<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:states">http://geoserver.ics.perm.ru/geoserver//ows?^topp:states</SELECT>  </form>';
						//	newdiv.innerHTML += "<input type='button' value='WFS'  id='"+inputIndex+n+"' onclick='initConfig(9);setCurrentIndex(this.id);'><br>";
							}
						
						n=n+1;	
						nb=nb+1;
						}
					
				inputs += '\n';
				}

			}
		}
		

		
		
		//creation formulaire outputs

		outputs = '\nOutputs: \n';
		newdiv.innerHTML += "<br><br>Outputs <br>";	
		
		for (var indexOutput in response.processOffering.process.outputs)	{
			for (var property in response.processOffering.process.outputs[indexOutput]) {
				outputs += property + ': ' + response.processOffering.process.outputs[indexOutput][property]+'; \n';
				
				if ((property == "literalData")||(property == "complexData")){
					
					if (property == "literalData"){
						isLiteral[indexOutput] = 1;
					}
						else {
						isLiteral[indexOutput] = 0;
						}
					
					//$("textarea#processDescriptionText").val(newdiv.innerHTML);
					newdiv.innerHTML += response.processOffering.process.outputs[indexOutput].title + "<dd>";  //+  " <br><input type='text' name='myInputs[]'>";
					newdiv.innerHTML += "web  <input type='checkbox' checked='checked' name='3" + indexOutput + "' " +"' id='3" + indexOutput + "' onclick='checker(3" + indexOutput + ",4" + indexOutput + ");' />" + " file <input type='checkbox' name='4" + indexOutput + "' id='4" + indexOutput + "' onclick='checker(4" + indexOutput + " ,3" + indexOutput + ");' />";
					//newdiv.innerHTML += 'directory: <input type="text" id="directory" name="directory" style="width: 300px; height: 15px;" value="C:\" /> ';
						newdiv.innerHTML += 'fileName: <input type="text" id="fileName'+ indexOutput +'" name="fileName" style="width: 100px; height: 15px;" value="' + processDescription.processOffering.process.outputs[indexOutput].title +  '" />';
					
					
					//newdiv.innerHTML += "<input type='file' id='fichierEntre"+ processDescription.processOffering.process.title + inputIndex +"'/>"
					
					newdiv.innerHTML += "<br />"
					
					outputs += '\n';
					nbo = indexOutput;
				}
			}
			}
		
		

		
		newdiv.innerHTML += "<br>";	
		newdiv.id = 'divId' + $("divForm").length;

		document.getElementById("divName").appendChild(newdiv);	

		$("textarea#processDescriptionText").val(outputOffering + '\n' + '\n' + inputs + outputs);
		var i =0;
		 var doc =document.wpsfavform.wpsfav;
		 if((doc.options[doc.length-1].text).includes(identifier)==true){
			 
			for (i=0;i<nb;i++){
				document.getElementsByName("myInputs["+ i + "]")[0].value = inputValue[doc.length-2][i];
				
				if (isFixed[doc.length-2][i]==true){
					document.getElementById("1" + i + "0").checked = true;
					document.getElementById("2" + i + "0").checked = false;
				}
				else{
					document.getElementById("1" + i + "0").checked = false;
					document.getElementById("2" + i + "0").checked = true;
				}


			}
			//nbo=nbo+1;
			
			for (i=0;i<=nbo;i++){
				
				
				if (isWeb[doc.length-2][i]==true){
					document.getElementById("3" + i).checked = true;
					document.getElementById("4" + i).checked = false;
					document.getElementById("fileName" + i).value =fileName[doc.length-2][i];
				}
				else{
					document.getElementById("3" + i).checked = false;
					document.getElementById("4" + i).checked = true;
					document.getElementById("fileName" + i).value =fileName[doc.length-2][i];
				}
				
			}
			
			 
		 }
		
		
	};


	function wpsfav(){	
		initConfig(5);
	}
	
	function supfavwps(){
		
		var wpsfav = ($("#wpsfav option:selected").val());
		
		if (wpsfav.includes("Choisir")){
			
			
		}
		
		else{
			$("#wpsfav option:selected").remove();
		}
		
		
	}
		
	
	function addfavwps(){	
		var d=document.wpsfavform.wpsfav;
		
		if(!((d.options[d.length-1].text).includes(processDescription.processOffering.process.identifier))){
			
		}
			
		else{
			d.length--;
		}

		adrfavwps[d.length-1] = adresseWps;
		idfavwps[d.length-1] = processDescription.processOffering.process.identifier;
		nbinputfavwps[d.length-1] =nb;
		nboutputfavwps[d.length-1] =nbo;

		var i=0;
		
		for (i=0;i<nb;i++){
			inputValue[d.length-1][i] = document.getElementsByName("myInputs["+ i + "]")[0].value;
			idInputs[d.length-1][i] = processDescription.processOffering.process.inputs[i].identifier;
			isFixed[d.length-1][i] = document.getElementById("1"+ i + "0").checked;

		}
		i=0;
		//isWeb[d.length-1][0] = document.getElementById("30").checked;
		
		for (i=0;i<=nbo;i++){
			isWeb[d.length-1][i] = document.getElementById("3"+ i).checked;
			fileName[d.length-1][i]= document.getElementById("fileName" + i).value;
		}
		
		//isWeb[d.length-1][0] = document.getElementById("30").checked;
		
		inputValue[d.length] = new Array();
		idInputs[d.length] = new Array();
		isFixed[d.length] = new Array();
		fileName[d.length] = new Array();
		isWeb[d.length] = new Array();

		d.length++;
		d.options[d.length-1].text = adresseWps + "^" + processDescription.processOffering.process.identifier;
		
		var d2=document.getElementById("processesfavoris");
		var lastValue = $('#processesfavoris option:last-child').val();
		
		
		if(!((lastValue).includes(processDescription.processOffering.process.identifier))){
			
			$("#processesfavoris").append(new Option(adresseWps + "^" + processDescription.processOffering.process.identifier, adresseWps + "^" + processDescription.processOffering.process.identifier));
		}
		else{
			d2.length--;
			$("#processesfavoris").append(new Option(adresseWps + "^" + processDescription.processOffering.process.identifier, adresseWps + "^" + processDescription.processOffering.process.identifier));
		}
	}
	

	var clearForms = function(){
		
		//clear select
		$("#processes option").remove();
		$("#processes_execute option").remove();
		
		
		$("#processes").append($('<option></option>').val("default").html("Select a Process"));
		$("#processes_execute").append($('<option></option>').val("default").html("Select a Process"));
		
		//clear textareas
		$("textarea#capabilitiesText").val("empty");
		$("textarea#processDescriptionText").val("empty");
	};
	
	$(document).ready(function() {
			$("#wps").change(function() {
			//clear old textarea values
			clearForms();
			
			// get selected wps (url)
			var wpsUrl = $('#wps option:selected').text();
			setAdresseWps(wpsUrl);
				// only eexecute if wpsUrl is a http url
			if(wpsUrl.startsWith("http")){
				if($("#wps-version").prop("checked"))
					{wps = new WpsService({url : wpsUrl, version : "2.0.0"});
					setVersionWps("2.0.0");
					}
				else {
					wps = new WpsService({url : wpsUrl, version : "1.0.0"});
					setVersionWps("1.0.0");
				}
			
				wps.getCapabilities_GET(capabilitiesCallback);
			}
			});
		
		$("#processes").change(function() {
			// get selected wps (url)
			var processId = $('#processes option:selected').text();
			
			// only eexecute if id != default value "Select a Process"
			if(! processId.startsWith("Select"))
				wps.describeProcess_GET(describeProcessCallback, processId);
			});
		
		$("#processesfavoris").change(function() {
			// get selected wps (url)
			
			var favprocess =  $('#processesfavoris option:selected').text();
			
		    var index  = favprocess.indexOf('^');

		    
		    
		    //then get everything after the found index
		    var wpsUrl =  favprocess.substr(0,index);
		    var processId = favprocess.substr(index+1);
 
			setAdresseWps(wpsUrl);
			wps = new WpsService({url : wpsUrl, version : "1.0.0"});
			setVersionWps("1.0.0");
			// only eexecute if id != default value "Select a Process"
			if(! processId.startsWith("Select"))
				wps.describeProcess_GET(describeProcessCallback, processId);
			});
		
		$("#wps-version").change(function(){
			if (wpsService){
				if($("#wps-version").prop("checked"))
					wpsService.version = "2.0.0";
				else
					wpsService.version = "1.0.0";
			}		
		});
		
		
		$("#listeurl").change(function() {
			// get selected wps (url)
			var coucheId = $('#couche option:selected').text();
			
			// only eexecute if id != default value "Select a Process"
			if(! coucheId.startsWith(" "))
				wps.describeProcess_GET(capabilitiesCallback, coucheId);
			});
		
	});
