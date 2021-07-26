import Vue from 'vue'
import Vuex from 'vuex'
import { today, tomorrow } from "@/utils/util.js";

Vue.use(Vuex)

const actions = {}


// 获取任务列表，筛出对应日期
let task = JSON.parse(localStorage.getItem('task'));
if (!task) task = {
    'Personal': [],
    'Work': [],
    'Other': []
}

let keys = Object.keys(task);
keys.forEach(k => {
    task[k] = task[k].filter(v => {
        return v.date === today || v.date === tomorrow
    })
})


const store = new Vuex.Store({
    actions,

    state: {
        task: '' || task
    },
    getters: {
        getTodayCount: state => {
            let keys = Object.keys(state.task);
            let count = 0;
            for (let i in keys) {
                state.task[keys[i]].forEach(v => {
                    if (v.date === today && !v.completed) count++;
                })
            }
            return count;
        },
        getSpecTodayCount: (state, name) => {

            let count = 0;

            state.task[name].forEach(v => {
                if (v.date === today && !v.completed) count++;
            })

            return count;
        }
    },
    mutations: {
        addTask: (state, params) => {
            let name = params['name'];
            let msg = params['msg'];
            let date = params['date'];
            let KEY = 0;
            let tasks = state.task[name];
            if (tasks.length > 0) KEY = tasks[tasks.length - 1]._KEY + 1;
            tasks.push({
                _KEY: KEY,
                name: msg,
                completed: false,
                date
            })
        },
        removeTask: (state, params) => {
            let KEY = params['key'];
            let name = params['name'];
            let tasks = state.task[name];
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i]._KEY === KEY) {
                    tasks.splice(i, 1);
                    break;
                }
            }
        }
    }
})
export default store;
