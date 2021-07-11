//RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////////
var container = document.querySelector('.container')          //
var w = window.screen.width,                                  //
    h = window.screen.height                                  //
var gw, gh;                                                   //
var font, space, mult, left, top;
var mapxup, mapyup, mapxdn, mapydn, zoom, weight,
    dash, exup, exdn, exstat;
var narasi = document.querySelector('.page');
var longcontainer = document.querySelector('.long-container');

var prev = document.querySelector('#prev')
var next = document.querySelector('#next')
var lat3, long3, zoom3;

var detail = document.querySelector('.detail-container')
var close = document.querySelector('.close')

var content = document.querySelector('.content')

var page = 1;

longcontainer.style.left = '0px';
                                                              //
//console.log( 'initial size','width' ,w, 'height', h)          //
                                                              //
                                                              //
                                                              //
if ( w < h ) { // MOBILE                                      //
    zoom = 3
    lat3 = 0.87
    lng3 = 128.27
    zoom3 = 9
    weight = 1
    dash = 1
    exup = '370px'
    exdn = '95px' 
    mapxup = -15.5
    container.style.height = '600px'                          //
    container.style.width = '367px'
    slideleft = 367                         //

                                                              //
} else if ( w > h ) { // DESKTOP
    zoom = 4
    lat3 = 0.85
    lng3 = 128.05
    zoom3 = 10
    weight = 1.5   
    dash = 1  
    exup = '382px'
    exdn = '107px'   
    mapxup = -10.9                                            //
    container.style.height = '600px'                          //
    container.style.width = '560px'
    slideleft = 560                           //

                                                              //
};                                                            //
//END RESPONSIVE TIRTO MOBILE-DESKTOP //////////////////////////

detail.style.display = 'none';

close.addEventListener('click', ()=> {
    detail.style.display = 'none';
    layer.resetStyle();
})

function prevNone() {
    prev.style.opacity = 0;
    prev.style.pointerEvents = 'none';
}

function prevPop() {
    prev.style.opacity = 1;
    prev.style.pointerEvents = 'auto';
}

function nextNone() {
    next.style.opacity = 0;
    next.style.pointerEvents = 'none';
}

function nextPop() {
    next.style.opacity = 1;
    next.style.pointerEvents = 'auto';
}

function nextClick() {
    if (page == 1) {
        longleft = parseInt(longcontainer.style.left)
        longcontainer.style.left = longleft - slideleft +'px'
        mapPage1();
        page++;
        prevPop();
    } else if (page == 2) {
        longleft = parseInt(longcontainer.style.left)
        longcontainer.style.left = longleft - slideleft +'px'
        mapPage2();
        page++;
        nextNone();
    }
}

function prevClick() {
    if (page == 3) {
        longleft = parseInt(longcontainer.style.left)
        longcontainer.style.left = longleft + slideleft +'px'
        mapPage1();
        page--;
        nextPop();
    } else if (page == 2) {
        longleft = parseInt(longcontainer.style.left)
        longcontainer.style.left = longleft + slideleft +'px'
        mapPage0();
        page--;
        prevNone();
    }
}

next.addEventListener('click', ()=> {
    nextClick()
})

prev.addEventListener('click', ()=> {
    prevClick()
})

prevNone();

var map = document.querySelector('#map')

var select1 = document.querySelector('#select-1'),
    select2 = document.querySelector('#select-2'),
    select3 = document.querySelector('#select-3'),
    select4 = document.querySelector('#select-4'),
    calc = document.querySelector('.startsearch')

var kotatext = document.querySelector('.kota'),
    statustext = document.querySelector('.status'),
    upahtext = document.querySelector('#numumk'),
    biayatext = document.querySelector('#numbiaya'),
    selisihtext = document.querySelector('#numselisih')

var layerGroup = new L.LayerGroup();

function mapPage0() {
    map.setView([-3, 118], zoom, { // koordinat baru, zoom, pan option
        animate: true,
        pan: {
            duration: 1
        },
        easeLinearity: 0.1
    }) //end set setView   
    circle.setRadius(200000)
    circle.setLatLng([0.9, 128])
    circle.setPopupContent('Pulau Halmahera')
     
}

function mapPage1() {
    map.setView([0, 128], 7, { // koordinat baru, zoom, pan option
        animate: true,
        pan: {
            duration: 1
        },
        easeLinearity: 0.1
    }) //end set setView  
    circle.setPopupContent('Halmahera Timur').openPopup()
    circle.setRadius(95000)
    circle.setLatLng([0.9, 128.3])
    circle.setStyle({
        opacity: 1,
        fillOpacity: 0.1
    }) 
}

function mapPage2() {
    map.setView([0.87, 128.27], 9, { // koordinat baru, zoom, pan option
        animate: true,
        pan: {
            duration: 1
        },
        easeLinearity: 0.1
    }) //end set setView    
    circle.setStyle({
        opacity: 0,
        fillOpacity: 0
    })
    circle.closePopup();
}

var map = L // buat peta
    .map('map', { 
        zoomControl: true,      // mematikan fitur zoom "+" & "-"
        boxZoom: false,          // mematikan fitur box zoom
        doubleClickZoom: false,  // mematikan fitur zoom dengan double click
        dragging: true,         // mematikan fitur drag
        scrollWheelZoom: false   // mematikan fitur zoom dengan scroll
    })
    .setView([-3, 118], zoom); // koordinat (y, x) awal peta, zoom level

var circle = L.circle([0.9, 128], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.1,
    radius: 200000
}).addTo(map);

var popup = circle.bindPopup('Pulau Halmahera').openPopup()

var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // OPEN STREET MAP
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function detailFeature(e, props) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'red',
        dashArray: '',
        fillOpacity: 0.5
    });

    detail.style.display='flex';

    content.innerHTML = "<h2>" + layer.feature.properties.Perusahaan + "</h2>"
        + "<p><b>Izin Usaha</b> : " + layer.feature.properties.izin + "<br>"
        + "<b>Luas Area</b> : " + layer.feature.properties.luas + "</p>"
        + "<p>" + layer.feature.properties.keterangan + "</p>"
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'red',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight() {
    layer.resetStyle();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: detailFeature
    });
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        fillOpacity: 0.2
    };
}

var layer = L.geoJson(nikelData, {style:style,onEachFeature:onEachFeature}).addTo(map); // add chloropleth to map


//COPYRIGHT 2020 LOUIS LUGAS WICAKSONO
