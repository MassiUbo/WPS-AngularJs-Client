
var innermap;
var status;
var wfsrequestexecute;

function setInnermap(i) {
	innermap = i;
}

function getProcessDescription() {
    return innermap;
}


function setSstatus(s) {
	status = s;
}

function getSstatus() {
    return status;
}

function recuperationUrl(u){
	//alert(u);
	setAdresseWFS(u);
} 



function recuperationCouche(c){

	setCoucheWFS(c);
	document.getElementById("chargementwfs").innerHTML = "chargement";
	
	adressewfs =  $('#wfs :selected').text();
	formatwfs =  $('#wfsformat :selected').text();
	
    //get the index of the start of the part of the URL we want to keep
    index  = couchewfs.indexOf(':');

    strOut = couchewfs.substr(index+1);
    strOutNS = couchewfs.substr(0,index);

	setCoucheWFS(strOut);

	
	if((adressewfs.split("/").length - 1)==4){
		adressewfs = adressewfs.substr(0, adressewfs.length-7);
		adressewfs =  adressewfs + "/" + strOutNS + "/ows?";
		setAdresseWFS(adressewfs);
	}
	else{
		adressewfs = adressewfs.substr(0, (adressewfs.length)-4);
	}

	if((((document.getElementById('wfsfavform').style.display == 'block') && (document.getElementById('wmsfavform').style.display == 'block')))||(document.getElementById('mapid').style.visibility == 'visible')){
	printWFS();
	
}

    $.ajax({
        type: "GET",
        url: adressewfs,
        data : {
    	    service: 'WFS',
    	   // version: '1.0.0',
    	    request: 'GetFeature',
    	    typeName: couchewfs,
    	  //  maxFeatures: 1
        //	contentType: "application/json; charset=utf-8",

        },
 //       dataType: "xml",
        cache: false,
      //  success : executeCallback,
	    success: function(data) {
	    	document.getElementById("chargementwfs").innerHTML = "<br>";
	    	handleJson(data);
        },
        error: function () {
        	document.getElementById("chargementwfs").innerHTML = "erreur <br>";
        	setTimeout(timeout, 2000);
        },
        async: true
    });
	
	
    if($("#checktelecharger").is(':checked')){
    	//alert(adressewfs + "REQUEST=getFeature&service=wfs&outputFormat=" + "shape-zip" + "&typename=" + couchewfs);
        telecharger();
    }
	
} 

function reinit(){
	document.getElementById("mapid").innerHTML = innermap;
	//alert(innermap);   
}

function handleJson(data) {
	response = (new XMLSerializer()).serializeToString(data);
	//alert(response);
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, "text/xml");
	wpsResponse = xmlToJson(xml) ;
	//alert (JSON.stringify(wpsResponse));
 /*   L.geoJson(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
            //return L.marker(latlng);
        }
    }).addTo(map);*/
	//alert( adressewfs.substring(0,adressewfs.length-1));
	
	if((document.getElementById('wfsfavform').style.display == 'none') || (document.getElementById('wmsfavform').style.display == 'none')){
	
	
	var myTextArea = document.getElementById('myInputs[' +currentIndex+   ']');
	
	
	//myTextArea.innerHTML = response;
	
	var defaultParameters = {
		    service: 'WFS',
		    version: '1.0.0',
		    request: 'GetFeature',
		    typeName: couchewfs,
		//    maxFeatures: 1,
		    //outputFormat: 'text/javascript',
		//	outputFormat: formatwfs,
		//    jsonCallback: 'jsonp'
		  //  format_options: 'callback: getJson'

		};
		var parameters = L.Util.extend(defaultParameters);
		var wfsrequest = adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters);
	//alert(currentIndex);
		
		
	//	alert(currentIndex.substring(0,currentIndex.length-1));
	myTextArea.innerHTML =  adressewfs + "^" + couchewfs;
	wfsrequestexecute = idInputs[0][currentIndex.substring(0,currentIndex.length-1)] + '=@xlink:href='+wfsrequest+'@method=POST@mimeType=text/xml@encoding=UTF-8@outputFormat='+ formatwfs+ ';';

	}
	
	
}





