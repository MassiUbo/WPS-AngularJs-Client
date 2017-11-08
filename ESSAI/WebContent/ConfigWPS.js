//resultats requetes 		
var processDescription;
var value;
//id du process selectionné
var processId;
var adresseWps;
var versionWps;

function setProcessDescription(p) {
	processDescription = p;
}
//test


function getProcessDescription() {
    return processDescription;
}

function setValue(v) {
	value = v;
}

function getValue() {
    return value;
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

//version



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
	        url: document.getElementById("adr").value + "SERVICE=WPS&VERSION=1.0.0&REQUEST=GetCapabilities",
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
	var x=0;
	var inputGenerator = new InputGenerator();
	var inputTab=[''];
	inputs = "";
	
	for (var sumInput in processDescription.processOffering.process.inputs)	{
		for (var property in processDescription.processOffering.process.inputs[sumInput]) {
			if (property == "literalData"){	
				value= document.getElementById("myInputs[" + x + "]").value;
				inputs += "\n" + processDescription.processOffering.process.inputs[x].title + " value = " + value;
				inputTab[x] = inputGenerator.createLiteralDataInput_wps_1_0_and_2_0(processDescription.processOffering.process.inputs[x].title, undefined, undefined, value);
				//alert(processDescription.processOffering.process.inputs[x].title); 
			}
			else if (property == "complexData"){
				value= document.getElementById("myInputs[" + x + "]").value;
				inputs += "\n" +  processDescription.processOffering.process.inputs[x].title + " value = " + value;
				inputTab[x] = inputGenerator.createComplexDataInput_wps_1_0_and_2_0(processDescription.processOffering.process.inputs[x].title,undefined, undefined, undefined, undefined, value);
				//alert(processDescription.processOffering.process.inputs[x].title); 
			}
		}
	x=x+1;	
	}
	//alert(inputs);
	
	var y=0;
	var outputGenerator = new OutputGenerator();
	var outputTab=[''];				
	for (var output in processDescription.processOffering.process.outputs[y])	{
		for (var property in processDescription.processOffering.process.outputs[y]) {
			outputs += property + ': ' + processDescription.processOffering.process.outputs[y][property]+'; \n';
		
			if (property == "literalData"){
				//var asReference = "false";
				outputTab[y]=outputGenerator.createLiteralOutput_WPS_1_0(processDescription.processOffering.process.outputs[y].title, false);
				//alert(processDescription.processOffering.process.outputs[y].title);
			}
			if (property == "complexData"){
				outputTab[y] = outputGenerator.createComplexOutput_WPS_1_0(processDescription.processOffering.process.outputs[y].title,undefined, undefined, undefined, undefined);
				//alert(processDescription.processOffering.process.outputs[y].title);
			}
			
			
		}
	y=y+1;
	}
	alert(processDescription.processOffering.process.title);
	alert(processId);
	wpsService.setUrl(adresseWps);
	wpsService.execute(executeCallback, processDescription.processOffering.process.identifier, "document", "sync", false, inputTab, outputTab); //inputGenerator, outputGenerator);

}

var executeCallback = function(response) {
		
	var out;
	for (var property in response) {
		out += property + ': ' + response[property]+'; \n';
	}
	alert(out);
}
	

