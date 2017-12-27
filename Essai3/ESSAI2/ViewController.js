
	function initConfig(a) {		
		
		
		 if (a==2){
			//retour map
			//document.location.href = 'MapView.html';
			document.getElementById('accueil').style.display = 'block';	
			//tout le reste = none ou hidden
			//document.getElementById('wrapper').style.visibility = 'hidden';
			document.getElementById('wrapper').style.display = 'none';
			document.getElementById('mapid').style.visibility = 'visible';
			document.getElementById('map').style.display = 'none';
			document.getElementById('divName').style.visibility = 'hidden';
			document.getElementById('wps').style.visibility = 'hidden';
			document.getElementById('wps').style.display = 'none';
			document.getElementById('wpsexe').style.display = 'none';
			document.getElementById('wpsfavform').style.display = 'none';
			document.getElementById("divSlider").style.display = "none";
			document.getElementById("retour").style.display = "none";
			document.getElementById('reinitialiser').style.visibility = 'visible';
	    	document.getElementById("listecouchemap").style.display = "none";
	    
	    	
			document.getElementById('tempid').style.display = 'none'; 
			document.getElementById('choix').style.display = 'none';
	    	maptemp= 0,
	    	reprint();
		}
		
		else if (a==3){
			//document.location.href = 'ConfigWPS.html';
			//document.getElementById('wrapper').style.visibility = 'hidden';
			document.getElementById('wrapper').style.display = 'none';
			document.getElementById('divName').style.visibility = 'hidden';
			document.getElementById('accueil').style.display = 'block';
			document.getElementById('choix').style.display = 'none';
			document.getElementById('mapid').style.visibility = 'visible';
		}
		else if (a==4){
			document.getElementById("capabilities").style.display = "none";
			document.getElementById("map").style.display = "none";
			document.getElementById("describe").style.display = "none";
			document.getElementById("choix").style.display = "block";
			document.getElementById("verificationRunning").style.display = "none";
			document.getElementById("processDescription").style.display = "block";
		}
		else if (a==5){
	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("slider").style.display = "none";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";
	    	document.getElementById("retour").style.display = "block";	
	    	document.getElementById("choix").style.display = "none";
	    	// newdivS =document.createElement('divSlider');
	    	document.getElementById("divSlider").innerHTML = "<br> Inputs: <br> <br>";
	    		var inputnbr = 0;
	    	for (var indexInput in processDescription.processOffering.process.inputs)	{
	    		var n=0;
	    		while ((n < processDescription.processOffering.process.inputs[indexInput].maxOccurs) && document.getElementById("notused" +indexInput + n).checked){
	    		//  inputValue[0][inputnbr] = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    		//	idInputs[0][inputnbr] = processDescription.processOffering.process.inputs[indexInput].identifier;
	    			inputnbr = inputnbr +1;
	    			n=n+1;
	    		}
			}
			
	    	var i=0;
	    	var listeInputs = "";
	    	while (i<nbinputfavwps[selectedIndex]){	    		
		    	var selectedIndex = $("select[id='wpsfav'] option:selected").index();
		    	selectedIndex =selectedIndex -1;
	    		listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
	    		//document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + inputValue[selectedIndex][i] + "<br><br>";
	    		i=i+1;
	    	}
		}

		else if (a==6){
	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("choix").style.display = "none";
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";
	    	var i=0;
	    		
	    // newdivS =document.createElement('divSlider');
	    	
	    	 document.getElementById("divSlider").innerHTML  = "<br> Outputs: <br><br>";
	    	 while (isLiteral[i] != null){
	    		if (isLiteral[i]==1){
	    			document.getElementById("divSlider").innerHTML  +=  wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["ows:Identifier"]["#text"] + "<br>";
	    			document.getElementById("divSlider").innerHTML  += wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["wps:Data"]["wps:LiteralData"]["#text"] + "<br><br>";
	    		}
	    		else if (isLiteral[i]==0){
	    			document.getElementById("divSlider").innerHTML  +=  wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["ows:Identifier"]["#text"] + "<br>";
	    			document.getElementById("divSlider").innerHTML  += wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"][i]["wps:Data"]["wps:ComplexData"]["#text"] + "<br>";	    			
	    		}
	    		
	    		document.getElementById("divSlider").innerHTML  += "<br>";
	    		//	document.getElementById("divSlider").appendChild(newdivS);
	    		i=i+1;
	    	 }
	}
		
		else if (a==7){
	    	//document.getElementById("processDescription").style.display = "block";
	    	document.getElementById("execute").style.display = "none";
	    	document.getElementById('divName').style.visibility='visible';
	    	document.getElementById("retour").style.display = "none";
	    	document.getElementById("divSlider").style.display = "none";
	    	document.getElementById("choix").style.display = "block";
	    	document.getElementById("slider").style.display = "none";
	    	document.getElementById('mapid').style.visibility='hidden';
	    	document.getElementById("listecouchemap").style.display = "none";
	    	document.getElementById("processDescription").style.display = "block";
		}
		
		else if (a==8){
			
	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById("choix").style.display = "none";
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";

	    	
		if(isLiteral[0] == 1){
			
			/*	try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:LiteralData"]["#text"]
				
				} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
					}
				*/
				alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:LiteralData"]["#text"]);
			}
			
			else {
				alert(wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:ComplexData"]["#text"]);
		/*		try {wpsResponse["wps:ExecuteResponse"]["wps:ProcessOutputs"]["wps:Output"]["wps:Data"]["wps:ComplexData"]["#text"]
				
				} catch(err) {	alert(wpsResponse["ExceptionReport"]["Exception"]["ExceptionText"]["#text"]);
					}*/
			}
		
		}

		else if (a==9){
			l=0;

	    	document.getElementById("processDescription").style.display = "none";
	    //	document.getElementById("slider").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';
	    //	document.getElementById("divSlider").style.display = "block";
	    	//document.getElementById("retour").style.display = "block";
	    	document.getElementById("choix").style.display = "none";
	    	//document.getElementById("wfsConfig").style.display = "block";
	    	document.getElementById('mapid').style.visibility='visible';
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById("listecouchemap").style.display = "none";
	    	document.getElementById('mapid').style.visibility='hidden';
	    	
		}
		else if (a==10){
	    	document.getElementById("listecouchemap").style.display = "none";

		}
		else if (a==11){
			
	

	    	document.getElementById("processDescription").style.display = "none";
	    	document.getElementById('wpsexe').style.display = 'block';
	    	document.getElementById("slider").style.display = "none";
	    	document.getElementById('divName').style.visibility='hidden';
	    	document.getElementById("divSlider").style.display = "block";
	    	//document.getElementById("retour").style.display = "block";
	    	document.getElementById("choix").style.display = "none";
	    	// newdivS =document.createElement('divSlider');
	    	document.getElementById("divSlider").innerHTML = "<br> Inputs: <br> <br>";
	    	//alert(document.getElementById("myInputs[00]").value);
	    	//alert(document.getElementById("myInputs[00]").value);
	    	//alert($("select[id='wpsfav'] option:selected").index());
	        //alert(selectedIndex);
			//alert(inputValue[selectedIndex][0]);
			//alert(inputValue[selectedIndex][1]);
	    	
	    	var selectedIndex = $("select[id='wpsfav'] option:selected").index();
	    	//alert(selectedIndex);
	    	//alert(inputValue[selectedIndex-1][0]);
			//alert(inputValue[selectedIndex-1][1]);
	    	
	    	var inputnbr = 0;
	    			
	    	if (selectedIndex != 0){
	    	for (var indexInput in processDescription.processOffering.process.inputs)	{
	    		var n=0;
	    		while ((n < processDescription.processOffering.process.inputs[indexInput].maxOccurs) && document.getElementById("notused" +indexInput + n).checked){
	    			
	    			//alert(selectedIndex);
	    			var ok = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    			//var fdg = document.getElementById("myInputs[" + indexInput + n+ "]").value;	
	    			//inputValue[selectedIndex][inputnbr] = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    		//	idInputs[selectedIndex][inputnbr] = processDescription.processOffering.process.inputs[indexInput].identifier;
	    			inputnbr = inputnbr +1;
	    			n=n+1;
	    			//alert(inputValue[inputnbr]);
	    			//var fdg = document.getElementById("myInputs[" + indexInput + n+ "]").value;
	    			//alert(ok);
	    			
	    			
	    			/*if((ok.indexOf(adressewfs) >= 0)){
	    				document.getElementById("divSlider").innerHTML += idInputs[indexInput] + "<br>" + ok+ "<br>";
	    			}*/		
	    		}
	    	}
	    	
	    	var i=0;
	    	var listeInputs = "";
	    	
	    	//document.getElementById('wpsfav').options[0].selected = 'selected';
	    	
	    	while (i<nbinputfavwps[selectedIndex-1]){
	    		if ($('#wfsfavform2').length > 0) { 
	    			//complex data
	    		var d = document.wfsfavform2.wfsfav;
	    		//alert(d.value);
	    		
	    		//alert(d.options[0].selected);
				    	//	if(d.options[0].selected == 'true'){
				    			
				    			//alert(document.getElementById("1" +i + "0"));
				    		
	    		if (inputValue[selectedIndex-1][i].indexOf("^") >= 0){
	    			
	    			var index  = inputValue[selectedIndex-1][i].indexOf('^');
	    		    strOut = inputValue[selectedIndex-1][i].substr(index+1);
	    		    strOutNS = inputValue[selectedIndex-1][i].substr(0,index);
	    		   // alert("1" +strOut);
	    		   //  alert("2" +strOutNS);
	    		    adressewfs = strOutNS; 
				}
				
	    		adresseWps = adrfavwps[selectedIndex-1];
	    		identifier = idfavwps[selectedIndex-1];
	    	    			
				    			if ($('#1' +i + '0').length > 0) { 
				    				//alert("9");
					    			if(isFixed[selectedIndex-1][i] == true){
					    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + inputValue[selectedIndex-1][i] + "<br>";
					    			}
				    			
					    			//if user
					    			else {
					    				var selectedIndex = $("select[id='wpsfav'] option:selected").index();		    				
					    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='"+inputValue[selectedIndex-1][i]+"'>"+inputValue[selectedIndex-1][i]+"</textarea><br>" ;
					    				
					    				if ($('#wfsfav').length > 0){ 
					    					document.getElementById("divSlider").innerHTML += '<form name="wfsfavform2" id="wfsfavform2" style="display:block"> <SELECT NAME="wfsf'+i +'" id="wfsf'+i +'" onChange="wfsFav3('+i +');">		<OPTION VALUE="">Choisir un favori WFS<OPTION VALUE="https://geobretagne.fr/geoserver/ows?^dreal_b:stationnement_littoral">https://geobretagne.fr/geoserver//ows?^dreal_b:stationnement_littoral<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:tasmania_state_boundaries">http://geoserver.ics.perm.ru/geoserver//ows?^topp:tasmania_state_boundaries<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:tasmania_roads">http://geoserver.ics.perm.ru/geoserver//ows?^topp:tasmania_roads<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:states">http://geoserver.ics.perm.ru/geoserver//ows?^topp:states</SELECT>  </form>';	
					    				}
									}
									
				    			//si favori wps pas selectionné
				    			//alert("8");
					    		listeInputs +=  idInputs[selectedIndex-1][i]  +"=" + inputValue[selectedIndex-1][i] +";" ;
					    		if(!(ok.indexOf(adressewfs) >= 0)){
					    		//document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + inputValue[selectedIndex][i] + "<br>";
					    		}
				    		}
				    		
				    		else{
				    			//si pas favori wps selectionné
				    		    //alert("4");
				    			
				    			if ($('#1' +i + '0').length > 0){ 
				    				alert(isFixed[selectedIndex-1][i]);
					    			if(isFixed[selectedIndex-1][i] == true){
					    				
					    			//alert("1");
					    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + inputValue[selectedIndex-1][i] + "<br>";	
						    			if(!(ok.indexOf(adressewfs) >= 0)){
						    				if ((d.value).length > 0 ){
						    				//	alert("10");				    					
							    			//document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + inputValue[selectedIndex-1][i] + "<br>";
						    				}
						    				else{
						    				// alert("11");
									    	//document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + inputValue[selectedIndex-1][i] + "<br>";
						    				}
							    			}
						    			else{
						    			//	alert("2");
						    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][indexInput] + "<br>" + ok+ "<br>";

						    			}
					    			}
					    			//if user
					    			else {

						    			if((ok.indexOf(adressewfs) >= 0)){
						    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='"+inputValue[selectedIndex-1][i]+"'>"+inputValue[selectedIndex-1][i]+"</textarea><br>" ;
						    				
							    			//document.getElementById("divSlider").innerHTML += idInputs[i] + "<br>" + d.value + "<br>";
							    			}
						    			else{
						    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='"+inputValue[selectedIndex-1][i]+"'>"+inputValue[selectedIndex-1][i]+"</textarea><br>" ;

						    			}
					    			}
				    			}
				    		}
				    }
	    		else{
	    			
	    			//if user selected
	    			//if fixed
	    			if ($('#1' +i + '0').length > 0) { 
	    				
	    			//alert(i+"ok");
	    			//alert("4");
	    			//alert(isFIxed[selectedIndex][i]);
	    				
	    			if(isFixed[selectedIndex-1][i] == false){
	    					
	    		    //alert("2");
			    		listeInputs +=  idInputs[selectedIndex-1][i]  +"=" + inputValue[selectedIndex-1][i] +";" ;
	    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='"+inputValue[selectedIndex][i]+"'>"+inputValue[selectedIndex][i]+"</textarea><br>" ;
	    				
	    			//document.getElementById('text' + i + '').value = inputValue[i];
	    				
	    			//inputValue
	    			}
	    			else{
	    				//alert("5");
    					listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
    			    	document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + inputValue[selectedIndex][i] + "<br>";
	    			}
	    			}
	    			//if user
	    			else {
	    				
	    				if ($('#1' +i + '0').length > 0) { 
	    					//alert("6");
		    				listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
		    				document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + "<textarea type='text' name='myInputs[" + i + "]'  id='myInputs[" + i + "]'  style='width:250px;height:15px;' value='"+inputValue[selectedIndex][i]+"'></textarea><br>" ;
		    			}
	    				else{
	    					//alert("7");
	    					listeInputs +=  idInputs[selectedIndex][i]  +"=" + inputValue[selectedIndex][i] +";" ;
	    			    	document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + inputValue[selectedIndex][i] + "<br>";
	    							
	    				}
	    			}
	    		}
	    		i=i+1;
	    	}
	    	}
		}
		else if(a==12){
			
			l=0;

	    	document.getElementById("processDescription").style.display = "none";
	    //	document.getElementById("slider").style.display = "block";
	    	document.getElementById('divName').style.visibility='hidden';
	    //	document.getElementById("divSlider").style.display = "block";
	    	//document.getElementById("retour").style.display = "block";
	    	document.getElementById("choix").style.display = "none";
	    	//document.getElementById("wfsConfig").style.display = "block";
	    	document.getElementById("retour").style.display = "block";
	    	document.getElementById("listecouchemap").style.display = "none";
		}

		else if (a==13) {

			document.getElementById('reinitialiser').style.visibility = 'hidden';
			document.getElementById('mapid').style.visibility = 'hidden';
			document.getElementById('retour').style.display = 'none'; 
			document.getElementById('wpsfavform').style.display = 'block'; 
			document.getElementById('accueil').style.display = 'none';
			document.getElementById('map').style.display = 'block';
			document.getElementById('wps').style.visibility = 'visible';
		}
		else if (a == 14){
			document.getElementById('wrapper').style.display = 'block';
			document.getElementById('reinitialiser').style.visibility = 'hidden';
			document.getElementById('mapid').style.visibility = 'hidden';   
			document.getElementById('processes').options[0].selected = 'selected';
			document.getElementById('wps').style.display = 'block';
			document.getElementById('wps').style.visibility = 'visible';
			document.getElementById('wrapper').style.visibility = 'visible';
			document.getElementById('describe').style.display = 'block'; 
			document.getElementById('capabilities').style.display = 'block';
			document.getElementById('accueil').style.display = 'none';
			document.getElementById('map').style.display = 'block';
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

    function checker(id1, id2) {

    	
    	
        if(document.getElementById(id1).checked)
        { document.getElementById(id2).checked = false;
        }
        else
        {  document.getElementById(id2).checked = true;
        }
      }
