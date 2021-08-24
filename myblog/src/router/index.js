import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        // * 和 / 不同！

        path: '/',
        redirect: { name: "index" },
        // redirect: { name: "editor" },
    },
    {
        path: '/index',
        name: "index",
        component: (resolve) => require(['@/page/index'], resolve),
        meta: { requiresAuth: false, title: '首页o(*￣▽￣*)ブ', toTop: false }
    },
    {
        path: '/article',
        name: "article",
        component: (resolve) => require(['@/page/article'], resolve),
        meta: { requiresAuth: false, title: '文章详情_(:з)∠)_', toTop: true }
    },
    {
        path: '/share',
        name: 'share',
        component: (resolve) => require(['@/page/share'], resolve),
        meta: { requiresAuth: false, title: '小世界(￣▽￣)"', toTop: true }
    },
    {
        path: '/remark',
        name: 'remark',
        component: (resolve) => require(['@/page/remark'], resolve),
        meta: { requiresAuth: false, title: '畅所欲言(￣▽￣)"', toTop: true }
    },
    {
        path: '/about',
        name: 'about',
        component: (resolve) => require(['@/page/about'], resolve),
        meta: { requiresAuth: false, title: '关于我=w=', toTop: true }
    },
    {
        path: '/login',
        name: 'register',
        component: (resolve) => require(['@/page/login'], resolve),
        meta: { requiresAuth: false, title: '欢迎(づ￣ 3￣)づ', toTop: true }
    },
    {
        path: '/editor',
        name: 'editor',
        component: (resolve) => require(['@/page/editor'], resolve),
        meta: { requiresAuth: false, title: '欢迎(づ￣ 3￣)づ', toTop: true }
    },

]

const routerConfig = {
    // mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return { x: 0, y: 0 };
        if (to.meta.toTop) {
            if (savedPosition) {
                return savedPosition
            } else {
                let top = 630;
                if (window.innerWidth <= 768) top = 150;
                return { x: 0, y: top, behavior: 'smooth', }
            }
        }
    }
}

let router = new VueRouter(routerConfig);
router.beforeEach((to, from, next) => {
    if (to.meta.title) document.title = to.meta.title;
    else document.title = "Sleep…………zzz";
    next();
})


export default router;