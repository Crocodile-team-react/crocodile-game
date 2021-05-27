import Tool from './Tool';

export default class Brush extends Tool {
  constructor(canvas, socket) {
    super(canvas, socket);
    this.listen();
   }

   listen() {
     this.canvas.onmouseup = this.mouseUpHandler.bind(this);
     this.canvas.onmousedown = this.mouseDownHandler.bind(this);
     this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
     this.ctx.strokeStyle = '#000';
   }
   mouseUpHandler() {
     this.mouseDown = false;
     this.socket.emit("draw",{
         type: "finish",
     });
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
      this.socket.emit("draw", {
        type: "brush",
        x: e.pageX - this.areaBlock.offsetLeft,
        y: e.pageY - this.areaBlock.offsetTop,
      });
    }
  }
  
  static draw(ctx, x, y) {
    ctx.lineTo(x,y);
    ctx.stroke();
   }
}