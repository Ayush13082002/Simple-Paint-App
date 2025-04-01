const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

let circles = [];
let isDrawing = false;
let startX = 0, startY = 0;

// Random color generator (keeps it visually interesting)
function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Draw all circles on the canvas
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(({ x, y, radius, color }) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    });
}

// Clear everything and reset
function clearCanvas() {
    circles = [];
    drawCircles();
    document.getElementById("message").innerText = "";
}

// Start tracking mouse position when clicked
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

// Stop drawing, calculate radius, and add circle
canvas.addEventListener("mouseup", (e) => {
    if (!isDrawing) return;

    const radius = Math.hypot(e.offsetX - startX, e.offsetY - startY);
    if (radius > 5) {
        circles.push({ x: startX, y: startY, radius, color: getRandomColor() });
    }

    drawCircles();
    isDrawing = false;
});

// Detect if click was inside any circle (Hit/Miss)
canvas.addEventListener("click", (e) => {
    const hit = circles.some(({ x, y, radius }) => {
        return Math.hypot(x - e.offsetX, y - e.offsetY) <= radius;
    });

    document.getElementById("message").innerText = hit ? "Hit" : "Miss";
});

// Remove a circle if double-clicked inside it
canvas.addEventListener("dblclick", (e) => {
    circles = circles.filter(({ x, y, radius }) => 
        Math.hypot(x - e.offsetX, y - e.offsetY) > radius
    );

    drawCircles();
});
