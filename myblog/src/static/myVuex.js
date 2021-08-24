// https://juejin.cn/post/6844904066246508551 从0到1手写一个vuex
// https://juejin.cn/post/6855474001838342151 手写Vuex核心原理
/*
 - src/store/index.js中引入vuex。
   import Vue from 'vue'
   import Vuex from 'vuex'
   Vue.use(Vuex);
   export default new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{}
   })
 - main.js中创建vue实例,在根组件上注册store
   import store from '@/store/index'
   new Vue({
       store,
   })
*/


let Vue;
const install = function (_Vue) {
    Vue = _Vue;
    Vue.mixin({
        // https://cn.vuejs.org/v2/guide/mixins.html#%E5%85%A8%E5%B1%80%E6%B7%B7%E5%85%A5
        // 全局混入,构建组件时使用钩子进行全局注册。
        // 如果是在created操作的话，$options已经初始化好了。所以用beforeCreate钩子
        // 也可通过install中设置vue.prototype.$store实现
        // install中传入的参数是Vue
        // vue的实例属性$options是用来获取定义在data外的数据和方法的。
        beforeCreate() {
            const options = this.$options;
            if (options && options.store) {
                this.$store = options.store;
            } else {
                // 组件内部没有定义store,则从父组件继承$store
                // $store时对象，大家都用一套引用
                this.$parent && (this.$store = this.$parent.$store)
            }
        }
    })
}

class Store {
    constructor(options) {

        let that = this;
        let state = options.state || {};

        // 为了响应式，让state为vue对象
        this.vm = new Vue({
            data: state,
        })

        let gettersPro = options.getters ? Object.keys(options.getters) : [];
        this.getters = {};
        // 三种getter写法
        // test1: (state) => state.arr.sort((a,b)=>a-b);
        // test2: (state,getters) => getters.filter(v=>v.pre === state.pre);
        // test3: (state) =>  (id) => id + state.num
        gettersPro.forEach((key) => {
            let fn = options.getters[key];
            let res = fn.call(null, that.vm.$data, that.getters);
            if (typeof res === 'function') this.getters[key] = (...args) => res(...args);//携带参数
            else {
                Object.defineProperty(this.getters, key, {
                    get() {
                        res = fn.call(null, that.vm.$data, that.getters);//未携带参数应有缓存，此处未处理
                        return res;
                    }
                })
            }
        })

        let mutationsPro = options.mutations ? Object.keys(options.mutations) : [];
        this._mutationMap = new Map();
        mutationsPro.forEach(key => {
            this._mutationMap.set(key, options.mutations[key]);
        })

        let actionsPro = options.actions ? Object.keys(options.actions) : [];
        this._actionMap = new Map();
        actionsPro.forEach(key => {
            this._actionMap.set(key, options.actions[key]);
        })
    }

    // class 设置属性 (或设置 this.state = this.vm.data)
    get state() {
        return this.vm.$data;
    }

    // 几种commit方式
    // 对象形式 / 参数 / 参数对象
    commit(mutation, ...args) {
        if (typeof mutation === 'string' && this._mutationMap.has(mutation)) {
            this._mutationMap.get(mutation).call(null, this.vm.$data, ...args);
        } else if (typeof mutation === 'object' && this._mutationMap.has(mutation.type)) {
            this._mutationMap.get(mutation.type).call(null, this.vm.$data, mutation);
        }
    }

    // dispatch
    dispatch(mutation, ...args) {
        console.log(typeof mutation === 'string' && this._actionMap.has(mutation))
        if (typeof mutation === 'string' && this._actionMap.has(mutation)) {
            this._actionMap.get(mutation).call(null, this, ...args);
        } else if (typeof mutation === 'object' && this._actionMap.has(mutation.type)) {
            this._actionMap.get(mutation.type).call(null, this, mutation);
        }
    }
}


export default {
    install,
    Store
}