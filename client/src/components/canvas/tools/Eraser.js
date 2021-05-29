import Tool from "./Tool";

export default class Eraser extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.ctx.strokeStyle = "#fff";
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - this.areaBlock.offsetLeft,
      e.pageY - this.areaBlock.offsetTop
    );
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(
        e.pageX - this.areaBlock.offsetLeft,
        e.pageY - this.areaBlock.offsetTop
      );
    }
  }
  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
