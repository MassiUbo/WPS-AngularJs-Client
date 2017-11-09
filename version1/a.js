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




// initialize wpsService
var wpsService = new WpsService({
	url: "https://geobretagne.fr/geoserver/ows?",
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
		
		
	});
