import { Dep } from './Dep.js';
import { Watcher } from './Watcher.js';
export { reactive, computedReactive, watchReactive };

function isObject(data) {
    if (typeof data === 'object') return true;
    else return false;
}

function reactive(data) {
    if (isObject(data)) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            defineReactive(data, key);
        })
        return data;
    }
    else return data;
}

function defineReactive(data, key) {
    let val = data[key];
    const dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            dep.depend();
            // 把自己的watcher扔进去了
            // 也把依赖其的computedWatcher扔进去了
            console.log(`get拦截！此时get ${key}`);
            return val;
        },
        set(nVal) {
            console.log(`set拦截！此时set ${key}`);
            // data[key] = nVal; // 会陷入死循环，此处是set操作
            val = nVal; // 此处才是真正的赋值
            dep.update();
            return nVal;
        }
    })

    if (isObject(val)) {
        reactive(val); // 递归定义
    }
}

function computedReactive(computed) {
    if (isObject(computed)) {
        let keys = Object.keys(computed);
        keys.forEach(key => {
            computedDefinedReactive(computed, key);
        })
        return computed;
    }
    else return computed;
}

function computedDefinedReactive(computed, key) {
    let fn = computed[key];
    let value = null;
    // computedWatcher中放的是计算函数不是渲染函数
    const computedWatcher = new Watcher(() => {
        console.log('computedWatcher中的计算函数');
        let nValue = fn();
        if (nValue !== value) {
            value = nValue;
        }
        return value;
    }, { computed: true })
    Object.defineProperty(computed, key, {
        get() {
            computedWatcher.depend(); // 此时收集自己的渲染watcher
            return computedWatcher.getValue();//此时让关联属性的watcher收集到computedWatcher       
        }
    })
}

function watchReactive(prop, fn) {
    console.log('watchReactive')
    const watchWatcher = new Watcher(prop, { watch: true, cb: fn });
}