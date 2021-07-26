// bus 总线
const install = function (Vue) {
    const Bus = new Vue({
        methods: {
            emit(event, ...args) {
                this.$emit(event, args)
            },
            on(event, fn) {
                this.$on(event, fn);
            },
            off(event, fn) {
                this.$off(event, fn);
            }
        }
    });

    Vue.prototype.$bus = Bus;
};

export default install;

// const install = function (Vue) {
//     const Bus = new Vue({
//         methods: {
//             emit(event, ...args) {
//                 this.$emit(event, ...args);
//             },
//             on(event,callback){
//                 this.$on(event,callback);
//             },
//             off(event,callback){
//                 this.$off(event,callback);
//             }
//         }
//     });
//     Vue.prototype.$bus = Bus;
// };

// export default install;