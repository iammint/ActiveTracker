<template>
  <header class="bg-at-light-green text-white">
    <nav
      class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row"
    >
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/images/dumbbell-light.png" alt="" />
        <h1 class="text-lg">我爱运动</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ name: 'Home' }"
          >首页</router-link
        >
        <router-link
          v-if="!user"
          class="cursor-pointer"
          :to="{ name: 'Register' }"
          >注册</router-link
        >
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Create' }"
          >创建</router-link
        >
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }"
          >登录</router-link
        >
        <li @click="logout" v-if="user" class="cursor-pointer">退出</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue"
import store from "../store"
import { useRouter } from "vue-router"
import { supabase } from "../supabase/init"

const user = computed(() => store.state.user)
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push({ name: "Home" })
}
</script>
