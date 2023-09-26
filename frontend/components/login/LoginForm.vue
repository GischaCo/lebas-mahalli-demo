<template>
  <form class="w-full flex flex-col items-start justify-start gap-4">
    <!-- mobile -->
    <base-input
      type="number"
      name="mobile-number"
      placeholder="مثال: 09112345678"
      required
      >شماره موبایل</base-input
    >

    <!-- password -->
    <base-input type="password" name="password" required>رمز ورود</base-input>

    <!-- forget password -->
    <p class="text-sm text-neutral-600">
      در صورت فراموشی رمز عبور،
      <nuxt-link
        to="/auth/forget-password"
        class="text-primary hover:text-accent transition-all"
        >کلیک کنید</nuxt-link
      >.
    </p>

    <!-- button -->
    <button
      class="w-full h-12 text-white bg-gradient-to-r from-primary to-accent disabled:brightness-75 disabled:cursor-not-allowed rounded-lg hover:shadow-lg transition-all"
    >
      ورود
    </button>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
};
</script>
