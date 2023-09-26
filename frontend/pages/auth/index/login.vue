<template>
  <div class="w-full p-6 flex flex-col items-start justify-center gap-3">
    <h1 class="text-xl font-bold text-primary">ورود به حساب کاربری</h1>

    <login-form></login-form>
  </div>
</template>

<script>
export default {
  name: "AuthLoginPage",
  layout: "auth",
};
</script>
