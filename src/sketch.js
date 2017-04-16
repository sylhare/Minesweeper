var body = document.getElementById("game");
//var body = document.getElementsByTagName("body")[0];
var canvas = createCanvas(body); //Used also in Zone.js and Board.js to draw the game
var ctx = canvas.getContext("2d");
var board;

function setup() {
    /* Setup the minesweeper game */
    board = new Board(64);
    //board = new Board(canvas);

    canvas.addEventListener('mousemove', function (evt) {
        var pos = getMousePos(canvas, evt);
        board.update(pos.x, pos.y, evt.type);
    });
    canvas.addEventListener('click', function (evt) {
        var pos = getMousePos(canvas, evt);
        board.update(pos.x, pos.y, evt.type);

    });
    canvas.addEventListener('contextmenu', function (evt) {
        var pos = getMousePos(canvas, evt);
        evt.preventDefault();
        board.update(pos.x, pos.y, evt.type);
    });

    setInterval(draw, 1000);

}

function draw() {
    /* Draw the canvas */
    board.show();
}

function createCanvas(body, id, width, height) {
    /* Create a canvas and but it in "body" can be any tagnamed element, id, width and height of teh canvas can be configured */
    var canvas = document.createElement('canvas');

    canvas.id = id || "board";
    canvas.width = width || 258;
    canvas.height = height || 258;
    canvas.oncontextmenu = "javascript:return false;";

    body.appendChild(canvas);

    return document.getElementById(canvas.id);
}

function addText(parentId, stuff, id) {
    var element = document.createElement("span");
    var s = stuff || "error";
    var node = document.createTextNode(s);
    var parent = document.getElementById(parentId);
    
    element.appendChild(node);
    element.id = id || "info";
    
    parent.appendChild(element);
    //parent.insertBefore(element, parent.childNodes[0]);
    

}

function getMousePos(canvas, evt) {
    /* Return the position of the mouse within the canvas */
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top)
    };
}


window.onload = function () {
    setup();
    addText("game_info", board.mineNumber);
    draw();
}
