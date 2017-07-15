var board;
var win = {
    name: "win",
    text: ["Congratulation!", "br", "you beat the game!"],
    img: "../img/trophy.svg"
};
var lose = {
    name: "lose",
    text: ["BOOOM !!", "br", "you've exploded!"],
    img: "../img/skull.svg"
};

/*
------------------------------------------------------------------

                        DOM Modifications

------------------------------------------------------------------
*/

function createCanvas(body, id, width, height) {
    /* Create a canvas and but it in "body" can be any tagnamed element, id, width and height of teh canvas can be configured */
    var canvas = document.createElement("canvas");

    canvas.id = id || "board";
    canvas.width = width || 258;
    canvas.height = height || 258;
    //canvas.oncontextmenu = "javascript:return false;";

    body.appendChild(canvas);

    return document.getElementById(canvas.id);
}

function updateTextNode(id, text) {
    /* Update text node of the defined id with text */
    var node = document.getElementById(id);
    node.textContent = text || "error"; //Firefox
    node.innerText = text || "error"; //IE
}

function addTextNode(parentId, text, id) {
    /* Add a text node under a parentId with a defined id in the HTML */
    var element = document.createElement("span");
    var p = text || "error";
    var node = document.createTextNode(p);
    var parent = document.getElementById(parentId);

    element.appendChild(node);
    element.id = id || "info";
    element.classList.add("info");

    parent.appendChild(element);
    //parent.insertBefore(element, parent.childNodes[0]);
}

function removeChildren(parent) {
    /* Remove all children from the id node */
    var p = document.getElementById(parent) || parent;

    while (p.firstChild) {
        p.removeChild(p.firstChild);
    }
}

function addCustomAlert(type) {
    /* Add a custom alert with a text as the message and type win or lose */
    var text, content = document.getElementById("customAlert-content");

    removeChildren(content);

    for (var i = 0; i < type.text.length; i++) {
        text = type.text[i];
        if (text === "br") {
            content.appendChild(document.createElement(text));
        } else {
            content.appendChild(document.createTextNode(text));
        }
    }
    document.getElementById("alertContainer").style.visibility = "visible";
    document.getElementById("alert-img").src = type.img;

}

function removeCustomAlert() {
    /* Remove the custom alert */
    document.getElementById("alertContainer").style.visibility = "hidden";
}


/*
------------------------------------------------------------------

                        Listeners

------------------------------------------------------------------
*/

function getMousePos(canvas, evt) {
    /* Return the position of the mouse within the canvas */
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top)
    };
}

function addListener(canvas, event) {
    /* Creates the listener to the vent in the canvas */

    canvas.addEventListener(event, function (evt) {
        var pos = getMousePos(canvas, evt);
        evt.preventDefault();
        board.update(pos.x, pos.y, evt.type, canvas);
    });
}

function addExplodeListener(canvas) {
    /* Creates the listener and handler for the explode event in the board */

    canvas.addEventListener("explode", function (evt) {
        var explosion = new Explosion(evt.detail.x, evt.detail.y);
        var exploding = setInterval(function () {
            board.draw(canvas);
            explosion.update(canvas);
        }, 1000 / 15);
        // So we don't have too many running
        setTimeout(function () {
            clearInterval(exploding);
        }, 900);
    }, false);
}

function addCustomAlertListener(canvas) {
    canvas.addEventListener(win.name, function (evt) {
        addCustomAlert(win);
    }, false);

    canvas.addEventListener(lose.name, function (evt) {
        setTimeout(function () {
            addCustomAlert(lose);
        }, 500);

    }, false);

}


/*
------------------------------------------------------------------

                        Game start up

------------------------------------------------------------------
*/

function setup() {
    /* Setup the minesweeper game */
    board = new Board(64);
    //board = new Board(canvas);
    addTextNode("game-info", board.mineNumber, "mines");
}

function draw(canvas) {
    /* Draw the canvas */
    board.draw(canvas);

}

function setTimer(id) {
    /* Set the timer and update the html with the specified id */
    var timer = new Timer();
    timer.start();
    setInterval(function () {
        updateTextNode(id, timer.counter);
    }, 1000);
}

window.onload = function () {
    /* Main of the program, defines what is being done when the page loads */

    var body = document.getElementById("game");
    //var body = document.getElementsByTagName("body")[0];
    var canvas = createCanvas(body); //Used also in Zone.js and Board.js to draw the game
    var ctx = canvas.getContext("2d");

    addListener(canvas, "mousemove");
    addListener(canvas, "click");
    addListener(canvas, "contextmenu");
    addExplodeListener(canvas);
    addCustomAlertListener(canvas);
    setTimer("timer");

    setup(canvas);
    draw(canvas);
};
