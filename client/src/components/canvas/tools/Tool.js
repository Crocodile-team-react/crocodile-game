export default class Tool {
  constructor(canvas, socket) {
    this.canvas = canvas;
    this.socket = socket;
    this.ctx = canvas.getContext("2d");
    this.destroyEvents();
  }

  set fillStyle(color) {
    this.ctx.fillStyle = color;
  }
  set strokeStyle(color) {
    this.ctx.strokeStyle = color;
  }
  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.mouseMoveHandler = null;
  }
}