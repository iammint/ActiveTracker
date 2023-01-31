import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "首页",
      auth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录",
      auth: false,
    },
    alias: "/",
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "注册",
      auth: false,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/Create.vue"),
    meta: {
      title: "创建",
      auth: true,
    },
  },
  {
    path: "/view-workout/:workoutId",
    name: "View-Workout",
    component: () => import("../views/ViewWorkout.vue"),
    meta: {
      title: "查看记录",
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 通过路由守卫改变title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 我爱运动`;
  }
  next();
});

// 对于auth路由的守卫
// 因为即使未登录，输入/create路径也能跳转
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  // if (to.matched.some((res) => res.meta.auth)) {
  if (to.meta.auth === true) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;
