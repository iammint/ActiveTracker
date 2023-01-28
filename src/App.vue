<template>
  <div v-if="appReady" class="min-h-full box-border">
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navigation from "./components/Navigation.vue"
import store from "./store"
import { supabase } from "./supabase/init"
import { ref } from "vue"

const appReady = ref(null)

// 检查user是否登录
const user = supabase.auth.user()

// 如果user不存在，appReady为true
if (!user) {
  appReady.value = true
}

// auth状态改变时运行
supabase.auth.onAuthStateChange((_, session) => {
  store.commit("setUser", session)
  appReady.value = true
})
</script>
