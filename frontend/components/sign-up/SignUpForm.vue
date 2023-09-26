<template>
  <form class="w-full flex flex-col items-start justify-start gap-2">
    <!-- name -->
    <base-input type="text" name="fullname" required>اسم قشنگت</base-input>

    <!-- mobile -->
    <base-input
      type="number"
      name="mobile-number"
      placeholder="مثال: 09112345678"
      required
      >شماره موبایل</base-input
    >

    <div class="w-full flex items-center justify-center gap-2">
      <!-- password -->
      <base-input type="password" name="password" required>رمز عبور</base-input>

      <!-- password confirm -->
      <base-input type="password" name="password-confirm" required
        >تکرار رمز عبور</base-input
      >
    </div>

    <!-- sign-up alert -->
    <p class="text-xs text-neutral-600">
      اگه قبلا حساب کاربری ساختی، رو دکمه‌ی ورود کلیک کن.
    </p>

    <div class="w-full flex items-center justify-between gap-2">
      <!-- sign-up button -->
      <button
        class="w-8/12 h-12 text-white bg-gradient-to-r from-primary to-accent disabled:brightness-75 disabled:cursor-not-allowed rounded-lg hover:shadow-lg transition-all"
      >
        ثبت‌نام
      </button>
      <!-- login link -->
      <nuxt-link
        to="/auth/login"
        class="w-4/12 h-12 text-primary flex items-center justify-center border-2 border-primary rounded-lg hover:shadow-lg transition-all"
      >
        <span class="text-primary">ورود</span>
      </nuxt-link>
    </div>
  </form>
</template>

<script>
export default {
  name: "SignUpForm",
};
</script>