function handleJson2(data) {
	response = (new XMLSerializer()).serializeToString(data);
	//alert(response);
	var parser = new DOMParser();
	var xml = parser.parseFromString(response, "text/xml");
	wpsResponse = xmlToJson(xml) ;
	//alert (JSON.stringify(wpsResponse));
 /*   L.geoJson(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
            //return L.marker(latlng);
        }
    }).addTo(map);*/
	//alert( adressewfs.substring(0,adressewfs.length-1));
	
	if((document.getElementById('wfsfavform').style.display == 'none') || (document.getElementById('wmsfavform').style.display == 'none')){
	
	
	var myTextArea = document.getElementById('myInputs[00]');
	
	
	//myTextArea.innerHTML = response;
	
	var defaultParameters = {
		    service: 'WFS',
		    version: '1.0.0',
		    request: 'GetFeature',
		    typeName: couchewfs,
		 //   maxFeatures: 1,
		    //outputFormat: 'text/javascript',
		//	outputFormat: formatwfs,
		//    jsonCallback: 'jsonp'
		  //  format_options: 'callback: getJson'

		};
		var parameters = L.Util.extend(defaultParameters);
		var wfsrequest = adressewfs.substring(0,adressewfs.length-1) + L.Util.getParamString(parameters);
	//alert(currentIndex);
		
		
	//	alert(currentIndex.substring(0,currentIndex.length-1));
		
	//alert(idInputs[0] + '=@xlink:href='+wfsrequest+'@method=POST@mimeType=text/xml@encoding=UTF-8@outputFormat='+ formatwfs+ ';');
	//myTextArea.innerHTML =  idInputs[0] + '=@xlink:href='+wfsrequest+'@method=POST@mimeType=text/xml@encoding=UTF-8@outputFormat='+ formatwfs+ ';';
	
		myTextArea.innerHTML =  adressewfs + "^" + couchewfs;
		wfsrequestexecute = idInputs[0] + '=@xlink:href='+wfsrequest+'@method=POST@mimeType=text/xml@encoding=UTF-8@outputFormat='+ formatwfs+ ';';
		
	}
	
	
}


function addfavwfs() {
	
	
	adressewfs =  $('#wfs :selected').text();
	couchewfs =  $('#wfscouche :selected').text();
	formatwfs =  $('#wfsformat :selected').text();
	
	var d=document.wfsfavform.wfsfav;
	
	
	
	
	//for (i=0;i=i+1;i)
	// alert($(xml).find("Name",9).text());
//alert(adressewfs + "^" + couchewfs);

//alert(d.options[d.length-1].text);

	if(!((d.options[d.length-1].text).includes(couchewfs)))
	{
		d.length++; 
		d.options[d.length-1].text = adressewfs + "^" + couchewfs;
	}
	
	
	
	
	
	
	
	
}



function verificationWFS(){
	var d = document.formu.wfs;
	var newurl = document.getElementById("newWfsAdresse").value;
	
	if(!((d.options[d.length-1].text).includes(newurl)))
	{
	document.getElementById("verificationRunningWfs").style.visibility = "visible";
	    $.ajax({
	        type: "GET",
	        url: document.getElementById("newWfsAdresse").value + "SERVICE=WFS&VERSION=1.0.0&REQUEST=GetCapabilities",
	        dataType: "script",
	        cache: false,
	        success: function () {
	        	addOptionsWfs();
	        },
	        error: function () {
	        	setTimeout(timeout, 2000);
	        },
	        async: true
	    });
	}
	else{
		alert("url identique")
	}

}

function wfsFav2(){

	var d = document.wfsfavform2.wfsfav;
	adrcouche = d.value;
	str =  adrcouche.indexOf('^');
    
    strOut = adrcouche.substr(str+1);
	strOutNS = adrcouche.substr(0,str);

    setCoucheWFS(strOut);
    setAdresseWFS(strOutNS);
    //get the index of the start of the part of the URL we want to keep
    index  = couchewfs.indexOf(':');
    strOut = couchewfs.substr(index+1);
    strOutNS = couchewfs.substr(0,index);
	setCoucheWFS(strOut);
	adressewfs = adressewfs.substr(0, adressewfs.length-4);
	adressewfs =  adressewfs + "/" + strOutNS + "/ows?";
	
	setAdresseWFS(adressewfs);
	
	if((document.getElementById('wfsfavform').style.display == 'block') && (document.getElementById('wmsfavform').style.display == 'block')){
		printWFS();
	}
	
	data = adressewfs + "^" +couchewfs; 
	
    $.ajax({
        type: "GET",
        url: adressewfs,
        data : {
    	    service: 'WFS',
    	    request: 'GetFeature',
    	    typeName: couchewfs,
    	//    maxFeatures: 1
        },
        cache: false,
	    success: function(data) {
	    	handleJson2(data); 
        },
        error: function () {
        	setTimeout(timeout, 2000);
        },
        async: true
    });
	
	
    if($("#checktelecharger").is(':checked')){
        telecharger();
    }
    
}

