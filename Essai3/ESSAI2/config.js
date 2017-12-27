
//valeur par défaut
var adresse = "https://portail.indigeo.fr/geoserver/LETG-BREST/wfs?";
var adressewms = "https://portail.indigeo.fr/geoserver/LETG-BREST/wfs?";
var adressewfs = "http://geoserver.ics.perm.ru/geoserver/topp/ows?";
var couchewms= 'Activites_maritimes_2010_06_16_18h_L93';//'ne:ne';
var couchewfs = 'states';
var formatwms = 'jpeg';
var formatwfs = 'json';
var serviceError;
var l=0;
var maptemp=0;


//fonction getters et setters des variables adresse et couche

function setAdresse(adr) {
    adresse = adr;
}

function getAdresse() {
    return adresse;
}

function setAdresseWMS(adr) {
	adressewms = adr;
}

function getAdresseWMS() {
    return adressewms;
}

function setAdresseWFS(adrwfs) {
    adressewfs = adrwfs;
}

function getAdresseWFS() {
    return adressewfs;
}

function setCouche(layer) {
    couchewms= layer;
}

function getCouche() {
    return couchewms;
}

function setCoucheWMS(layer) {
    couchewms= layer;
}

function getCoucheWMS() {
    return couchewms;
}

function setCoucheWFS(layerwfs) {
    couchewfs = layerwfs;
}

function getCoucheWFS() {
    return couchewfs;
}

function setFormatWMS(fwms) {
    formatwms = fwms;
}

function getFormatWMS() {
    return formatwms;
}

function setFormatWFS(fwfs) {
    formatwfs = fwfs;
}

function getFormatWFS() {
    return formatwfs;
}

// fonction de verification de l'URL
function verificationAdresseWMS() {
    verif.innerHTML = "verification";
    serviceError = setTimeout(timeout, 6000);
        $.ajax({
            type: "GET",
            url: adresseWMS.value + "SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities",
            dataType: "script",
            cache: false,
            success: function(){//result) {
                initMap(adresseWMS.value, coucheWMS.value, formatWMS.value, adresseWFS.value, coucheWFS.value, formatWFS.value);
                config(2);
            },
            error:function (xhr, ajaxOptions, thrownError){
            },              
            async: true
        });
}

function verificationAdresseWFS() {
	verif.innerHTML = "verification";
    serviceError = setTimeout(timeout, 6000);
    $.ajax({
        type: "GET",
        url: adresseWFS.value + "SERVICE=WFS&VERSION=1.1.0&REQUEST=GetCapabilities",
        dataType: "script",
        cache: false,
        success: function () {
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        async: true
    });
}

//fonction timeout si url invalide
function timeout() {
//	verif.innerHTML = "url invalide";
}


$(document).ready(function () {
 /*   $('select[name="couche"]').change(function () { // lorsqu'on change de valeur 
        couchewms= $('select[name="couche"]').val(); // valeur sélectionnée
        printWMS();
    });*/
});

// fonction d'affichage du panneau de configuration
function config(a) {
   if (a==2){
        document.getElementById("config").style.display = "none";
        document.getElementById("verif").style.display = "none";
        document.getElementById("config7").style.display = "block";
    }
    else if (a == 4) {
        document.getElementById("config").style.display = "block";
        document.getElementById("config7").style.display = "none";
    }
    else if (a == 5) {
        document.getElementById("verif").style.display = "block";
    }

    else {
        document.getElementById("config").style.display = "block";
    }
}


var ie_writeFile = function (fname, data) {
    var fso, fileHandle;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    fileHandle = fso.CreateTextFile(fname, true);
    fileHandle.write(data);
    fileHandle.close();
  };



//fonction de telechargement des données
function telecharger() {
	
  //  var url = adresseWFS.value + "REQUEST=getFeature&service=wfs&outputFormat=" + "shape-zip" /*formatwfs*/ + "&typename=" + coucheWFS.value;
   // var url = adressewfs + "REQUEST=getFeature&service=wfs&outputFormat=" + "shape-zip" + "&typename=" + couchewfs;
    //alert(url);
    
    window.open(url);
    //si le format est un zip j'ouvre la fenêtre qui propose le téléchargement
    if (formatwfs == "shape-zip") {
        window.open(url);
    }
    else {
        //j'affiche l'url à laquelle je doit accéder
        //alert(url);
        var req = new XMLHttpRequest();
        //j'utilise le proxy en localhost pour rediriger vers l'url
        req.open('GET', 'http://localhost:8080/leaflet/proxy.php?url=', false);// + url, false);
        req.send(null);
       // alert("ok");
        if (req.status == 200) {
            //affichage de la réponse
           // alert(req.responseText);
            
            
            var s = req.responseText;
            ie_writeFile("wfs.json", s);
        
        }
    }

}
/*
function telechargerwps() {
	 var url = adressewps + "REQUEST=getFeature&service=wfs&outputFormat=" + "shape-zip" + "&typename=" + couchewps;
	window.open(url);
}*/

/*
map.on('click', function(e) {
	l=l+1;
   // alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    document.getElementById("zone").innerHTML += "Point " + l + " Latitude: " + e.latlng.lat + " Longitude: " + e.latlng.lng + "<br>";
    
    if (l>2){
    	l=1;
    	document.getElementById("zone").innerHTML = "Point " + l + " Latitude: " + e.latlng.lat + " Longitude: " + e.latlng.lng + "<br>";
    }
    
    
    
});*/



    function charger(){
 
        // Fetch the geojson file
    	$.getJSON('wfs.json', function (data) {
    	    // Define the geojson layer and add it to the map
    	    L.geoJson(data).addTo(map);
    	    
    		});
    	//alert("chargé");
    }
    
