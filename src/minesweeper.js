var body = document.getElementsByTagName("body")[0];

createCanvas = function(body, id, width, height) {
    var canvas = document.createElement('canvas');

    canvas.id = id || "board";
    canvas.width = width || 480;
    canvas.height = height || 320;

    body.appendChild(canvas);

    return document.getElementById(canvas.id);
}

function setup() {
    var canvas = createCanvas(body, "board");

}

window.onload = function() {
   setup();
}
