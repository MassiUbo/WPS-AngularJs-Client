


	function initConfig(a) {
		
		if (a==0){
	    document.location.href = 'ConfigView.html';
	    document.getElementById('adresseWMS').value = adresse;//getAdresse();
	    document.getElementById('adresseWFS').value = adressewfs; //getAdresseWFS();
	    document.getElementById('coucheWMS').value = couche; // getCouche();
	    document.getElementById('coucheWFS').value = couchewfs; //getCoucheWFS();
	}
		
		else if (a==1){
			document.location.href = 'ConfigWPS.html';
		}
		
		else if (a==2){
			document.location.href = 'MapView.html';
		}
		
		
		
		else if (a==3){
			document.location.href = 'ConfigWPS.html';
			
		}
		else if (a==4){
			document.getElementById("capabilities").style.display = "none";
			document.getElementById("intro").style.display = "none";
			document.getElementById("map").style.display = "none";
			document.getElementById("describe").style.display = "none";
			document.getElementById("choix").style.display = "block";
			document.getElementById("adresse").style.display = "none";
			document.getElementById("verificationRunning").style.display = "none";
		}
	}
	//ff
	function initMap(a, c, f, a2,c2,f2) {
		setAdresse(a); 
		setCouche(c); 
		setFormatWMS(f);
		setAdresseWFS(a2);
		setCoucheWFS(c2);
		setFormatWFS(f2);
	}


