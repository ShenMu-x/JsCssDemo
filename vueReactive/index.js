import { reactive, computedReactive, watchReactive } from './reactive.js'
import { Watcher } from './Watcher.js';

// computed 和 data都是对象，定义在vm（vue对象）上
let data = reactive({
    text: 'hello world'
});

new Watcher(() => {
    console.log('hello data render watcher!')
    document.getElementById('app').innerText = data.text;
})

document.getElementById('btn').addEventListener('click', function () {
    data.text += '！';
})



// 每个computed属性也有自己的watcher
// computed属性的watcher要添加到其依赖属性的dep中

let computed = computedReactive({
    text0: () => data.text + '0'
})
// 此处定义computed属性对象.
// 获取计算属性时进行get拦截,为计算属性增加computedWatcher
// 在下方渲染函数getValue时，触碰到get拦截.
// 第一步，computedWatcher.depend.
// 将当前渲染watcher加入到computedWatcher的dep中.
// 第二步，执行computedWatcher在构造函数中没执行的getValue函数.
// getValue中，将computedWatcher设置为Dep.target
// 执行computedWatcher的计算函数（不是渲染函数）
// 执行计算函数的过程中，会读取到该计算函数依赖的基本属性（如data.text）
// 读取时触碰到data.text的get拦截，说明当前watcher一定依赖于本属性
// 从而将computedWatcher扔到本属性的dep列表中
// 本属性发生改变时会通知到computedWatcher中,触发了update计算函数
// 在computedWatcher中，又触发了computedWatcher中的dep进行更新
// 使得针对计算属性的渲染watcher执行.

new Watcher(() => {
    console.log('hello computed render watcher!')
    document.getElementById('computed').innerText = computed.text0;
    // 此处模拟complier扫描到vm属性，会生成渲染watcher.
    // 在Watcher的构造函数中，注册渲染函数,并直接进行getValue()的渲染.
    // getValue时,本watcher成为Dep.target.
})


// watch某个属性值
watchReactive(() => data.text, (newV, oldV) => {
    console.log('监听text属性变化。');
    console.log(`oldV: ${oldV} ; newV: ${newV} `);
})