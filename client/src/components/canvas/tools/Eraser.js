import Brush from "./Brush";
export default class Eraser extends Brush {
    constructor(canvas, socket) {
        super(canvas, socket);
        this.listen();
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.ctx.strokeStyle = "#fff";
    }
    

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.socket.emit("draw", {
                type: "eraser",
                x: e.pageX - this.areaBlock.offsetLeft,
                y: e.pageY - this.areaBlock.offsetTop,
            });
        }
    }
    static draw(ctx, x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
