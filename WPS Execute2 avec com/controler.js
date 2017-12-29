
function initConfig(a) {
	if (a == 11) {
		//document.getElementById("processDescription").style.display = "none";
		document.getElementById('wpsexe').style.display = 'block';
		//document.getElementById('divName').style.visibility='hidden';
		//document.getElementById("divSlider").style.display = "block";
		document.getElementById("divSlider").innerHTML = "<br> Inputs: <br> <br>";
		var selectedIndex = $("select[id='wpsfav'] option:selected").index();

		var inputnbr = 0;

		if (selectedIndex != 0) {
			for (var indexInput in processDescription.processOffering.process.inputs) {
				var n = 0;
				while ((n < processDescription.processOffering.process.inputs[indexInput].maxOccurs) && document.getElementById("notused" + indexInput + n).checked) {

					var ok = document.getElementById("myInputs[" + indexInput + n + "]").value;
					inputnbr = inputnbr + 1;
					n = n + 1;
				}
			}

			var i = 0;
			var listeInputs = "";

			while (i < nbinputfavwps[selectedIndex - 1]) {
				if ($('#wfsfavform2').length > 0) {
					//complex data
					var d = document.wfsfavform2.wfsfav;

					if (inputValue[selectedIndex - 1][i].indexOf("^") >= 0) {

						var index = inputValue[selectedIndex - 1][i].indexOf('^');
						strOut = inputValue[selectedIndex - 1][i].substr(index + 1);
						strOutNS = inputValue[selectedIndex - 1][i].substr(0, index);
						// alert("1" +strOut);
						//  alert("2" +strOutNS);
						adressewfs = strOutNS;
					}

					adresseWps = adrfavwps[selectedIndex - 1];
					identifier = idfavwps[selectedIndex - 1];

					if ($('#1' + i + '0').length > 0) {
						//alert("9");
						if (isFixed[selectedIndex - 1][i] == true) {
							document.getElementById("divSlider").innerHTML += idInputs[selectedIndex - 1][i] + "<br>" + inputValue[selectedIndex - 1][i] + "<br>";
						}

						//if user
						else {
							var selectedIndex = $("select[id='wpsfav'] option:selected").index();
							document.getElementById("divSlider").innerHTML += idInputs[selectedIndex - 1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='" + inputValue[selectedIndex - 1][i] + "'>" + inputValue[selectedIndex - 1][i] + "</textarea><br>";

							if ($('#wfsfav').length > 0) {
								document.getElementById("divSlider").innerHTML += '<form name="wfsfavform2" id="wfsfavform2" style="display:block"> <SELECT NAME="wfsf' + i + '" id="wfsf' + i + '" onChange="wfsFav3(' + i + ');">		<OPTION VALUE="">Choisir un favori WFS<OPTION VALUE="https://geobretagne.fr/geoserver/ows?^dreal_b:stationnement_littoral">https://geobretagne.fr/geoserver//ows?^dreal_b:stationnement_littoral<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:tasmania_state_boundaries">http://geoserver.ics.perm.ru/geoserver//ows?^topp:tasmania_state_boundaries<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:tasmania_roads">http://geoserver.ics.perm.ru/geoserver//ows?^topp:tasmania_roads<OPTION VALUE="http://geoserver.ics.perm.ru/geoserver/ows?^topp:states">http://geoserver.ics.perm.ru/geoserver//ows?^topp:states</SELECT>  </form>';
							}
						}

						//si favori wps pas selectionné
						//alert("8");
						listeInputs += idInputs[selectedIndex - 1][i] + "=" + inputValue[selectedIndex - 1][i] + ";";
						if (!(ok.indexOf(adressewfs) >= 0)) {
							//document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + inputValue[selectedIndex][i] + "<br>";
						}
					}

					else {
						//si pas favori wps selectionné
						//alert("4");

						if ($('#1' + i + '0').length > 0) {
							alert(isFixed[selectedIndex - 1][i]);
							if (isFixed[selectedIndex - 1][i] == true) {

								//alert("1");
								document.getElementById("divSlider").innerHTML += idInputs[selectedIndex - 1][i] + "<br>" + inputValue[selectedIndex - 1][i] + "<br>";
								if (!(ok.indexOf(adressewfs) >= 0)) {
									if ((d.value).length > 0) {
										//	alert("10");				    					
										//document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + inputValue[selectedIndex-1][i] + "<br>";
									}
									else {
										// alert("11");
										//document.getElementById("divSlider").innerHTML += idInputs[selectedIndex-1][i] + "<br>" + inputValue[selectedIndex-1][i] + "<br>";
									}
								}
								else {
									//	alert("2");
									document.getElementById("divSlider").innerHTML += idInputs[selectedIndex - 1][indexInput] + "<br>" + ok + "<br>";

								}
							}
							//if user
							else {

								if ((ok.indexOf(adressewfs) >= 0)) {
									document.getElementById("divSlider").innerHTML += idInputs[selectedIndex - 1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='" + inputValue[selectedIndex - 1][i] + "'>" + inputValue[selectedIndex - 1][i] + "</textarea><br>";
								}
								else {
									document.getElementById("divSlider").innerHTML += idInputs[selectedIndex - 1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='" + inputValue[selectedIndex - 1][i] + "'>" + inputValue[selectedIndex - 1][i] + "</textarea><br>";

								}
							}
						}
					}
				}
				else {

					if ($('#1' + i + '0').length > 0) {

						if (isFixed[selectedIndex - 1][i] == false) {

							//alert("2");
							listeInputs += idInputs[selectedIndex - 1][i] + "=" + inputValue[selectedIndex - 1][i] + ";";
							document.getElementById("divSlider").innerHTML += idInputs[selectedIndex - 1][i] + "<br>" + "<textarea type='text' name='text" + i + "'  id='text" + i + "'  style='width:250px;height:15px;' value='" + inputValue[selectedIndex][i] + "'>" + inputValue[selectedIndex][i] + "</textarea><br>";

						}
						else {
							//alert("5");
							listeInputs += idInputs[selectedIndex][i] + "=" + inputValue[selectedIndex][i] + ";";
							document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + inputValue[selectedIndex][i] + "<br>";
						}
					}
					//if user
					else {

						if ($('#1' + i + '0').length > 0) {
							//alert("6");
							listeInputs += idInputs[selectedIndex][i] + "=" + inputValue[selectedIndex][i] + ";";
							document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + "<textarea type='text' name='myInputs[" + i + "]'  id='myInputs[" + i + "]'  style='width:250px;height:15px;' value='" + inputValue[selectedIndex][i] + "'></textarea><br>";
						}
						else {
							//alert("7");
							listeInputs += idInputs[selectedIndex][i] + "=" + inputValue[selectedIndex][i] + ";";
							document.getElementById("divSlider").innerHTML += idInputs[selectedIndex][i] + "<br>" + inputValue[selectedIndex][i] + "<br>";

						}
					}
				}
				i = i + 1;
			}
		}
	}
}
//ff
/*function initMap(a, c, f, a2, c2, f2) {
	setAdresse(a);
	setCouche(c);
	setFormatWMS(f);
	setAdresseWFS(a2);
	setCoucheWFS(c2);
	setFormatWFS(f2);
}*/

function checker(id1, id2) {
	if (document.getElementById(id1).checked) {
		document.getElementById(id2).checked = false;
	}
	else {
		document.getElementById(id2).checked = true;
	}
}
