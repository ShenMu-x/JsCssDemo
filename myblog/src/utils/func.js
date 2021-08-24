import store from '@/store';
import Vue from 'vue';

export { throttle, getArticle, getRemarks, getObjectURL, TimeFun };

// let portUrl = "http://www.mangoya.cn/port/";
let portUrl = "http://" + window.location.host + "/port/";


function throttle(fn, delay = 100) {
    let tag = null;
    return function (...args) {
        if (!tag || Date.now() - tag >= delay) {
            tag = Date.now();
            fn.apply(null, args);
        }
    }
}

function getArticle(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            id = parseInt(id);
            let obj = store.state.articles.filter((v) => v.id === id)[0];
            if (!obj) {
                reject("错误请求");
            } else {
                resolve(obj);
            }
        }, 500);
    })
};

const db = {
    remarks: [
        {
            id: 1,
            nickname: "猹",
            remark: "楼下您可闭嘴吧",
            time: 1629503063149,
        },
        {
            id: 2,
            nickname: "瓶儿",
            remark: "这玩意比草报强多了",
            time: 1629336263370,
        },
        {
            id: 3,
            nickname: "游客",
            remark: "嘿大家好吖",
            time: 1629306566950,
        },
    ]
}

function getRemarks({ page = 0, size = 5 }) {
    return new Promise((resolve, reject) => {
        let delay = Math.floor(Math.random() * 1000);
        setTimeout(() => {
            let ls = db.remarks.slice(page * size, (page + 1) * size);
            console.log('delay', delay)
            resolve({
                data: ls,
                end: db.remarks.length > (page + 1) * size
            });
        }, delay);
    })
}


const TimeFun = {
    getUnix: function () { return new Date().getTime(); },
    getTodayUnix: function () {
        let date = new Date();
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    getYearUnix: function () {
        let date = new Date();
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setMilliseconds(0);
        date.setMonth(0);
        date.setDate(1);

        return date.getTime();
    },
    getFmatDate: function (stamp) {
        let date = new Date();
        if (stamp) date.setTime(stamp);
        let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1);
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return `${date.getFullYear()}-${m}-${d}`;
    },
    getFmatTime: function (stamp) {
        let date = new Date();
        if (stamp) date.setTime(stamp);
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${this.getFmatDate(stamp)} ${h}:${m}:${s}`;
    },

    getFmatTime_S: function (stamp) {

        let now = this.getUnix();
        let today = this.getTodayUnix();
        let tip = '';
        let timer = (now - stamp) / 1000; // second

        if (stamp > today) {
            if (timer <= 0) tip = "刚刚";
            else if (timer < 60) tip = "刚刚";
            else if (timer > 60 && timer < 3600) tip = `${Math.floor(timer / 60)} 分钟前`;
            else if (timer >= 3600 && timer < 86400) tip = `${Math.floor(timer / 3600)} 小时前`;
        } else {
            let timer = (today - stamp) / 1000; // second
            if (timer < 86400) tip = `昨天`;
            else tip = this.getFmatTime(stamp);
        }

        console.log(timer, this.getFmatDate(stamp));

        // if (timer <= 0) tip = "刚刚";
        // else if (timer < 60) tip = "刚刚";
        // else if (timer > 60 && timer < 3600) tip = `${Math.floor(timer / 60)} 分钟前`;
        // else if (timer >= 3600 && timer < 86400) tip = `${Math.floor(timer / 3600)} 小时前`;
        // else if (timer >= 86400 && timer < 86400 * 2) tip = `昨天`;
        // else tip = this.getFmatTime(stamp);

        return tip;
    }
};

Vue.directive('time', {
    bind: function (el, binding) {
        el.innerText = TimeFun.getFmatTime_S(binding.value);
    }
})

function getObjectURL(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
