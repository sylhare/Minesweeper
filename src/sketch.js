var body = document.getElementsByTagName("body")[0];
var canvas = createCanvas(body, "board");
var ctx = canvas.getContext("2d");
var board;

function setup() {
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
    board.show();
}

function createCanvas(body, id, width, height) {
    var canvas = document.createElement('canvas');

    canvas.id = id || "board";
    canvas.width = width || 258;
    canvas.height = height || 258;
    canvas.oncontextmenu = "javascript:return false;";

    body.appendChild(canvas);

    return document.getElementById(canvas.id);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top)
    };
}


window.onload = function () {
    setup();
    draw();
}