// initialize wpsService
var wpsService = new WpsService({
	url: "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService",
	//http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService
	//http://envision-wps.brgm-rec.fr/WPS.NET/WPService.asmx/WPS
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
		
		initConfig(4);
		setProcessDescription(response);

		var outputOffering = '';
		for (var property in response.processOffering) {
			outputOffering += property + ': ' + response.processOffering[property]+'; \n';
		}
		outputOffering += "\n";
		for (var property in response.processOffering.process) {
			outputOffering += property + ': ' + response.processOffering.process[property]+'; \n';
		}
		outputOffering += "\n";
		var x=0;
		inputs = 'Inputs: \n';
		newdiv =document.createElement('divForm');
		newdiv.innerHTML = "Inputs <br>";
		
		for (var input in response.processOffering.process.inputs[x].literalData)	{
		for (var property in response.processOffering.process.inputs[x].literalData) {
			outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData[property]+'; \n';		
		}	
		x=x+1;
		}
		outputOffering += "\n";
		x=0;
		for (var input in response.processOffering.process.inputs[x].literalData.literalDataDomains)	{
			for (var property in response.processOffering.process.inputs[x].literalData.literalDataDomains[0]) {
				outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData.literalDataDomains[0][property]+'; \n';		
			}	
			x=x+1;
			}
		x=1;
		outputOffering += "\n";
		for (var input in response.processOffering.process.inputs[x].literalData.literalDataDomains)	{
			for (var property in response.processOffering.process.inputs[x].literalData.literalDataDomains[0]) {
				outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData.literalDataDomains[0][property]+'; \n';		
			}	
			x=x+1;
			}
		
		x=0;
		outputOffering += "\n";
		for (var input in response.processOffering.process.inputs[x].literalData.literalDataDomains)	{
			for (var property in response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType) {
				outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType[property]+'; \n';		
			}	
			x=x+1;
			}
		
		x=1;
		outputOffering += "\n";
		for (var input in response.processOffering.process.inputs[x].literalData.literalDataDomains)	{
			for (var property in response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType) {
				outputOffering += property + ': ' + response.processOffering.process.inputs[x].literalData.literalDataDomains[0].dataType[property]+'; \n';		
			}	
			x=x+1;
			}
		
		outputOffering += "\n";
		x=0;
		//creation formulaire inputs
		for (var input in response.processOffering.process.inputs[x])	{
			for (var property in response.processOffering.process.inputs[x]) {
				inputs += property + ': ' + response.processOffering.process.inputs[x][property]+'; \n';
				
				if (property == "literalData"){	
					newdiv.innerHTML += response.processOffering.process.inputs[x].title;
						if( response.processOffering.process.inputs[x].minOccurs==1){
						newdiv.innerHTML += "*";
					}
						//alert(response.processOffering.process.inputs[x].literalData.literalData);
						
						//outputOffering += "\n";
				newdiv.innerHTML += " <br><input type='text' name='myInputs[" + x + "]'  id='myInputs[" + x + "]' value='0'>" + "<br>";
				inputs += '\n';
				}
				
				else if (property == "complexData"){
					newdiv.innerHTML += response.processOffering.process.inputs[x].title;
					/*for (var property in response.processOffering.process.inputs[x].complexData.complexData) {
						outputOffering += property + ': ' + response.processOffering.process.inputs[x].complexData.complexData[property]+'; \n';
					}*/
					
					if( response.processOffering.process.inputs[x].minOccurs==1){
						newdiv.innerHTML += "*";
					}
				newdiv.innerHTML += " <br><input type='text' name='myInputs[" + x + "]' id='myInputs[" + x + "]' value='0'>" + "<br>";
				inputs += '\n';
				}
			}
		x=x+1;
		}
			
		//creation formulaire outputs
		var y=0;
		outputs = '\nOutputs: \n';
		newdiv.innerHTML += "<br>Outputs <br>";	
		
		for (var output in response.processOffering.process.outputs[y])	{
			for (var property in response.processOffering.process.outputs[y]) {
				outputs += property + ': ' + response.processOffering.process.outputs[y][property]+'; \n';
				
				if (property == "literalData"){
					newdiv.innerHTML += response.processOffering.process.outputs[y].title +  " <br><input type='text' name='myInputs[]'>"+ "<br>";
					outputs += '\n';
				}
				if (property == "complexData"){
					newdiv.innerHTML += response.processOffering.process.outputs[y].title + " <br><input type='text' name='myInputs[]'>"+ "<br>";
					outputs += '\n';
				}
			}
			y=y+1;
			}
		newdiv.innerHTML += "<br>";	
		document.getElementById("divName").appendChild(newdiv);	
		$("textarea#processDescriptionText").val(outputOffering + '\n' + '\n' + inputs + outputs);
	};
	
	
		
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
					wps = new WpsService({url : wpsUrl, version : "2.0.0"});
				else
					wps = new WpsService({url : wpsUrl, version : "1.0.0"});
			
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
