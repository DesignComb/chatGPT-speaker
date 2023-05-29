import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from 'vue-router'
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name:"Home",
        component: () => import("../views/home/index.vue"),
    },
    {
        path: "/404",
        name: "ErrorPage",
        component: () => import("../views/errorPages/index.vue"),
    },
]

// createRouter
const router = createRouter({
    // for github page
    history: createWebHistory(import.meta.env.MODE === 'production' ? '/chatGPT-speaker/' : ''),
    routes //Router List
})
export default router