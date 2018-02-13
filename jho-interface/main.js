var navigatePanel;
var coverup;
var panels;
var warp_select;
var course_select;
var messageText, stardateText, daysleftText, shieldText, torpedosText, klingonsText, energyText, redText;

var db;

//Google map object, zoom value, max zoom value
var map;
var Zoom = 16;
var maxZoom = 19;
var centerLatLng; //google maps LatLng object for center
var jhoIcon, jhoMarker;

// Lat/Lon for center of operating region near Stata
var centerCoords = {
    lat: 42.360414,
    lng: -71.091113
};

/**
 * Called async from the HTML page - initializes the Google Maps API and all it's markers/icons
 */
function initMap() {

    //center of the Stata area - location for map centering
    centerLatLng = new google.maps.LatLng(centerCoords.lat, centerCoords.lng);

    //set the google map options
    var mapOptions = {
        center: centerLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // mapTypeId: google.maps.MapTypeId.HYBRID,
        // disableDefaultUI: true,
        // draggable: false,
        zoomControl: true,
        scrollwheel: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        maxZoom: maxZoom,
        minZoom: Zoom - 1,
        zoom: Zoom,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT
        }
    };

    //create the google map instance - global variable map
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //click on the map and print the coords to console - debugging purposes
    map.addListener('click', function (e) {
        console.log("coords", e.latLng.toString())
    });

    jhoIcon = {
        url: 'images/jho_icon.png',
        // This marker is 20 pixels wide by 32 pixels high.
        scaledSize: new google.maps.Size(40, 40)
    }

    jhoMarker = new google.maps.Marker({
        position: centerLatLng,
        // animation: google.maps.Animation.DROP,
        draggable: true,
        title: "JHO",
        map: map,
        icon: jhoIcon,
    });


    // The photograph is courtesy of the U.S. Geological Survey.
    // var srcImage = 'images/blue_overlay_1.png';
    // var srcImage2 = 'images/blue_overlay_text_1.png';

    // The custom USGSOverlay object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    // operatingRegionOverlay = new USGSOverlay(bounds, srcImage, null);
    // operatingRegionOverlayText = new USGSOverlay(bounds, srcImage2, map);

    // map.addListener('zoom_changed', function() {
    //     if (map.getZoom() > Zoom) {
    //         removeOverlay();
    //     } else if (map.getZoom() <= Zoom) {
    //         addOverlay();
    //     }
    // });

    // Define a symbol using SVG path notation, with an opacity of 1.
    // var lineSymbol = {
    //     path: 'M 0,-1 0,1',
    //     strokeOpacity: 1,
    //     scale: 2,
    //     strokeColor: blueColor,
    // };

    //google map markers for start and goal placement by the user
    // greenMarker = {
    //     url: 'images/greenMarker.png',
    //     scaledSize: new google.maps.Size(23, 40)
    // };
    // redMarker = {
    //     url: 'images/redMarker.png',
    //     scaledSize: new google.maps.Size(23, 40)
    // };
}

function init() {
    navigatePanel = document.getElementById("navigate_panel");
    coverup = document.getElementById("coverup");
    panels = [];
    panels.push(navigatePanel);

    warp_select = document.getElementById("warp_speed_select");
    course_select = document.getElementById("course_select");
    messageText = document.getElementById("message_text");
    latText = document.getElementById("lat_text");
    lonText = document.getElementById("lon_text");
    rbStatusText = document.getElementById("rb_status_text");
    pTempText = document.getElementById("p_temp_text");
    aTempText = document.getElementById("a_temp_text");
    engineDataText = document.getElementById("engine_data_text");
    redText = document.getElementById("red_text");

    // initCanvas();

    db = new PouchDB('http://128.30.25.154:5984/jho-data');
    console.log(db);
    db.allDocs().then(function (docs) {
        console.log(docs.rows[0]);
        db.get(docs.rows[0].id).then(function (doc) {
            updateInterface(doc)
        });
    });
    db.changes({
        since: 'now',
        live: true,
        include_docs: true
    }).on('change', function (change) {
        // handle change
        console.log('changes!');
        console.log(change);
        updateInterface(change.doc);
        // if (change.id == "game-state") {
        // updateGameState(change.doc.state);
        // }
    }).on('complete', function (info) {
        // changes() was canceled
    }).on('error', function (err) {
        console.log(err);
    });

}

