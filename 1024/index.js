let rows = [];

let curScore = 0; // 当前分数
let newNums = [2, 4]; // 自动产生的新数字
const ROWSIZE = 4; // 列数
const COLUMNSIZE = 4; // 行数
const SPANWIDTH = 65; // span的宽度
const SPANHEIGHT = 70; // span的高度
const SPANRIGHT = 5; // span的右margin
const SPANTOP = 5; // span的上margin
// let totalOperate = 0; // 操作总数，用于测试是否结束

// 为开始结束按钮添加事件
(function() {
    document.querySelector(".restart").addEventListener("click", re_start);
    document.querySelector(".start").addEventListener("click", start_game);
})();

// 随机生成新元素
function random_one() {
    let emptys = [];
    for (let i = 0; i < ROWSIZE; i++) {
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (rows[i][j].value === 0) {
                emptys.push(rows[i][j]);
            }
        }
    }
    const randomIndex = Math.floor(Math.random() * emptys.length);
    emptys[randomIndex].value = newNums[Math.floor(Math.random() * newNums.length)];
    return emptys[randomIndex];
}

// 初始化向页面添加新元素
function add_node_when_init(nodeObj) {
    const spanDom = $("<span></span>");
    spanDom.text(nodeObj.value);
    spanDom.attr("id", "span".concat(nodeObj.index));
    spanDom.css("left", nodeObj.yIndex * (SPANWIDTH + SPANRIGHT));
    spanDom.css("top", nodeObj.xIndex * (SPANHEIGHT + SPANTOP));
    $(".play .content").append(spanDom);
}

// 键盘点击事件
function key_down(e) {
    // debugger
    if (e.keyCode === 38) { // 向上合并
        merge_top(rows);
        $(".score").text("当前分数：" + curScore);
        // update_inter_face();
        // is_finished();
    } else if (e.keyCode === 40) { // 向下合并
        merge_bottom(rows);
        $(".score").text("当前分数：" + curScore);
        // update_inter_face();
        // is_finished();
    } else if (e.keyCode === 37) { // 向左合并
        merge_left(rows);
        $(".score").text("当前分数：" + curScore);
        // update_inter_face();
        // is_finished();
    } else if (e.keyCode === 39) { // 向右合并
        merge_right(rows);
        $(".score").text("当前分数：" + curScore);
        // update_inter_face();
        // is_finished();
    }
}

// 向左合并
function merge_left() {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        const arr = [];
        for (let j = 0; j < COLUMNSIZE; j++) {
            arr.push(rows[i][j]);
        }
        operate += margin_stack(arr, "left");
    }
    if (operate !== 0) {
        add_node_when_init(random_one());
    }
}

// 向右合并
function merge_right() {
    let operate = 0;
    for (let i = 0; i < ROWSIZE; i++) {
        const arr = [];
        for (let j = COLUMNSIZE - 1; j >= 0; j--) {
            arr.push(rows[i][j]);
        }
        operate += margin_stack(arr, "right");
    }
    if (operate !== 0) {
        add_node_when_init(random_one());
    }
}

// 向上合并
function merge_top() {
    let operate = 0;
    for (let j = 0; j < COLUMNSIZE; j++) {
        const arr = [];
        for (let i = 0; i < ROWSIZE; i++) {
            arr.push(rows[i][j]);
        }
        operate += margin_stack(arr, "top");
    }
    if (operate !== 0) {
        add_node_when_init(random_one());
    }
}

// 向下合并
function merge_bottom() {
    let operate = 0;
    for (let j = 0; j < COLUMNSIZE; j++) {
        const arr = [];
        for (let i = ROWSIZE - 1; i >= 0; i--) {
            arr.push(rows[i][j]);
        }
        operate += margin_stack(arr, "bottom");
    }
    if (operate !== 0) {
        add_node_when_init(random_one());
    }
}

