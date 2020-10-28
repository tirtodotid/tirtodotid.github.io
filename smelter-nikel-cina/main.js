//RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////////
var container = document.querySelector('.container')          //
var w = window.screen.width,                                  //
    h = window.screen.height                                  //
var gw, gh;                                                   //
var font, space, mult, left, top;
var mapxup, mapyup, mapxdn, mapydn, zoom, weight,
    dash, exup, exdn, exstat, x, y;
                                                              //
//console.log( 'initial size','width' ,w, 'height', h)          //
                                                              //
                                                              //
                                                              //
if ( w < h ) { // MOBILE                                      //
    zoom = 4
    x = 117.5
    y = -8.6145
    weight = 1
    dash = 1
    exup = '370px'
    exdn = '95px' 
    mapxup = -15.5
    container.style.height = '700px'                          //
    container.style.width = '367px'                           //
                                                              //
} else if ( w > h ) { // DESKTOP
    zoom = 5
    x = 117.5
    y = -3.6145
    weight = 1.5   
    dash = 1  
    exup = '382px'
    exdn = '107px'   
    mapxup = -10.9                                            //
    container.style.height = '850px'                          //
    container.style.width = '560px'                           //
                                                              //
};                                                            //
//END RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////

var color = chroma
        .scale(["#4f7aa8", "#f28e29", "#e05759","#76b7b2","#59a14e"])
        .domain([1,2,3,4,5])

