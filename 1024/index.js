let rows = [];

let curScore = 0;   // 当前分数
let newNums = [2, 4];    // 自动产生的新数字
const ROWSIZE = 4;  // 列数
const COLUMNSIZE = 4;   // 行数
let totalOperate = 0;   // 操作总数，用于测试是否结束

// 随机生成新元素
function randomNewOne(rows) {
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
    let score = 0;
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNow = 0;
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (rows[i][j] === 0) { continue; }
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNow] = last;
                rows[i][j] = 0;
                operate++;
                score += last;
            } else {
                if (curNow === j) {
                    last = rows[i][curNow];
                } else if (rows[i][curNow] === 0) {
                    last = rows[i][j];
                    rows[i][curNow] = last;
                    rows[i][j] = 0;
                    operate++;
                } else if (rows[i][curNow] !== 0) {
                    last = rows[i][j];
                    curNow++;
                    if (curNow === j) {
                        last = rows[i][curNow];
                    } else {
                        rows[i][j] = 0;
                        rows[i][curNow] = last;
                        operate++;
                    }
                }
            }
        }
    }
    if (operate !== 0) {
        randomNewOne(rows);
        totalOperate += operate;
    }
    return score;
}

// 向右合并
function mergeRight(rows) {
    let score = 0;
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        let last;
        let curNow = COLUMNSIZE - 1;
        for (let j = COLUMNSIZE - 1; j >= 0; j--) {
            if (rows[i][j] === 0) { continue; }
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[i][curNow] = last;
                rows[i][j] = 0;
                operate++;
                score += last;
            } else {
                if (curNow === j) {
                    last = rows[i][curNow];
                } else if (rows[i][curNow] === 0) {
                    last = rows[i][j];
                    rows[i][curNow] = last;
                    rows[i][j] = 0;
                    operate++;
                } else if (rows[i][curNow] !== 0) {
                    last = rows[i][j];
                    curNow--;
                    if (curNow === j) {
                        last = rows[i][curNow];
                    } else {
                        rows[i][j] = 0;
                        rows[i][curNow] = last;
                        operate++;
                    }
                }
            }
        }
    }
    if (operate !== 0) {
        randomNewOne(rows);
        totalOperate += operate;
    }
    return score;
}

// 向上合并
function mergeTop(rows) {
    let score = 0;
    let operate = 0;
    for (let j = 0; j < COLUMNSIZE; j++) {
        let last;
        let curNow = 0;
        for (let i = 0; i < ROWSIZE; i++) {
            if (rows[i][j] === 0) { continue; }
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[curNow][j] = last;
                rows[i][j] = 0;
                operate++;
                score += last;
            } else {
                if (curNow === i) {
                    last = rows[curNow][j];
                } else if (rows[curNow][j] === 0) {
                    last = rows[i][j];
                    rows[curNow][j] = last;
                    rows[i][j] = 0;
                    operate++;
                } else if (rows[curNow][j] !== 0) {
                    last = rows[i][j];
                    curNow++;
                    if (curNow === i) {
                        last = rows[curNow][j];
                    } else {
                        rows[i][j] = 0;
                        rows[curNow][j] = last;
                        operate++;
                    }
                }
            }
        }
    }
    if (operate !== 0) {
        randomNewOne(rows);
        totalOperate += operate;
    }
    return score;
}

// 向下合并
function mergeBottom(rows) {
    let score = 0;
    let operate = 0;
    for (let j = 0; j < COLUMNSIZE; j++) {
        let last;
        let curNow = ROWSIZE - 1;
        for (let i = ROWSIZE - 1; i >= 0; i--) {
            if (rows[i][j] === 0) { continue; }
            if (last === rows[i][j]) {
                last = 2 * last;
                rows[curNow][j] = last;
                rows[i][j] = 0;
                operate++;
                score += last;
            } else {
                if (curNow === i) {
                    last = rows[curNow][j];
                } else if (rows[curNow][j] === 0) {
                    last = rows[i][j];
                    rows[curNow][j] = last;
                    rows[i][j] = 0;
                    operate++;
                } else if (rows[curNow][j] !== 0) {
                    last = rows[i][j];
                    curNow--;
                    if (curNow === i) {
                        last = rows[curNow][j];
                    } else {
                        rows[i][j] = 0;
                        rows[curNow][j] = last;
                        operate++;
                    }
                }
            }
        }
    }
    if (operate !== 0) {
        randomNewOne(rows);
        totalOperate += operate;
    }
    return score;
}

// 键盘点击事件
function keyDown(e) {
    if (e.keyCode === 38) {
        curScore += mergeTop(rows);
        $(".score").text("当前分数：" + curScore);
        updateInterFace();
        isFinished();
    } else if (e.keyCode === 40) {
        curScore += mergeBottom(rows);
        $(".score").text("当前分数：" + curScore);
        updateInterFace();
        isFinished();
    } else if (e.keyCode === 37) {
        curScore += mergeLeft(rows);
        $(".score").text("当前分数：" + curScore);
        updateInterFace();
        isFinished();
    } else if (e.keyCode === 39) {
        curScore += mergeRight(rows);
        $(".score").text("当前分数：" + curScore);
        updateInterFace();
        isFinished();
    }
}

// 更新页面
function updateInterFace() {
    let ul = $(".content");
    for (let i = 0; i < ROWSIZE; i++) {
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (rows[i][j] === 0) {
                ul.children()[i].children[j].innerText = "";
            } else {
                ul.children()[i].children[j].innerText = rows[i][j];
            }
        }
    }
}

// 判断是否游戏可以继续
function isFinished() {
    let tmp = [];
    for (let i = 0; i < ROWSIZE; i++) {
        tmp[i] = [];
        for (let j = 0; j < COLUMNSIZE; j++) {
            tmp[i][j] = rows[i][j];
        }
    }
    totalOperate = 0;
    mergeLeft(tmp);
    if (totalOperate) { return; }
    mergeRight(tmp);
    if (totalOperate) { return; }
    mergeTop(tmp);
    if (totalOperate) { return; }
    mergeBottom(tmp);
    if (totalOperate) { return; }
    document.removeEventListener("keydown", keyDown);
    alert("最终得分为：" + curScore);
}

// 开始游戏
function startGame() {
    curScore = 0;
    $(".score").text("当前分数：" + curScore);
    rows =
        [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];

    randomNewOne(rows);
    randomNewOne(rows);
    updateInterFace();
    document.addEventListener("keydown", keyDown);
}

// 重新开始游戏
function reStart() {
    alert("似乎是个假按钮捏");
}

document.querySelector(".restart").addEventListener("click", reStart);
document.querySelector(".start").addEventListener("click", startGame);