// 使用栈合并各个项
function margin_stack(arr, direction) {
    let operate = 0;
    const stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === 0) { continue; }
        if (stack.length !== 0) {
            const last = stack[stack.length - 1];
            // 两个值相同
            if (last.value === arr[i].value) {
                last.value = last.value + arr[i].value;
                curScore += last.value;
                arr[i].value = 0;
                move_anime(arr[i], last);
                operate++;
            } else { // 两个值不相等，各个方向
                if (direction === "top") {
                    let nodeObj = rows[last.xIndex + 1][last.yIndex];
                    let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                    operate += tmpOperate;
                    stack.push(addObj);
                } else if (direction === "left") {
                    let nodeObj = rows[last.xIndex][last.yIndex + 1];
                    let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                    operate += tmpOperate;
                    stack.push(addObj);
                } else if (direction === "bottom") {
                    let nodeObj = rows[last.xIndex - 1][last.yIndex];
                    let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                    operate += tmpOperate;
                    stack.push(addObj);
                } else if (direction === "right") {
                    let nodeObj = rows[last.xIndex][last.yIndex - 1];
                    let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                    operate += tmpOperate;
                    stack.push(addObj);
                }
            }
        } else {
            if (direction === "top") {
                let nodeObj = rows[0][arr[i].yIndex];
                let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                operate += tmpOperate;
                stack.push(addObj);
            } else if (direction === "left") {
                let nodeObj = rows[arr[i].xIndex][0];
                let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                operate += tmpOperate;
                stack.push(addObj);
            } else if (direction === "bottom") {
                let nodeObj = rows[ROWSIZE - 1][arr[i].yIndex];
                let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                operate += tmpOperate;
                stack.push(addObj);
            } else if (direction === "right") {
                let nodeObj = rows[arr[i].xIndex][COLUMNSIZE - 1];
                let [addObj, tmpOperate] = move_node(arr[i], nodeObj);
                operate += tmpOperate;
                stack.push(addObj);
            }
        }
    }
    return operate;
}

// 移动未合并节点, 返回要入栈的节点和操作数
function move_node(Obj, target) {
    if (Obj.xIndex !== target.xIndex || Obj.yIndex !== target.yIndex) {
        add_node_dom(Obj, target);
        return [target, 1];
    } else {
        return [Obj, 0];
    }
}

// 添加未合并节点dom，为动画做准备
function add_node_dom(Obj, target) {
    if ($("#span".concat(target.index)).length === 0) {
        const spanDom = $("<span></span>");
        spanDom.text("");
        spanDom.attr("id", "span".concat(target.index));
        spanDom.css("left", target.yIndex * (SPANWIDTH + SPANRIGHT));
        spanDom.css("top", target.xIndex * (SPANHEIGHT + SPANTOP));
        $(".play .content").append(spanDom);
    }
    target.value = Obj.value;
    Obj.value = 0;

    move_anime(Obj, target);
}

// 移动动画
function move_anime(Obj, target) {
    const moveX = target.yIndex * (SPANWIDTH + SPANRIGHT);
    const moveY = target.xIndex * (SPANHEIGHT + SPANTOP);
    const objDom = document.getElementById("span".concat(Obj.index));
    // 修改dom的id防止后面的动画获取到这个本该删除的dom
    objDom.setAttribute("id", Obj.index + "-" + target.index);
    const targetDom = document.getElementById("span".concat(target.index));
    if (Obj.yIndex !== target.yIndex) {
        const step = (target.yIndex - Obj.yIndex) > 0 ? 5 : -5;
        const targetVal = target.value;
        clearInterval(objDom.timer);
        objDom.timer = setInterval(function() {
            if (objDom.offsetLeft !== moveX) {
                objDom.style.left = objDom.offsetLeft + step + "px";
            } else {
                targetDom.innerText = targetVal;
                objDom.remove();
                clearInterval(objDom.timer);
            }
        }, 1);
    }
    if (Obj.xIndex !== target.xIndex) {
        const step = (target.xIndex - Obj.xIndex) > 0 ? 5 : -5;
        const targetVal = target.value;
        clearInterval(objDom.timer);
        objDom.timer = setInterval(function() {
            if (objDom.offsetTop !== moveY) {
                objDom.style.top = objDom.offsetTop + step + "px";
            } else {
                targetDom.innerText = targetVal;
                objDom.remove();
                clearInterval(objDom.timer);
            }
        }, 1);
    }
}

// 判断是否游戏可以继续
function is_finished() {
    let tmp = [];
    for (let i = 0; i < ROWSIZE; i++) {
        tmp[i] = [];
        for (let j = 0; j < COLUMNSIZE; j++) {
            tmp[i][j] = rows[i][j];
        }
    }
    totalOperate = 0;
    merge_left(tmp);
    if (totalOperate) { return; }
    merge_right(tmp);
    if (totalOperate) { return; }
    merge_top(tmp);
    if (totalOperate) { return; }
    merge_bottom(tmp);
    if (totalOperate) { return; }
    document.removeEventListener("key_down", key_down);
    alert("最终得分为：" + curScore);
}

// 开始游戏
function start_game() {
    curScore = 0;
    $(".score").text("当前分数：" + curScore);
    for (let i = 0; i < ROWSIZE; i++) {
        rows[i] = [];
        for (let j = 0; j < COLUMNSIZE; j++) {
            rows[i][j] = {
                index: i * ROWSIZE + j,
                xIndex: i,
                yIndex: j,
                value: 0
            }
        }
    }
    add_node_when_init(random_one());
    add_node_when_init(random_one());
    document.addEventListener("keydown", key_down);
}

// 重新开始游戏
function re_start() {
    alert("似乎是个假按钮捏");
}