var post_result;

function post(address, obj, success_function) {
    var post_result;
    $.ajax({
        type: "POST",
        method: "POST",
        crossDomain: true,
        url: address,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: success_function
    });
}


var spaceBackground, enterpriseImg, starImg, starbaseImg, klingonImg, planetImg;
var canvas, ctx;
var objectWidth = 100;
var objectHeight = 100;
var quadrantCanvas;

function updateInterface(doc) {
    console.log("updating JHO state");
    messageText.innerHTML = "Status: " + doc.status;
    latText.innerHTML = "MP Lat: " + doc.mp_lat.toString();
    lonText.innerHTML = "MP Lon: " + doc.mp_lon.toString();
    rbStatusText.innerHTML = "Rockblock Status: " + doc.status.toString();
    pTempText.innerHTML = "Payload Temp: " + doc.temp1.toString();
    aTempText.innerHTML = "Avionics Temp: " + doc.temp2.toString();
    engineDataText.innerHTML = "Engine Data: healthy?"
    updatePosition(doc.mp_lat, doc.mp_lon);
}

function updatePosition(lat, lon) {
    var posGoogled = new google.maps.LatLng(lat, lon, false);
    jhoMarker.setPosition(posGoogled);
}

function updateGameState(state) {
    console.log("updating game state");
    console.log(state);
    if (state.message) {
        messageText.innerHTML = state.message;
    }
    stardateText.innerHTML = "Stardate: " + state.star_date.toString();
    daysleftText.innerHTML = "Remaining Days: " + state.remaining_days.toString();
    energyText.innerHTML = "Energy: " + state.energy.toString();
    shieldText.innerHTML = "Shield Energy: " + state.shield_energy.toString();
    torpedosText.innerHTML = "Photon Torpedos: " + state.photon_torpedos.toString();
    klingonsText.innerHTML = "Remaining Klingons: " + state.total_klingons.toString();

    eraseObjects();
    redText.innerHTML = " ";

    updateQuadrant(state.quadX, state.quadY);

    var sectordata = state.current_sector;

    convertToArray(1, sectordata.star_list);
    convertToArray(2, sectordata.starbase_list);
    convertToArray(4, sectordata.planet_list);
    convertToArray(3, sectordata.klingon_list);


    //draw Enterprise above the other objects
    drawObject(0, state.sectX, state.sectY);


    if (!sectordata.klingon_list.includes("NIL")) {
        redText.innerHTML = "CONDITION RED";
    }
}

function convertToArray(id, string) {
    var x, y;
    if (string.includes("NIL")) {
        return null;
    } else {
        var bits = string.split("(");
        for (i in bits) {
            var matches = bits[i].match(/\d+/g);
            if (matches != null) {
                // bits[i].split(")")[0];
                console.log('number!');
                console.log(bits[i].split(")")[0]);
                x = bits[i].split(")")[0].split(" ")[0];
                y = bits[i].split(")")[0].split(" ")[1];
                drawObject(id, x, y);
            }
        }
    }
}

function startGame() {
    console.log("startGame");
    post("http://localhost:8080/start", {}, function (result) {
        console.log("startGame result:");
        try {
            post_result = JSON.parse(result);
        } catch (err) {
            if (err.name == 'SyntaxError') {
                // just a string return from server
                post_result = result
            } else {
                post_result = " ";
            }
        }
        console.log(post_result);
        messageText.innerHTML = post_result.message;
    });
}


function toggleNavigate() {
    navigatePanel.style.display = "block";
    coverup.style.display = "block";
}

function hidePanels() {
    //console.log("hidePanels");
    coverup.style.display = "none";
    for (i in panels) {
        panels[i].style.display = "none";
    }
}

var course_selected;
var speed_selected;

function navigate() {
    course_selected = course_select.value;
    speed_selected = warp_select.value;
    console.log("navigate - course:" + course_selected + " and speed:" + speed_selected);
    post("http://localhost:8080/nav", {
        "course": parseInt(course_selected),
        "speed": parseInt(speed_selected)
    }, function (result) {
        hidePanels();
        console.log("navigate result:");
        if (typeof result == 'string') {
            post_result = JSON.parse(result);
        } else {
            post_result = result;
        }
        messageText.innerHTML = post_result.message;

        console.log(post_result);
    });
}
