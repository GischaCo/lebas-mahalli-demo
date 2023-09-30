<template>
  <div class="w-full p-6 flex flex-col items-start justify-center gap-3">
    <nuxt-link to="/" class="flex items-center justify-start gap-1.5">
      <base-icon
        name="arrow-right-solid"
        class="w-3 fill-neutral-600 ml-2"
      ></base-icon>
      <base-icon name="house-solid" class="w-3.5 fill-neutral-600"></base-icon>
      <span class="text-sm text-neutral-600">صفحه اصلی</span>
    </nuxt-link>

    <h1 class="text-xl font-bold text-primary">ورود به حساب کاربری</h1>

    <login-form @submitted="userLogin($event)"></login-form>
  </div>
</template>

<script>
export default {
  name: "AuthLoginPage",
  layout: "auth",
};
</script>

<script setup>
import { useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// methods
const userLogin = (userInfo) => {
  store.dispatch("auth/userLogin", userInfo);
};
</script>
