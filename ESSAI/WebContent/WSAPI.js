var wmsLayer;
var boundaries;
var fond;

//appel au service WMS
function appelWMS() {
    //récupération des valeurs
    adresse = getAdresse();
    couche = getCouche();
    formatwms = getFormatWMS();

    alert("adresse: " + adresse + "\n" + "couche: " + couche + "\n" + "formatwms: " + formatwms);

    //construction de la couche WMS contenu dans wmsLayer
    wmsLayer = L.tileLayer.wms(adresse, {
        layers: couche,
    })
        .setOpacity(0.8)
    opacitySlider.setOpacityLayer(wmsLayer);
    return wmsLayer;
}

//appel au service WFS
function appelWFS() {
    //mise a jour de l'adresse
    adressewfs = getAdresseWFS();
    couchewfs = getCoucheWFS();
    formatwfs = getFormatWFS();
    alert("adressewfs: " + adressewfs + "\n" + "couchewfs: " + couchewfs + "\n" + "formatwfs: " + formatwfs);

    //construction de l'objet WFS contenu dans boundaries
    boundaries = new L.WFS({
        url: adressewfs,
        typeName: couchewfs,
        //typeNS: 'topp',
        crs: L.CRS.EPSG4326,
        //geometryField: 'the_geom',
        geometryField: 'ogr_geometry',
        style: {
            color: 'blue',
            weight: 2
        }
    }, new L.Format.GeoJSON({ crs: L.CRS.EPSG4326 }))
  .once('load', function () {
      map.fitBounds(boundaries);
  });
    return boundaries;
}