function wfsFav3(i){
	var x = $('#wfsf'+i+' :selected').index();
	var selectedIndex = $("select[id='wpsfav'] option:selected").index();
	
	if (x!=0){
		a =$('#wfsf'+i+' :selected').text();
		$("textarea#text"+i).val(a);
		inputValue[selectedIndex-1][i] = a;
	}
	
	
}

function wfsFav(){
	adrcouche =  $('#wfsfav :selected').text();

	str =  adrcouche.indexOf('^');
    //alert(str); 
    strOut = adrcouche.substr(str+1);
    strOutNS = adrcouche.substr(0,str);
    setCoucheWFS(strOut);
    setAdresseWFS(strOutNS);
    //get the index of the start of the part of the URL we want to keep
    index  = couchewfs.indexOf(':');

    //then get everything after the found index
    strOut = couchewfs.substr(index+1);
    strOutNS = couchewfs.substr(0,index);
	
	//alert(strOut);
	setCoucheWFS(strOut);

	adressewfs = adressewfs.substr(0, adressewfs.length-4);
	
	adressewfs =  adressewfs + "" + strOutNS + "/ows?";
	setAdresseWFS(adressewfs);
	
	//alert(adressewfs);
	if(((document.getElementById('wfsfavform').style.display == 'block') && (document.getElementById('wmsfavform').style.display == 'block'))||document.getElementById('mapid').style.visibility == 'visible'){
		//appelWFS();
		printWFS();
	}
	
    $.ajax({
        type: "GET",
        url: adressewfs,
        data : {
    	    service: 'WFS',
    	    request: 'GetFeature',
    	    typeName: couchewfs,
    	 //   maxFeatures: 1

        },
        cache: false,
	    success: function(data) {
	    	handleJson(data);
        },
        error: function () {
        	setTimeout(timeout, 2000);
        },
        async: true
    });
	
	
    if($("#checktelecharger").is(':checked')){
        telecharger();
    }
    
	
	
}

function addOptionsWfs()
{
	var d = document.formu.wfs;
	var List = document.getElementById("wfs");
	var elOption = new Array(
                    new Option(document.getElementById("newWfsAdresse").value, document.getElementById("newWfsAdresse").value, false, false)
                     );
 
	var i, n;
	n = elOption.length;
 
	for (i=0; i<n; i++)
	{
		List.options.add(elOption[i]);
	}
	document.getElementById("verificationRunningWfs").style.visibility = "hidden";
	document.getElementById('wfs').options[d.length-1].selected = 'selected';
}

function addwfs() {
	//if ($('#wfs option:selected').text() != ""){

	setAdresseWFS($('#wfs option:selected').text());

	//alert(adressewms + 'service=WMS&request=GetCapabilities');
    // async call to geoserver (I'm using angular)
    
    //adressewfs=;
    
    $.ajax({
        type: "GET",
        url: adressewfs + 'service=WFS&request=GetCapabilities',
        version:'1.1.0',
 //       dataType: "xml",
        cache: false,
      //  success : executeCallback,
	    success: function(data, status, headers, config) {
	        // use the tool to parse the data
	    	
	    	response = (new XMLSerializer()).serializeToString(data);
	    	//alert(response);
	    	var parser = new DOMParser();
	    	var xml = parser.parseFromString(response, "text/xml");
	    	//alert(response["wfs:WFS_Capabilities"]["FeatureTypeList"][0]["FeatureType"]["Name"]);

	    	var d=document.formu.wfscouche;

	    	d.length=1; 
	    	 $(xml).find('FeatureType').each( function(){
	    		//alert($(this).find('Name').text());
	    		d.length++; 
	    		d.options[d.length-1].text = $(this).find('Name').text();
	    	});

        },
        error: function () {
        	setTimeout(timeout, 2000);
        },
        async: true
    });
	}
	
    
function supfavwfs(){
	
	var wfsfav = ($("#wfsfav option:selected").val());
	
	if (wfsfav.includes("Choisir")){
		
		
	}
	
	else{
		$("#wfsfav option:selected").remove();
	}
	
	
}