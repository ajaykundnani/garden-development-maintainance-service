// Dynamic Routing
import { createWebHistory, createRouter } from "vue-router";

const App = () =>
    import(/* webpackChunkName: "3420.js" */ "./src/App.vue");
    const Login = () =>
    import(/* webpackChunkName: "3420.js" */ "./src/login-component.vue");

const UserDashboard = () =>
    import(
        /* webpackChunkName: "6030.js" */ "./src/components/UserDashboard/user-dashboard"
    );


import { loginStore } from "./piniaStore";
const isGuest = (to, from, next) => {
    const login_store = loginStore();
    if (!login_store.token) {
        next();
        return;
    }
    if (login_store.token) {
        next("/");
        return;
    }
};
const isLogin = (to, from, next) => {
    const login_store = loginStore();
    if (login_store.token) {
        next();
        return;
    } else {
        next("/login");
        return;
    }
};
// const isAdmin = (to, from, next) => {
//     const login_store = loginStore();
//     if (!login_store.token) {
//         next("/login");
//     } else if (login_store.token && login_store.user_code == 1005) {
//         next();
//         return;
//     } else if (
//         (login_store.token && login_store.user_code == 1001) ||
//         login_store.user_code == 1003
//     ) {
//         next();
//         return;
//     } else if (login_store.token && login_store.user_code == 1000) {
//         next("/");
//         return;
//     } else {
//         next("/my-profile");
//         return;
//     }
// };
// const isSuperAdmin = (to, from, next) => {
//     const login = loginStore();
//     login.setPage(200);
//     if (isLogin && login.user_code == 1000) {
//         next();
//         return;
//     }
//     if (!login.token) {
//         next("/login");
//     }
//     next("/company-admin");
//     return;
// };
// const page_not_found = (to, from, next) => {
//     const login = loginStore();
//     login.setPage(404);
//     next();
//     return;
// };
const routes = [
    {
        path: "/dashboard",
        name: "user-dashboard",
        component: UserDashboard,
        beforeEnter: isLogin,

    },
    {
        path:"/login",
        name:'login',
        component:Login,
        beforeEnter: isGuest,
    },
    {
        path: "/",
        name: "App",
        component: App,
        beforeEnter: isLogin,
    },
    // {
    //     path: "/dw-history",
    //     name: "DW History",
    //     component: DWHistoryComponent,
    //     beforeEnter: isSuperAdmin,
    // },
    
    // { path: "/:pathMatch(.*)*", redirect: "/404" },
    // {
    //     path: "/404",
    //     name: "PageNotFound",
    //     component: AppComponent,
    //     beforeEnter: page_not_found,
    // },
];
const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes,
    linkActiveClass: "nested-active", // active class for non-exact links.
    linkExactActiveClass: "nested-active",
});


export default router;
