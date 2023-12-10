import { createRouter, createWebHistory } from "vue-router";
import { layoutMiddleware } from "../middlewares";

import {
    RT_HOME,
    MT_HOME,
    RT_AUTH,
    MT_AUTH,
    RT_NOTFOUND,
    MT_NOTFOUND,
} from "../constant/routes.js";
import { adminRoutes } from "./admin";

import Home from "../layouts/Home.vue";
import Auth from "../layouts/Auth.vue";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: "/",
            name: RT_HOME,
            component: Home,
            meta: {
                requiresAuth: true,
                title: MT_HOME,
            }
        },
        {
            path: "/auth",
            name: RT_AUTH,
            component: Auth,
            meta: {
                layout: "Auth",
                title: MT_AUTH,
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: RT_NOTFOUND,
            component: () => import("../layouts/404.vue"),
            meta: {
                title: MT_NOTFOUND,
            },
        },
        adminRoutes,
    ]
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("access_token");
    if (to.name !== "auth" && !token) {
        next({ name: "auth" });
    } else if (token && to.name === RT_AUTH) {
        next({ name: from.name });
    } else {
        next();
    }
});

router.beforeResolve(async (to, from) => {
    await layoutMiddleware(to);
    document.title = to.meta.title;
});

export default router;