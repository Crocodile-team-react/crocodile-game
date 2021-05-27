import Tool from './Tool';

export default class Brush extends Tool {
  constructor(canvas, socket) {
    super(canvas, socket);
    this.listen();
    this.areaBlock = document.querySelector(".drawing-area-block");
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
     
    //  this.socket.send(
    //    JSON.stringify({
    //      method: "draw",
    //      id: this.id,
    //      figure: {
    //        type: "finish",
    //      },
    //    })
    //  );
   }
  mouseDownHandler(e) {
    this.mouseDown = true;
    console.log(this.myOffsetTop);
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
      // this.socket.send(
      //   JSON.stringify({
      //     method: "draw",
      //     id: this.id,
      //     figure: {
      //       type: "brush",
      //       x: e.pageX - e.target.offsetLeft,
      //       y: e.pageY - e.target.offsetTop,
      //     },
      //   })
      // );
    }
   }
   static draw(ctx, x, y) {
    ctx.lineTo(x,y);
    ctx.stroke();
   }
}