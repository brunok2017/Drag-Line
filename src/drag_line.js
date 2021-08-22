var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var startX, startY, mouseX, mouseY;
var isDown = false;

var lines = [];

var imageOpacity = 0.33;

var img = new Image();
img.crossOrigin = "anonymous";
img.onload = start;
img.src = "https://m.media-amazon.com/images/I/11cX3GrVdVL._AC_.jpg";

function start() {

    canvas.width = canvas.width = img.width;
    canvas.height = img.height;
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });
    $("#canvas").mouseout(function (e) {
        handleMouseUp(e);
    });

    // redraw the image
    drawTheImage(img, imageOpacity);

}

function drawLines(toX, toY) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // redraw the image
    drawTheImage(img, imageOpacity);

    // redraw all previous lines
    for (var i = 0; i < lines.length; i++) {
        drawLine(lines[i]);
    }

    // draw the current line
    drawLine({
        x1: startX,
        y1: startY,
        x2: mouseX,
        y2: mouseY
    });
}

function drawTheImage(img, opacity) {
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, 0, 0);
    ctx.globalAlpha = 1.00;
}

function drawLine(line) {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
}




function handleMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousedown stuff here
    startX = mouseX;
    startY = mouseY;
    isDown = true;
}

function handleMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();

    // Put your mouseup stuff here
    isDown = false;
    lines.push({
        x1: startX,
        y1: startY,
        x2: mouseX,
        y2: mouseY
    });
}

function handleMouseMove(e) {
    if (!isDown) {
        return;
    }
    e.stopPropagation();
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    drawLines(mouseX, mouseY);

}


$("#save").click(function () {
    var html = "<p>Right-click on image below and Save-Picture-As</p>";
    html += "<img src='" + canvas.toDataURL() + "' alt='from canvas'/>";
    var tab = window.open();
    tab.document.write(html);
});