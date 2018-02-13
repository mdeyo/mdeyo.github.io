var navigatePanel;
var coverup;
var panels;
var warp_select;
var course_select;
var messageText, stardateText, daysleftText, shieldText, torpedosText, klingonsText, energyText, redText;


var db;

function init() {
    navigatePanel = document.getElementById("navigate_panel");
    coverup = document.getElementById("coverup");
    panels = [];
    panels.push(navigatePanel);

    warp_select = document.getElementById("warp_speed_select");
    course_select = document.getElementById("course_select");
    messageText = document.getElementById("message_text");
    stardateText = document.getElementById("stardate_text");
    daysleftText = document.getElementById("daysleft_text");
    shieldText = document.getElementById("shield_text");
    torpedosText = document.getElementById("torpedos_text");
    klingonsText = document.getElementById("klingons_text");
    energyText = document.getElementById("energy_text");
    redText = document.getElementById("red_text");

    initCanvas();

    db = new PouchDB('http://128.30.25.154:5984/star-trek-game-1');
    console.log(db);
    db.get('game-state').then(function(doc) {
        console.log(doc);
        updateGameState(doc.state);
    });
    db.changes({
        since: 'now',
        live: true,
        include_docs: true
    }).on('change', function(change) {
        // handle change
        console.log('changes!');
        console.log(change);
        if (change.id == "game-state") {
            updateGameState(change.doc.state);
        }
    }).on('complete', function(info) {
        // changes() was canceled
    }).on('error', function(err) {
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

function initCanvas() {
    quadrantCanvas = document.getElementById("quadrantCanvas");
    qctx = quadrantCanvas.getContext("2d");

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    starImg = new Image();
    starImg.src = "images/sun.png";
    starbaseImg = new Image();
    starbaseImg.src = "images/starbase1.png";
    klingonImg = new Image();
    klingonImg.src = "images/klingon.png";
    enterpriseImg = new Image();
    enterpriseImg.src = "images/enterprise2.png";
    planetImg = new Image();
    planetImg.src = "images/planet1.png";

    // Create grid on canvas
    for (step = 1; step < 10; step++) {
        ctx.moveTo(step * 100, 100);
        ctx.lineTo(step * 100, 900);
        ctx.moveTo(100, step * 100);
        ctx.lineTo(900, step * 100);
    }

    // Create quadrant map on canvas
    for (step = 1; step < 10; step++) {
        qctx.moveTo(step * 20, 20);
        qctx.lineTo(step * 20, 180);
        qctx.moveTo(20, step * 20);
        qctx.lineTo(180, step * 20);
    }
    // qctx.fillStyle = "#3889cb";
    // qctx.fillRect(20, 20, 20, 20);

    // grey color with opacity 0.5
    qctx.strokeStyle = 'black';
    qctx.stroke();

    // grey color with opacity 0.5
    ctx.strokeStyle = 'rgba(200,200,200,0.5)';
    ctx.stroke();

    starImg.onload = function() {
        ctx.drawImage(starImg, 800, 100, objectWidth, objectHeight);
        ctx.drawImage(starImg, 200, 700, objectWidth, objectHeight);
    }
    starbaseImg.onload = function() {
        ctx.drawImage(starbaseImg, 200, 400, objectWidth - 10, objectHeight - 10);
    }
    klingonImg.onload = function() {
        ctx.drawImage(klingonImg, 300, 100, objectWidth, objectHeight);
    }
    enterpriseImg.onload = function() {
        ctx.drawImage(enterpriseImg, 400, 100, objectWidth, objectHeight);
    }
}

function eraseObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // recreate grid on canvas
    ctx.stroke();
}

function updateQuadrant(i, j) {
    qctx.clearRect(0, 0, quadrantCanvas.width, quadrantCanvas.height);
    qctx.fillStyle = "#3889cb";
    qctx.fillRect(20 * i + 20, 20 * j + 20, 20, 20);
    // recreate grid on canvas
    qctx.stroke();
}

function drawObject(id, x, y) {
    var x_pos = 100 + x * 100;
    var y_pos = 100 + y * 100;

    switch (id) {
        case 0: // Enterprise
            ctx.drawImage(enterpriseImg, x_pos, y_pos, objectWidth, objectHeight);
            break;
        case 1: // Star
            ctx.drawImage(starImg, x_pos, y_pos, objectWidth, objectHeight);
            break;
        case 2: // Starbase
            ctx.drawImage(starbaseImg, x_pos, y_pos, objectWidth, objectHeight);
            break;
        case 3: // Klingon ship
            ctx.drawImage(klingonImg, x_pos, y_pos, objectWidth, objectHeight);
            break;
        case 4: // Planet
            ctx.drawImage(planetImg, x_pos, y_pos, objectWidth, objectHeight);
            break;
    }
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
    post("http://localhost:8080/start", {}, function(result) {
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
    }, function(result) {
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
