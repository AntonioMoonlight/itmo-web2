const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const w2 = width / 2;
const h2 = height / 2;
const scale = 25;

function drawGraph() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(0.5, 0.5);
    ctx.strokeStyle = "#eee";
    ctx.beginPath();
    for (let i = 0; i <= width; i += scale) {
        ctx.moveTo(i, 0); ctx.lineTo(i, height);
        ctx.moveTo(0, i); ctx.lineTo(width, i);
    }
    ctx.stroke();

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h2); ctx.lineTo(width, h2);
    ctx.moveTo(w2, 0); ctx.lineTo(w2, height);
    ctx.stroke();
    ctx.restore();

    let rInput = document.getElementById("r-text").value.replace(',', '.');
    let r = parseFloat(rInput);
    
    if (!isNaN(r) && r >= 2 && r <= 5) {
        let rPx = r * scale;
        let rHalfPx = (r / 2) * scale;

        ctx.fillStyle = "rgba(0, 123, 255, 0.5)";

        // 1Q
        ctx.fillRect(w2, h2 - rHalfPx, rPx, rHalfPx);
        // 2Q
        ctx.beginPath();
        ctx.moveTo(w2, h2);
        ctx.lineTo(w2 - rHalfPx, h2);
        ctx.lineTo(w2, h2 - rPx);
        ctx.fill();
        // 3Q
        ctx.beginPath();
        ctx.moveTo(w2, h2);
        ctx.arc(w2, h2, rHalfPx, 0.5 * Math.PI, 1.0 * Math.PI);
        ctx.fill();

        // labels
        ctx.fillStyle = "#000";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // x axis
        ctx.fillText("R", w2 + rPx, h2 - 10);
        ctx.fillText("R/2", w2 + rHalfPx, h2 - 10);
        ctx.fillText("-R", w2 - rPx, h2 - 10);
        ctx.fillText("-R/2", w2 - rHalfPx, h2 - 10);

        // y axis
        ctx.textAlign = "left";
        ctx.fillText("R", w2 + 5, h2 - rPx);
        ctx.fillText("R/2", w2 + 5, h2 - rHalfPx);
        ctx.fillText("-R", w2 + 5, h2 + rPx);
        ctx.fillText("-R/2", w2 + 5, h2 + rHalfPx);
    }

    // axis labels
    ctx.fillStyle = "#000";
    ctx.textAlign = "right";
    ctx.fillText("x", width - 5, h2 - 5);
    ctx.textAlign = "center";
    ctx.fillText("y", w2 + 10, 5);

    if (typeof existingPoints !== 'undefined') {
        existingPoints.forEach(pt => drawPoint(pt.x, pt.y, pt.result));
    }
}

function drawPoint(x, y, isHit) {
    let px = w2 + x * scale;
    let py = h2 - y * scale;
    
    ctx.fillStyle = isHit ? "green" : "red";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.stroke();
}

function validateForm() {
    let y = document.getElementById("y-text").value.replace(',', '.');
    let r = document.getElementById("r-text").value.replace(',', '.');
    let yErr = document.getElementById("y-error");
    let rErr = document.getElementById("r-error");
    let valid = true;

    yErr.textContent = ""; rErr.textContent = "";

    if (isNaN(y) || y === "" || y < -5 || y > 5) {
        yErr.textContent = "Y должен быть от -5 до 5"; valid = false;
    }
    if (isNaN(r) || r === "" || r < 2 || r > 5) {
        rErr.textContent = "R должен быть от 2 до 5"; valid = false;
    }
    return valid;
}

document.getElementById("r-text").oninput = function() {
    drawGraph();
};

canvas.onclick = function(event) {
    let rInput = document.getElementById("r-text").value.replace(',', '.');
    let r = parseFloat(rInput);

    if (isNaN(r) || r < 2 || r > 5) {
        alert("Пожалуйста, введите корректный R (2...5) для проверки точки.");
        return;
    }

    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;


    let xMath = (clickX - w2) / scale;
    let yMath = (h2 - clickY) / scale;

    let form = document.createElement("form");
    form.method = "POST";
    form.action = "controller";

    let inputX = document.createElement("input");
    inputX.type = "hidden"; inputX.name = "x"; inputX.value = xMath.toFixed(2);
    
    let inputY = document.createElement("input");
    inputY.type = "hidden"; inputY.name = "y"; inputY.value = yMath.toFixed(2);

    let inputR = document.createElement("input");
    inputR.type = "hidden"; inputR.name = "r"; inputR.value = r;

    form.appendChild(inputX);
    form.appendChild(inputY);
    form.appendChild(inputR);
    document.body.appendChild(form);
    
    form.submit();
};

window.onload = drawGraph;