import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Create from "../views/Create.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import ViewWorkout from "../views/ViewWorkout.vue"
import { supabase } from "../supabase/init"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首页",
      auth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "注册",
      auth: false,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: "创建",
      auth: true,
    },
  },
  {
    path: "/view-workout/:workoutId",
    name: "View-Workout",
    component: ViewWorkout,
    meta: {
      title: "查看记录",
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 通过路由守卫改变title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 我爱运动`
  }
  next()
})

// 对于auth路由的守卫
// 因为即使未登录，输入/create路径也能跳转
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if (to.matched.some((res) => res.meta.auth)) {
    // if (to.meta.auth === true) {
    if (user) {
      next()
      return
    }
    next({ name: "Login" })
    return
  }
  next()
})

export default router
