const board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];

isValidSudoku(board);

function isValidSudoku(board) {

    const ROWLEN = 9,
        COLLEN = 9;

    const isValidRow = (x, y) => {
        const OBJ = {};
        for (let i = 0; i < ROWLEN; i++) {
            if (board[i][y] == ".") { continue; }
            if (OBJ[board[i][y]]) {
                return false;
            } else {
                OBJ[board[i][y]] = true;
            }
        }
        return true;
    }

    const isValidCol = (x, y) => {
        const OBJ = {};
        for (let j = 0; j < COLLEN; j++) {
            if (board[x][j] == ".") { continue; }
            if (OBJ[board[x][j]]) {
                return false;
            } else {
                OBJ[board[x][j]] = true;
            }
        }
        return true;
    }

    const isValidSquare = (x, y) => {
        const OBJ = {},
            startRow = Math.floor(x / 3) * 3,
            startCol = Math.floor(y / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (OBJ[board[startRow + i][startCol + j]] == ".") { continue; }
                debugger
                const tmp1 = board[startRow + i][startCol + j];
                const tmp2 = OBJ[board[startRow + i][startCol + j]];
                if (OBJ[board[startRow + i][startCol + j]]) {
                    return false;
                } else {
                    OBJ[board[startRow + i][startCol + j]] = true;
                }
            }
        }
        return true;
    }

    for (let i = 0; i < ROWLEN; i++) {
        for (let j = 0; j < COLLEN; j++) {
            if (!(isValidRow(i, j) && isValidCol(i, j) && isValidSquare(i, j))) {
                return false;
            }
        }
    }
    return true;
};