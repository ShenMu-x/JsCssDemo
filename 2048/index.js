// 作者：ShenMu-X
// 环境： VsCode Chrome
// 时间：2021-07-20

const LEN = 4; // 4*4的盘 

let game = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let pai = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let colorLs = {
    "2": "rgb(255, 219, 173)",
    "4": "rgb(255, 173, 65)",
    "8": "rgb(196, 111, 0)",
    "32": "rgb(146, 83, 1)",
    "64": "rgb(78, 146, 1)",
    "128": "rgb(143, 48, 5)",
    "256": "rgb(30, 13, 184)",
    "512": "rgb(143, 49, 5)",
    "1024": "rgb(98, 8, 116)",
    "default": "aquamarine"
}

function resetPai() {
    pai = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// 键盘操作 思路相同，up函数中有详细描述
function up() {
    /* 
    4 0 2 4        4 4 4 8     
    2 2 2 0    =>  4 2 4 2   
    2 2 2 4        4 0 0 0     
    4 2 2 2        0 0 0 0     
    */

    let flag = false; // 判断行为是否为无效修改，如果是，不会重绘与新增

    for (let row = 1; row < LEN; row++) {
        // 从row所在行往上推，进行合并
        for (let idx = 0; idx < LEN; idx++) {
            // idx，确定从某一行网上推后，对列进行控制

            if (game[row][idx] > 0) {
                // 在本行不为0，才有往上推的价值
                // j控制 不断两行向上比较，类似reduce的操作。
                // tag 控制类似第三列，本值已经规约过一次，便不应该再次规约
                let j = row - 1;

                while (j >= 0) {

                    if (game[j][idx] == 0) {
                        flag = true;
                        game[j][idx] = game[j + 1][idx];
                        game[j + 1][idx] = 0;
                        j--;
                    } else if (game[j][idx] === game[j + 1][idx] && !pai[j][idx] && !pai[j + 1][idx]) {
                        flag = true;
                        game[j][idx] = game[j][idx] * 2;
                        game[j + 1][idx] = 0;
                        pai[j][idx] = 1;
                        j--;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    resetPai();
    paint(flag);
}

function down() {
    let flag = false; // 判断行为是否为无效修改，如果是，不会重绘与新增
    for (let row = LEN - 1; row >= 0; row--) {
        for (let idx = 0; idx < LEN; idx++) {

            if (game[row][idx] > 0) {
                let j = row;

                while (j < LEN - 1) {

                    if (game[j + 1][idx] == 0) {
                        flag = true;
                        game[j + 1][idx] = game[j][idx];
                        game[j][idx] = 0;
                        j++;
                    } else if (game[j][idx] === game[j + 1][idx] && !pai[j][idx] && !pai[j + 1][idx]) {
                        flag = true;
                        game[j + 1][idx] = game[j + 1][idx] * 2;
                        game[j][idx] = 0;
                        pai[j + 1][idx] = 1;
                        j++;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    resetPai();
    paint(flag);
}

function left() {
    let flag = false; // 判断行为是否为无效修改，如果是，不会重绘与新增
    for (let idx = 1; idx < LEN; idx++) {
        for (let row = 0; row < LEN; row++) {
            if (game[row][idx] > 0) {
                let j = idx - 1;

                while (j >= 0) {

                    if (game[row][j] == 0) {
                        flag = true;
                        game[row][j] = game[row][j + 1];
                        game[row][j + 1] = 0;
                        j--;
                    } else if (game[row][j] === game[row][j + 1] && !pai[row][j] && !pai[row][j + 1]) {
                        flag = true;
                        game[row][j] = game[row][j] * 2;
                        game[row][j + 1] = 0;
                        pai[row][j] = 1;
                        j--;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    resetPai();
    paint(flag);
}

function right() {
    let flag = false; // 判断行为是否为无效修改，如果是，不会重绘与新增
    for (let idx = LEN - 1; idx >= 0; idx--) {
        for (let row = 0; row < LEN; row++) {
            if (game[row][idx] > 0) {
                let j = idx;

                while (j < LEN) {

                    if (game[row][j + 1] == 0) {
                        flag = true;
                        game[row][j + 1] = game[row][j];
                        game[row][j] = 0;
                        j++;
                    } else if (game[row][j] === game[row][j + 1] && !pai[row][j] && !pai[row][j + 1]) {
                        flag = true;
                        game[row][j + 1] = game[row][j + 1] * 2;
                        game[row][j] = 0;
                        pai[row][j + 1] = 1;
                        j++;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    resetPai();
    paint(flag);
}

// dfs 判断游戏是否结束
function over() {
    let flag = true;
    function dfs(i, j) {
        if (!flag) return; // 剪枝

        if (i < LEN - 1 && game[i][j] === game[i + 1][j]) {
            flag = false;

        }
        if (j < LEN - 1 && game[i][j] === game[i][j + 1]) {
            flag = false;
        }

        if (i < LEN - 1) dfs(i + 1, j);
        if (j < LEN - 1) dfs(i, j + 1);
    }

    dfs(0, 0);

    return flag;
}

// 新增格子
function add(may) {

    let idx = Math.floor(Math.random() * may.length);
    idx = may[idx];
    console.log(idx);

    let id = `item${idx[0]}${idx[1]}`;
    let item = document.getElementById(id);

    let num = Math.floor(Math.random() * 2);//随机 2 或 4

    if (num == 0) {
        item.innerText = 2;
        item.style.backgroundColor = colorLs[2];
        game[idx[0]][idx[1]] = 2;
    }
    else {
        item.innerText = 4;
        item.style.backgroundColor = colorLs[4];
        game[idx[0]][idx[1]] = 4;
    }

}

// 绘制游戏区
function paint(flag = true) {
    // flag = false  说明进行了无效操作
    // 如果是无效操作，不会增加新的格子
    let may = [];

    // 是否满格，满格则继续判断是否结束
    game.forEach((v, row) => {
        v.forEach((t, col) => {
            if (t === 0) may.push([row, col]);
        })
    });

    if (may.length == 0 && over()) {
        alert("游戏结束");
        return;
    }

    for (let row = 0; row < LEN; row++) {
        for (let col = 0; col < LEN; col++) {
            let item = document.querySelector(`#item${row}${col}`);
            item.innerText = "";
            item.style.backgroundColor = "transparent";
            let num = game[row][col];
            if (num != 0) {
                item.innerText = num;
                if (colorLs[num]) item.style.backgroundColor = colorLs[num];
                else item.style.backgroundColor = colorLs["default"];
            }
        }
    }

    if (flag) add(may);
}

window.onload = function () {
    let pan = document.querySelector(".pan");
    pan.style.display = 'none';

    // 增加格子
    for (let row = 0; row < LEN; row++) {
        for (let col = 0; col < LEN; col++) {
            let item = document.createElement('div');
            item.id = `item${row}${col}`;
            item.classList.add("item");
            pan.appendChild(item);
        }
    }
    pan.style.display = 'flex';

    // document.getElementById("body").offsetTop;
    paint();

    window.addEventListener('keyup', function (e) {
        // console.log(e);
        switch (e.key) {
            case "ArrowUp": { up(); break; }
            case "ArrowDown": { down(); break; }
            case "ArrowLeft": { left(); break; }
            case "ArrowRight": { right(); break; }
            default: break;
        }
    })
}


