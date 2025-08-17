class Turtle {
constructor(canvas) {
this.canvas = canvas;
this.ctx = canvas.getContext('2d');
this.x = canvas.width / 2;
this.y = canvas.height / 2;
this.angle = 0; // Dirección en grados
this.penDown = true;
this.penColor = 'black';
this.penSize = 1;
this.speedValue = 5;
}
​speed(value) {
this.speedValue = value;
}
​penup() {
this.penDown = false;
}
​pendown() {
this.penDown = true;
}
​pencolor(color) {
this.penColor = color;
}
​pensize(size) {
this.penSize = size;
}
​forward(distance) {
const rad = this.angle * Math.PI / 180;
const newX = this.x + Math.cos(rad) * distance;
const newY = this.y - Math.sin(rad) * distance;
if (this.penDown) {
  this.ctx.beginPath();
  this.ctx.strokeStyle = this.penColor;
  this.ctx.lineWidth = this.penSize;
  this.ctx.moveTo(this.x, this.y);
  this.ctx.lineTo(newX, newY);
  this.ctx.stroke();
}
this.x = newX;
this.y = newY;
}
backward(distance) {
this.forward(-distance);
}
left(angle) {
this.angle += angle;
}
right(angle) {
this.angle -= angle;
}
goto(x, y) {
this.x = this.canvas.width / 2 + x;
this.y = this.canvas.height / 2 + y;
}
setheading(angle) {
this.angle = angle;
}
begin_fill() {
this.ctx.beginPath();
}
fillcolor(color) {
this.fillColor = color;
}
end_fill() {
this.ctx.fillStyle = this.fillColor;
this.ctx.fill();
}
clear() {
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
}