<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Login -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">登录</h1>
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">邮箱</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green"
          >密码</label
        >
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <button
        @click="login"
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        登录
      </button>

      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }">
        没有账号？ <span class="text-at-light-green">注册</span>
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase/init";
// 注册完后跳转到登录页面
import { useRouter } from "vue-router";

const email = ref("gmg417903@gmail.com");
const password = ref("admin123");
const errorMsg = ref(null);

const router = useRouter();

const login = async () => {
  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push({ name: "Home" });
  } catch (error) {
    errorMsg.value = `错误： ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>
