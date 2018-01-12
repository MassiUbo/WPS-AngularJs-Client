// Declaration de variables

var adresseWps;
var versionWps;	
var processId;
var processDescription;
var identifier;
var currentIndex;

var defaultValue = new Array();
var isFixed = new Array();
var isLiteral = new Array();

var inputValue = new Array();
inputValue[0] = new Array();

var idInputs =new Array();
idInputs[0] = new Array();

//var isFixed = new Array();
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

function setProcessId(p) {
	processId = p;
}

function setAdresseWps(a) {
	adresseWps = a;
}


function setVersionWps(v) {
	versionWps = v;
}

var p;
function setIdentifier(i) {
	identifier = i;
}

// sauvgarde fichier
function doDL(s){
    function dataUrl(data) {return "data:x-application/text," + escape(data);}
    window.open(dataUrl(s));
}


// Fonction execution process sur le serveur 
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

// Configuration de sauvgarde

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

// Excecution de la requête
function executeCallback (data, url) {
	
	// reponse de la requête
	response = (new XMLSerializer()).serializeToString(data);
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, "text/xml");
	wpsResponse = xmlToJson(xml) ;
	var selectedIndex = $("select[id='wpsfav'] option:selected").index();
	selectedIndex = selectedIndex -1 ;
	 
	 // sauvgarder le resultat comme Json   
	 try{
	 if (isWeb[selectedIndex][0] == false) {
		// Download.save(JSON.stringify(wpsResponse),fileName[selectedIndex] + ".txt");
		document.getElementById("resultat").innerHTML += " <textarea id='message' name='message' rows='9' cols='80'>"+JSON.stringify(wpsResponse)+"</textarea>" ;
	 }
	 // si non on excute sur le web 
	 else{
		 window.open(url);
	 }

	 }
	 catch(err) {
		 window.alert("selectionnez une configuration !")
	 }
	try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]
	
	} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
		}
	
}

// initialize wpsService
var wpsService = new WpsService({
	url: "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService",
	version: "1.0.0"
});	
	
	var capabilities, processDescription; // the process description
	
	// requête getcapabilitis
	var capabilitiesCallback = function(response) {
		var pinchou = new Array()
		capabilities = response;
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
	// Ajout liste de process

	$.each(processes, function(index, process) {
		_select.append(
	     pinchou.push(process)); 
    });  
	
	var capabilitiesDocument = response.responseDocument;
    
	       
	var outputOffering1 = 'Liste de process : \n ';
     //	if (capabilitiesDocument.version != null){
	  for ( i = 0; i< pinchou.length; i++){
	  outputOffering1 += "" + pinchou [i].identifier +'; \n';
     ///	 outputOffering1 += "p" +capabilities+ '; \n';
	  }
	p = outputOffering1
	$("textarea#capabilitiesText").val(outputOffering1);
   //}
	//outputOffering += "process : " + processes+'; \n';
	//outputOffering += "description : " + processes+'; \n';
	//$("textarea#capabilitiesText").val((new XMLSerializer()).serializeToString(capabilitiesDocument));

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
	    	
		var outputOffering = '';
		if (response.processOffering.version != null){
			outputOffering += "version : " + response.processOffering.version+'; \n';
		}
		

		// Ajout de la description des process dans le textarea
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
							newdiv.innerHTML += " <br><div " + inputIndex +  n +"' " +"' id='notused" + inputIndex + n +"' /> ";			
							newdiv.innerHTML += "<textarea type='text' name='myInputs[" + nb + "]'  id='myInputs[" + inputIndex + n + "]'  style='width:250px;height:25px;' value='"+defaultValue[inputIndex]+"'></textarea>" ;
							newdiv.innerHTML += "Text WKT  <input type='checkbox' checked='checked' name='1" + inputIndex + n + "' " +"' id='1" + inputIndex + n + "' onclick='checker(1" + inputIndex + n + ",2" + inputIndex + n + ");' />";
						//	newdiv.innerHTML +=  "user <input type='checkbox' name='2" + inputIndex + n + "' id='2" + inputIndex + n + "' onclick='checker(2" + inputIndex + n + " ,1" + inputIndex + n + ");' />";
							var d=document.wpsfavform.wpsfav;
							idInputs[d.length-1][nb] = response.processOffering.process.inputs[nb].title;
							

							// requeste vers serveur
						    $.ajax({
						        type: "GET",
						        url: adresseWps + 'service=WPS&version=' + versionWps + '&request=DescribeProcess&identifier='+ identifier,
						        cache: false,
							    success: function(data, status, headers, config) {
							    	
							    	response2 = (new XMLSerializer()).serializeToString(data);
							    	var parser = new DOMParser();
							    	var xml = parser.parseFromString(response2, "text/xml");
							    	var i=0;
							    	 $(xml).find('LiteralData').each( function(){
							    		
							    		defaultValue[i]=$(this).find('DefaultValue').text();
							    		var m = 0;
							    			while (m < response.processOffering.process.inputs[i].maxOccurs){
							    					
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
							
							newdiv.innerHTML+= '<form name="wpsmassi" id="wpsmassi" style="display:block">'
							}
						
						n=n+1;	
						nb=nb+1;
						}
					
				inputs += '\n';
				}

			}
		}

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
					
					newdiv.innerHTML += response.processOffering.process.outputs[indexOutput].title + "<dd>";  //+  " <br><input type='text' name='myInputs[]'>";
					newdiv.innerHTML += "Executer sur WEB  <input type='checkbox' checked='checked' name='3" + indexOutput + "' " +"' id='3" + indexOutput + "' onclick='checker(3" + indexOutput + ",4" + indexOutput + ");' />" + " Telecharger <input type='checkbox' name='4" + indexOutput + "' id='4" + indexOutput + "' onclick='checker(4" + indexOutput + " ,3" + indexOutput + ");' />";
					newdiv.innerHTML += 'Nom fichier: <input type="text" id="fileName'+ indexOutput +'" name="fileName" style="width: 100px; height: 25px;" value="' + processDescription.processOffering.process.outputs[indexOutput].title +  '" />';
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
	
	// suppression des favoris wps
	function supfavwps(){
		var wpsfav = ($("#wpsfav option:selected").val());
		if (wpsfav.includes("Choisir")){
			
		}
		else{
			$("#wpsfav option:selected").remove();
		}	
	}
		
	
	function addfavwps(){	
		// document.getElementById("divSlider").style.visibility = "hidden";
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
		
		for (i=0;i<=nbo;i++){
			isWeb[d.length-1][i] = document.getElementById("3"+ i).checked;
			fileName[d.length-1][i]= document.getElementById("fileName" + i).value;
		}
		
		inputValue[d.length] = new Array();
		idInputs[d.length] = new Array();
		isFixed[d.length] = new Array();
		fileName[d.length] = new Array();
		isWeb[d.length] = new Array();

		d.length++;
		d.options[d.length-1].text = adresseWps + "^" + processDescription.processOffering.process.identifier;
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
		
		$("#wps-version").change(function(){
			if (wpsService){
				if($("#wps-version").prop("checked"))
					wpsService.version = "2.0.0";
				else
					wpsService.version = "1.0.0";
			}		
		});
		
		
	});
