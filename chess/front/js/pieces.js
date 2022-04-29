const chessCanvas = document.getElementById("chess");
const ctx = chessCanvas.getContext("2d");

(function() {
    let boardImg = new Image();
    boardImg.src = "./images/board.jpg";
    boardImg.onload = function() {
        ctx.drawImage(boardImg, 0, 0, 500, 700);
    }
})();

const leftMargin = 12;
const topMargin = 28;
const width = 53.6;
const height = 66.2;


class Piece {
    x = 0; // 横坐标
    y = 0; // 纵坐标
    alive = true; // 是否存活
    group = ""; // 阵营
    imgPath = ""; // 图片地址
    img = null; // 图片对象
    pieceWidth = 50; // 棋子宽度

    display(ctx) {
        ctx.drawImage(this.img, leftMargin + this.x * width, topMargin + this.y * height, this.pieceWidth, this.pieceWidth);
    }

    constructor(x, y, imgPath, group, ctx) {
        this.x = x;
        this.y = y;
        this.alive = true;
        this.group = group;
        this.imgPath = imgPath;
        this.img = new Image();
        this.img.src = this.imgPath;
        const that = this;
        this.img.onload = function() {
            that.display(ctx);
        }
    }
}

class RedCannon extends Piece {
    constructor(x, y, imgPath, ctx) {
        super(x, y, imgPath, "red", ctx);
    }
}

class BlackCannon extends Piece {
    constructor(x, y, imgPath, ctx) {
        super(x, y, imgPath, "black", ctx);
    }
}

const redCannon1 = new RedCannon(1, 2, "./images/redCannon.png", ctx);
const redCannon2 = new RedCannon(7, 2, "./images/redCannon.png", ctx);