var geoJsonFeature = {
    "type": "FeatureCollection",
    "name": "smelter-nikel",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 5, "nama": "PT Tsingshan Steel Indonesia", "holding": "IMIP\/Tsingshan Holding Group", "provinsi": "Sulawesi Tengah" }, "geometry": { "type": "Point", "coordinates": [ 122.167796621804385, -2.835740657528325 ] } },
        { "type": "Feature", "properties": { "id": 2, "nama": "PT Sulawesi Mining Investment", "holding": "IMIP\/Tsingshan Holding Group", "provinsi": "Sulawesi Tengah" }, "geometry": { "type": "Point", "coordinates": [ 122.162067639034163, -2.825606526233168 ] } },
        { "type": "Feature", "properties": { "id": 3, "nama": "PT COR Industri Indonesia", "holding": "PT Macrolink Nickel Development & PT Central Omega Resources Tbk", "provinsi": "Sulawesi Tengah" }, "geometry": { "type": "Point", "coordinates": [ 121.321391185404465, -1.939942520619062 ] } },
        { "type": "Feature", "properties": { "id": 4, "nama": "PT Guang Ching Nickel & Stainless Steel", "holding": "IMIP\/Tsingshan Holding Group", "provinsi": "Sulawesi Tengah" }, "geometry": { "type": "Point", "coordinates": [ 121.842694105560341, -2.877965245314244 ] } },
        { "type": "Feature", "properties": { "id": 1, "nama": "PT Indonesia Tsingshan Stainless Steel", "holding": "IMIP\/Tsingshan Holding Group", "provinsi": "Sulawesi Tengah" }, "geometry": { "type": "Point", "coordinates": [ 122.168003693471022, -2.818919329902211 ] } },
        { "type": "Feature", "properties": { "id": 6, "nama": "PT Hengjaya Nickel Industry", "holding": "Hengjaya Holding Private Ltd -  Singapura", "provinsi": "Sulawesi Tengah" }, "geometry": { "type": "Point", "coordinates": [ 122.164819966600135, -2.8480591949869 ] } },
        { "type": "Feature", "properties": { "id": 7, "nama": "PT Ranger Nickel Industry", "holding": "Nickel Mines Ltd & Ranger Investment Private Ltd", "provinsi": "Sulawesi Tengah" }, "geometry": { "type": "Point", "coordinates": [ 122.156640635777421, -2.82279291030094 ] } },
        { "type": "Feature", "properties": { "id": 8, "nama": "PT Huadi Nickel Alloy Indonesia", "holding": "PT Duta Nickel Sulawesi & Shanghai Huadi, Co Ltd", "provinsi": "Sulawesi Selatan" }, "geometry": { "type": "Point", "coordinates": [ 120.05417298295373, -5.57307972196026 ] } },
        { "type": "Feature", "properties": { "id": 9, "nama": "PT Century Metalindo", "holding": "Poly Century (Asia) Ltd - Cina", "provinsi": "Banten" }, "geometry": { "type": "Point", "coordinates": [ 106.03876882644289, -6.008662901286691 ] } },
        { "type": "Feature", "properties": { "id": 10, "nama": "PT Bintang Timur Steel", "holding": "-", "provinsi": "Banten" }, "geometry": { "type": "Point", "coordinates": [ 106.49743688150663, -6.247253127613743 ] } },
        { "type": "Feature", "properties": { "id": 11, "nama": "PT Heng Tai Yuan", "holding": "-", "provinsi": "Banten" }, "geometry": { "type": "Point", "coordinates": [ 106.019230751919778, -6.000631414847865 ] } },
        { "type": "Feature", "properties": { "id": 12, "nama": "PT Indoferro", "holding": "PT Growth Java Industry (baru ganti nama)", "provinsi": "Banten" }, "geometry": { "type": "Point", "coordinates": [ 105.955314630891735, -6.029341717010088 ] } },
        { "type": "Feature", "properties": { "id": 13, "nama": "PT Fajar Bhakti Lintas Nusantara", "holding": "Penanaman Modal Dalam Negeri (PMDN)", "provinsi": "Maluku Utara" }, "geometry": { "type": "Point", "coordinates": [ 129.433203702878473, -0.076577667831742 ] } },
        { "type": "Feature", "properties": { "id": 14, "nama": "PT Megah Surya Pertiwi", "holding": "Harita Group & Xinxing Ductile Iron Pipes Co Ltd", "provinsi": "Maluku Utara" }, "geometry": { "type": "Point", "coordinates": [ 127.422779405769091, -1.529314414763568 ] } },
        { "type": "Feature", "properties": { "id": 15, "nama": "PT Weda Bay Nickel", "holding": "IMIP\/Tsingshan Holding Group", "provinsi": "Maluku Utara" }, "geometry": { "type": "Point", "coordinates": [ 127.983684782123476, 0.478610392743357 ] } },
        { "type": "Feature", "properties": { "id": 16, "nama": "PT Dragon Virtue Nickel Industry", "holding": "Jaingsu Delong Nickel Industry Co Ltd, Sinoe Virtue International Development PTE Ltd, & Xiangshui Kangyang Trade Co Ltd", "provinsi": "Sulawesi Tenggara" }, "geometry": { "type": "Point", "coordinates": [ 122.412473365614147, -3.895305411907359 ] } },
        { "type": "Feature", "properties": { "id": 17, "nama": "PT Bintang Smelter Indonesia", "holding": "PT Ifishdeco Tbk & Fujian Pan-Chinese Mining Co Ltd", "provinsi": "Sulawesi Tenggara" }, "geometry": { "type": "Point", "coordinates": [ 122.199327597002295, -4.404259486249236 ] } },
        { "type": "Feature", "properties": { "id": 18, "nama": "PT Cahaya Modern Metal Industri", "holding": "-", "provinsi": "Sulawesi Tenggara" }, "geometry": { "type": "Point", "coordinates": [ 122.085300132706053, -4.021593202346605 ] } }
    ]
    }

var map = L // buat peta
    .map('map', { 
        zoomControl: true,      // mematikan fitur zoom "+" & "-"
        boxZoom: false,          // mematikan fitur box zoom
        doubleClickZoom: true,  // mematikan fitur zoom dengan double click
        dragging: true,         // mematikan fitur drag
        scrollWheelZoom: false   // mematikan fitur zoom dengan scroll
    })
    .setView([y, x], zoom); // koordinat (y, x) awal peta, zoom level

var basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { // OPEN STREET MAP
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geojsonMarkerOptions = {
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7
};

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.nama) {
        layer.bindPopup("<strong>"+feature.properties.nama+"</strong></br>"+feature.properties.provinsi+"</br><em>"+feature.properties.holding+"</em></br>") ;
    }
}

L.geoJSON(geoJsonFeature, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    style: function(feature) {
        switch (feature.properties.provinsi) {
            case 'Sulawesi Tengah': return {fillColor: "#4f7aa8" };
            case 'Sulawesi Selatan':   return {fillColor: "#f28e29"};
            case 'Sulawesi Tenggara': return {fillColor: "#e05759"};
            case 'Banten':   return {fillColor: "#76b7b2"};
            case 'Maluku Utara': return {fillColor: "#59a14e"};
        }}
}).addTo(map);




//COPYRIGHT 2020 LOUIS LUGAS WICAKSONO // TIRTO.ID