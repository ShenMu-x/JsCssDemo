// 作者：ShenMu-X
// 环境： VsCode Chrome
// 时间：2021-07-20

// 随手写的防抖函数，没用上
function debounce(fn, delay = 500) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer.setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    }
}

// 水果图片文件列表
let pic = ["./img/0.png", "./img/1.png", "./img/2.png"];

// 得分 失分 开始标记
let get = 0;
let lose = 0;
let isStart = true;

// 简单封装计数器
let count = (function () {
    let i = 0;
    return function () {
        return ++i;
    }
})();

// 结束游戏
function paused() {
    document.querySelector(".startBtn").textContent = "游戏结束啦";
    let main = document.querySelector("div.main");
    isStart = false;
    Array.from(main.children).forEach(item => item.style.display = 'none')
}

// 刷新得分
function refresh() {
    document.querySelector(".get").textContent = `得分：${get}`;
    document.querySelector(".lose").textContent = `失分：${-lose}`;
    document.querySelector(".total").textContent = `总分：${get - lose}`;
}

// 开始游戏
function start() {
    // 对button的操作 
    let btn = document.querySelector(".startBtn");
    btn.textContent = "游戏开始啦,点我停止。。。";
    btn.removeEventListener("click", start, false);
    btn.addEventListener("click", paused, false);

    function add() {
        // 在游戏窗口添加img元素
        let main = document.querySelector("div.main");
        let img = document.createElement("img");

        img.id = `img${count()}`;
        let idx = Math.floor(Math.random() * pic.length)
        img.src = pic[idx];
        img.style.setProperty('left', `${Math.floor(Math.random() * 6) * 100}px`);
        img.classList.add('img');
        img.classList.add('lower');

        main.appendChild(img);

        // 落到底消失，下落5s,抖动0.3s,确认是落到底
        let timer = setTimeout(() => {
            // console.log(img.id);
            let node = document.getElementById(img.id);
            if (node) main.removeChild(node);
            if (isStart) lose++, refresh(), add();
        }, 5330);

        // 点击效果
        img.addEventListener("click", function (e) {
            let node = e.currentTarget;
            get++;
            refresh();
            bounce(node).then(_ => {
                main.removeChild(node);
                if (timer) clearTimeout(timer);
                if (isStart) add();
            })
        })
    }

    add(); // 开始游戏
}

// 点击产生抖动效果
function bounce(node) {
    return new Promise(resolve => {
        // 停止下落动画，根据坐标记录当前位置，增加shake类
        node.classList.add("stopLower");
        // 只能通过getBundingClientRect获取当前绝对高度，这里转化为相对父元素高度
        let father = document.getElementById("main").getBoundingClientRect().y;
        let top = node.getBoundingClientRect().y - father;
        node.classList.remove("lower");
        node.classList.remove("stopLower");

        node.style.top = `${top}px`;

        // 动画效果需要0.3s时间
        node.classList.add("shake");
        setTimeout(() => {
            resolve();
        }, 400);
    })
}

window.onload = function () {
    // console.log('onload');
    refresh();
    document.querySelector(".startBtn").addEventListener("click", start, false);
    window.onunload = function () {
        // 页面卸载时触发，清除定时器 没用到
    }
    window.onbeforeunload = function () {
        // 页面刷新时触发，清除定时器 没用到
    }
}

