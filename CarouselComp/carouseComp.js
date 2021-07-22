class Swiper {
    constructor(loop = true, wait = 3000) {
        this._loop = loop; // 是否自动滚动
        this._wait = wait; // 图片展示时间
        this.interval = null;
        this.sliderLs = [];
        this.pageLs = null;
        this._nowItem = 0;//指向要展示的值
        this.hasPagination = false;
    }
    init() {
        let _this = this; // 保存this指向，addEventListener时需要

        // 控制鼠标入出
        let container = document.querySelector('.carouse-container');
        container.addEventListener('mouseover', () => {
            console.log(1)
            let next = document.querySelector('.carouse-btn-next');
            let prev = document.querySelector('.carouse-btn-prev');
            if (next) next.classList.remove('none');
            if (prev) prev.classList.remove('none');
            if (this.interval) clearInterval(this.interval);
        })

        container.addEventListener('mouseout', () => {
            let next = document.querySelector('.carouse-btn-next');
            let prev = document.querySelector('.carouse-btn-prev');
            if (next) next.classList.add('none');
            if (prev) prev.classList.add('none');
            this.toLoop();
        })


        // 设置图片 添加底部选择条
        let slide = Array.from(document.querySelectorAll('.carouse-wrapper>.carouse-slide'));
        let pagination = document.querySelector('.carouse-pagination');
        let frag = document.createDocumentFragment();
        if(pagination) {this.hasPagination = true;this.pageLs = [];}

        slide.forEach((item) => {

            this.sliderLs.push(item);

            // 图片全部置为透明
            item.classList.add('opacity0');

            if (this.hasPagination) {
                
                let span = document.createElement('span');
                span.classList.add('page-item');
                this.pageLs.push(span);
                span.dataset.tag = `${this.pageLs.length - 1}`;

                //设置了防抖，可有可无吧，减少调用
                span.addEventListener('click', debounce(function (e) { _this.toPage(e) }, 200));
                frag.appendChild(span);
            }

        })

        if (pagination) pagination.appendChild(frag);


        // 前进后退 添加显隐和回调
        let next = document.querySelector('.carouse-btn-next');
        let prev = document.querySelector('.carouse-btn-prev');
        if (next) {
            next.classList.add('none');
            //由于不需要this指向documentElement，使用箭头函数
            next.addEventListener('click', () => { this.next() });
        }
        if (prev) {
            prev.classList.add('none');
            prev.addEventListener('click', () => { this.prev() });
        }

        this.toLoop();
    }

    toLoop() {
        let item = this.sliderLs[this._nowItem];
        item.classList.remove('opacity0');
        if(this.pageLs) this.pageLs[this._nowItem].classList.add('page-item-active');

        this.sliderLs.forEach(v => {
            v.classList.add('transition');
        })

        if (!this._loop) return;
        if (this.interval) clearInterval(this.interval);

        this.interval = setInterval(() => {
            // console.log('change', this._nowItem)
            let pre = this._nowItem + 1;
            if (pre >= this.sliderLs.length) pre = 0;
            this.sliderLs[pre].classList.remove('opacity0');
            this.sliderLs[this._nowItem].classList.add('opacity0');
            if (this.pageLs) {
                this.pageLs[pre].classList.add('page-item-active');
                this.pageLs[this._nowItem].classList.remove('page-item-active');
            }

            this._nowItem = pre;
        }, this._wait);
    }

    next() {
        if (this.interval) clearInterval(this.interval);

        let pre = this._nowItem + 1;
        if (pre >= this.sliderLs.length) pre = 0;
        this.sliderLs[pre].classList.remove('opacity0');
        this.sliderLs[this._nowItem].classList.add('opacity0');
        if (this.pageLs) {
            this.pageLs[pre].classList.add('page-item-active');
            this.pageLs[this._nowItem].classList.remove('page-item-active');
        }
        this._nowItem = pre;

    }
    prev() {
        if (this.interval) clearInterval(this.interval);

        let pre = this._nowItem - 1;
        if (pre < 0) pre = this.sliderLs.length - 1;
        this.sliderLs[pre].classList.remove('opacity0');
        this.sliderLs[this._nowItem].classList.add('opacity0');
        if (this.pageLs) {
            this.pageLs[pre].classList.add('page-item-active');
            this.pageLs[this._nowItem].classList.remove('page-item-active');
        }
        this._nowItem = pre;
    }

    toPage(e) {

        let toshow = Number(e.target.dataset.tag);

        if (this.interval) clearInterval(this.interval);
        if (toshow === this._nowItem) return;

        let pre = toshow;
        this.sliderLs[pre].classList.remove('opacity0');
        this.sliderLs[this._nowItem].classList.add('opacity0');
        if (this.pageLs) {
            this.pageLs[pre].classList.add('page-item-active');
            this.pageLs[this._nowItem].classList.remove('page-item-active');
        }
        this._nowItem = pre;

    }

}

let swiper = new Swiper().init();


// 防抖
function debounce(fn, delay = 500) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(null, args);
        }, delay);
    }
}


// 监听器卸载
window.onload = function () {
    window.onbeforeunload = function () {
        if (swiper.interval) clearInterval(swiper.interval);
    }
    window.onunload = function () {
        if (swiper.interval) clearInterval(swiper.interval);
    }

    window.onpagehide = function () {
        if (swiper.interval) {
            clearInterval(swiper.interval);
        }
    }
    window.onpageshow = function () {
        if (swiper) swiper.toLoop();
    }
}

