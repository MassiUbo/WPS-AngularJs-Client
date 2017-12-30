// sauvgarde fichier
function doDL(s){
    function dataUrl(data) {return "data:x-application/text," + escape(data);}
    window.open(dataUrl(s));
}


var wpsService = new WpsService({
    url: "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService",
    version: "2.0.0"
});	

var capabilities,
    processDescription; // the process description
    
    var capabilitiesCallback = function(response) {
        
        capabilities = response;
        // extract processes, add them to process-list
        // array of processes
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
        
        processDescription = response;
        
        //set value of textarea
        var processDocument = processDescription.responseDocument;
        
        $("textarea#processDescriptionText").val((new XMLSerializer()).serializeToString(processDocument));
        
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