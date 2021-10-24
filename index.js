let rows = [];

let curScore = 0;   // 当前分数
let newNums = [2, 4, 8];    // 自动产生的新数字
const ROWSIZE = 4;  // 列数
const COLUMNSIZE = 4;   // 行数
let totalOperate = 0;   // 操作总数，用于测试是否结束

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

// 向左合并
function mergeLeft(rows) {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNow = 0;
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNow] = last;
                rows[i][j] = 0;
                curNow++;
                operate++;
            } else if (rows[i][j] !== 0 && curNow !== j) {
                last = rows[i][j];
                rows[i][curNow] = last;
                rows[i][j] = 0;
                curNow++;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}

// 向右合并
function mergeRight(rows) {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNow = COLUMNSIZE - 1;
        for (let j = COLUMNSIZE - 1; j >= 0; j--) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNow] = last;
                rows[i][j] = 0;
                curNow--;
                operate++;
            } else if (rows[i][j] !== 0 && curNow !== j) {
                last = rows[i][j];
                rows[i][curNow] = last;
                rows[i][j] = 0;
                curNow--;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}

// 向上合并
function mergeTop(rows) {
    let operate = 0;
    for (let j = 0; j < COLUMNSIZE; i++) {
        let last;
        let curNow = 0;
        for (let i = 0; i < ROWSIZE; i++) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[curNow][j] = last;
                rows[i][j] = 0;
                curNow++;
                operate++;
            } else if (rows[i][j] !== 0 && curNow !== j) {
                last = rows[i][j];
                rows[curNow][j] = last;
                rows[i][j] = 0;
                curNow++;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}

// 向下合并
function mergeBottom(rows) {
    let operate = 0;
    for (let j = 0; j < COLUMNSIZE; i++) {
        let last;
        let curNow = ROWSIZE - 1;
        for (let i = ROWSIZE - 1; i >= 0; i--) {
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[curNow][j] = last;
                rows[i][j] = 0;
                curNow--;
                operate++;
            } else if (rows[i][j] !== 0 && curNow !== j) {
                last = rows[i][j];
                rows[curNow][j] = last;
                rows[i][j] = 0;
                curNow--;
                operate++;
            }
        }
    }
    if (operate !== 0) {
        randomNewOne();
    }
}

function updateInterFace() { }

function init() {
    rows =
        [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];

    randomNewOne();
    randomNewOne();
}