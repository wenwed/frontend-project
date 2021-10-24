const rows =
    [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];

let curScore = 0;
let newNums = [2, 4, 8];
const ROWSIZE = 4;
const COLUMNSIZE = 4;

function randomNewOne() {
    let emptys = [];
    for (let i = 0; i < ROWSIZE; i++) {
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (rows[i][j] === 0) {
                emptys.push([i, j]);
            }
        }
    }
    const randomIndex = Math.floor(Math.random() * emptys.length);
    rows[emptys[randomIndex][0]][emptys[randomIndex][1]] = newNums[Math.floor(Math.random() * newNums.length)];
}

randomNewOne();
randomNewOne();

// 向左合并
function mergeLeft() {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNew = 0;
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew++;
                operate++;
            } else if (rows[i][j] !== 0 && curNew !== j) {
                last = rows[i][j];
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew++;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}

// 向右合并
function mergeRight() {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNew = COLUMNSIZE - 1;
        for (let j = COLUMNSIZE - 1; j >= 0; j--) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew--;
                operate++;
            } else if (rows[i][j] !== 0 && curNew !== j) {
                last = rows[i][j];
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew--;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}

// 未完成
// 向上合并
function mergeTop() {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNew = COLUMNSIZE - 1;
        for (let j = COLUMNSIZE - 1; j >= 0; j--) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew--;
                operate++;
            } else if (rows[i][j] !== 0 && curNew !== j) {
                last = rows[i][j];
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew--;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}

// 未完成
// 向下合并
function mergeBottom() {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNew = COLUMNSIZE - 1;
        for (let j = COLUMNSIZE - 1; j >= 0; j--) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew--;
                operate++;
            } else if (rows[i][j] !== 0 && curNew !== j) {
                last = rows[i][j];
                rows[i][curNew] = last;
                rows[i][j] = 0;
                curNew--;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}