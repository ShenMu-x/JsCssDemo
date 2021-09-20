import { Dep, popTarget, pushTarget } from "./Dep.js";

class Watcher {
    constructor(fn, options = { }) {
        this.fn = fn;

        if (options.computed) {
            this.computed = true; // computed属性标记
            this.dep = new Dep(); // 作为computed属性的watcher，有自己的依赖
            return;
        } else if (options.watch) {
            this.watch = true; // watch属性标记
            this.cb = options.cb;
        }

        this.getValue();


        // 最开始并没有将getValue独立出来，是将下面代码写死在构造函数中
        /* 
         * Dep.target = this;
         * fn();
         * Dep.target = null;
        */
        // 这样 Watcher 生成时就绑定在某个dep上 是可行的
        // 但这会导致computedWathcer生成时就被扔到其依赖属性的dep中
        // 假设代码中一直没有访问到该属性
        // 那computed事实上是没有用的，监听了但没有用
        // 所以独立的拿了出来
    }

    getValue() {
        // 运行渲染函数，会读取到相关联的属性
        // 例如在写入innerText的过程中读到data.text
        // 由dep.target作桥，此时的target一定指向当前watcher.
        pushTarget(this);
        this.value = this.fn();
        popTarget();
        return this.value;
    }

    update() {
        if (this.watch) {
            const oldValue = this.value;
            this.value = this.fn();
            this.cb(this.value, oldValue);
            return this.value;
        }
        if (this.computed) {
            this.dep.update();
        }
        return this.fn();
    }

    depend() {
        this.dep.depend();// computed属性内部dep的扩展
    }
}

export { Watcher };