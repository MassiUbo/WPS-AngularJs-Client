
var myApp = angular.module("angularApp", [])           //declaration du module


myApp.controller("myController", function ($scope) {   // controller 

        //$scope.txtname = ""; 
        $scope.visible;
        $scope.txtname = "";
        
        // pour affichage process
        $scope.affichage = function () {
                $scope.visible = true;
                return visible;
        }

        $scope.items = [{
                id: 1,
                label: 'http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService',
        },
        {
                id: 2,
                label: 'https://geobretagne.fr/geoserver/ows?',

        },
        {
                id: 3,
                label: 'http://zoo-project.org/zoo',

        }

        ];

      //  $scope.selected = null;
  //$scope.select = null;
  

});

// fonction de configuration 
function config() {
        document.getElementById('wpsexe').style.display = 'block';
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
                        if ($('#wpsmassi').length > 0) {
                                //complex data
                                //	var d = document.wpsmassi.wfsfav;

                                if (inputValue[selectedIndex - 1][i].indexOf("^") >= 0) {

                                        var index = inputValue[selectedIndex - 1][i].indexOf('^');
                                        strOut = inputValue[selectedIndex - 1][i].substr(index + 1);
                                        strOutNS = inputValue[selectedIndex - 1][i].substr(0, index);
                                }

                                adresseWps = adrfavwps[selectedIndex - 1];
                                identifier = idfavwps[selectedIndex - 1];
                        }
                        
                        i = i + 1;
                }
        }

}

function checker(id1, id2) {
        if (document.getElementById(id1).checked) {
                document.getElementById(id2).checked = false;
        }
        else {
                document.getElementById(id2).checked = true;
        }
}

