import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            type: 0,
            id: -1,
            username: "Floyee",
            avatarURL: "https://tse1-mm.cn.bing.net/th/id/R-C.f002df31d8051c7c60711b919ca53fcc?rik=lMTpaL806kXvUQ&riu=http%3a%2f%2fwww.wenyu77.com%2fuploads%2fimg1%2f20200714%2fedb763cb6e70e0d985bc0babc502d44f.jpg&ehk=VPSf%2fDx0jmT2ZYHo00fJJdnOnzcPjqoZjzkl%2bBe%2bQXM%3d&risl=&pid=ImgRaw&r=0",
            interview: "hello world!",
        },
        articles: [
            {
                id: 1,
                category: "生活间",
                title: "测试文章",
                time: 1629363063389,
                viewNum: 7800,
                comtNum: 20,
                likeNum: 45,
                starNum: 66,
                interview:
                    "我是文章1的简介，很随便",
                image: "https://tse1-mm.cn.bing.net/th/id/R-C.12de6ac2ded4070c85daeef0012eb91e?rik=CAlV0BsSLxU4yw&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2f2b18302ec4edb821dd5a9f63b521cbc457747772.jpg&ehk=wugmBe5%2bvx60gQz9LOjzmleUDi0YzVh0JtlcxMlq%2fSY%3d&risl=&pid=ImgRaw&r=0",
                content: `  ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/page/article.vue?vue&type=template&id=5c4f72cf&scoped=true& 790 bytes [built]
                ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/page/article.vue?vue&type=script&lang=js& 937 bytes [built] [code generated]
                ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/page/article.vue?vue&type=style&index=0&id=5c4f72cf&lang=less&scoped=true& 780 bytes [built]
              webpack 5.49.0 compiled successfully in 545 ms
              i ｢wdm｣: Compiled successfully.
              i ｢wdm｣: Compiling...
              i ｢wdm｣: assets by status 1.04 MiB [cached] 8 assets
              assets by status 4.68 MiB [emitted]
                assets by info 17.3 KiB [hmr]
                  asset src_comp_contCard_vue.e3f7fd38a7ceaef37a48.hot-update.js 16.4 KiB [emitted] [immutable] [hmr] 1 related asset
                  asset main.e3f7fd38a7ceaef37a48.hot-update.js 829 bytes [emitted] [immutable] [hmr] (name: main) 1 related asset
                  asset main.e3f7fd38a7ceaef37a48.hot-update.json 52 bytes [emitted] [immutable] [hmr]
                assets by path js/*.js 4.66 MiB
                  asset js/main.698c5fc6.js 4.63 MiB [emitted] [immutable] [big] (name: main) 1 related asset
                  asset js/src_comp_contCard_vue.12b453cd.js 31 KiB [emitted] [immutable] 1 related asset
                asset index.html 407 bytes [emitted]
              Entrypoint main [big] 4.63 MiB (6.17 MiB) = js/main.698c5fc6.js 4.63 MiB main.e3f7fd38a7ceaef37a48.hot-update.js 829 bytes 7 auxiliary assets
              cached modules 4.34 MiB (javascript) 1020 KiB (asset) [cached] 261 modules
              runtime modules 34.3 KiB 18 modules
              javascript modules 13 KiB
                ./src/comp/contCard.vue 1.18 KiB [built]
                ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/comp/contCard.vue?vue&type=template&id=078f5459&scoped=true& 2.96 KiB [built] [code generated]
                ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/comp/contCard.vue?vue&type=script&lang=js& 1.4 KiB [built] [code generated]
                ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/comp/contCard.vue?vue&type=style&index=0&id=078f5459&lang=less&scoped=true& 7.46 KiB [built] [code generated]`
            },
            {
                id: 2,
                category: "生活间",
                time: 1629363063149,
                title: "测试文章2",
                viewNum: 3600,
                comtNum: 20,
                likeNum: 45,
                starNum: 66,
                interview:
                    "我是文章2的简介，更随便",
                image: "https://tse1-mm.cn.bing.net/th/id/R-C.12de6ac2ded4070c85daeef0012eb91e?rik=CAlV0BsSLxU4yw&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2f2b18302ec4edb821dd5a9f63b521cbc457747772.jpg&ehk=wugmBe5%2bvx60gQz9LOjzmleUDi0YzVh0JtlcxMlq%2fSY%3d&risl=&pid=ImgRaw&r=0",
                content: "我是文章内容，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小"
            },
            {
                id: 3,
                category: "工作间",
                time: 1629363063149,
                title: "测试文章3",
                viewNum: 3600,
                comtNum: 20,
                likeNum: 45,
                starNum: 66,
                interview:
                    "我是文章3的简介，也是随便",
                image: "https://tse1-mm.cn.bing.net/th/id/R-C.12de6ac2ded4070c85daeef0012eb91e?rik=CAlV0BsSLxU4yw&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2f2b18302ec4edb821dd5a9f63b521cbc457747772.jpg&ehk=wugmBe5%2bvx60gQz9LOjzmleUDi0YzVh0JtlcxMlq%2fSY%3d&risl=&pid=ImgRaw&r=0",
                content: "我是文章内容，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小，添加performance字段提高文件限制大小添加performance字段提高文件限制大小添加performance字段提高文件限制大小"
            },
            {
                id: 4,
                category: "杂评区",
                time: 1629363063149,
                title: "嗑学（测试文章4）",
                viewNum: 3600,
                comtNum: 20,
                likeNum: 45,
                starNum: 66,
                interview:
                    "我是文章4的简介，很正经，嗑学怎么能不端正态度",
                image: "",
                content: `这里应该出现文章内容。<b>觉得应该想个法子适应html不然我怎么大谈嗑学。</b>
                `
            }
        ],
        bus: new Vue(),
    },
    getters: {
        live: (state) => state.articles.filter(v => v.category === '生活间'),
        work: (state) => state.articles.filter(v => v.category === '工作间'),
        other: (state) => state.articles.filter(v => v.category === '杂评区'),
        sortByView: (state) => {
            let t = state.articles;
            t.sort((a, b) => b.viewNum - a.viewNum);
            return t;
        },
    },
    mutations: {
    },
    actions: {

    }
})