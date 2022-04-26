(function() {
    const chessCanvas = document.getElementById("chess");
    let boardImg = new Image();
    boardImg.src = "./images/board.jpg";
    boardImg.onload = function() {
        const ctx = chessCanvas.getContext("2d");
        ctx.drawImage(boardImg, 0, 0, 500, 700);
    }
})()