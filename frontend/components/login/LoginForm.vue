<template>
  <form
    @submit.prevent="submitForm"
    class="w-full flex flex-col items-start justify-start gap-3"
  >
    <!-- mobile -->
    <base-input
      type="number"
      name="mobile-number"
      placeholder="مثال: 09112345678"
      @update:value="updateUserInfo('phone', $event)"
      required
      >شماره موبایل</base-input
    >

    <!-- password -->
    <base-input
      type="password"
      name="password"
      @update:value="updateUserInfo('password', $event)"
      required
      >رمز عبور</base-input
    >

    <!-- forget password -->
    <p class="text-sm text-neutral-600">
      در صورت فراموشی رمز عبور،
      <nuxt-link
        to="/auth/forget-password"
        class="text-primary hover:text-accent transition-all"
        >کلیک کنید</nuxt-link
      >.
    </p>

    <!-- sign-up alert -->
    <p class="text-xs text-neutral-600">
      اگه تا حالا حساب کاربری نساختی، رو دکمه‌ی ثبت‌نام کلیک کن.
    </p>

    <div class="w-full flex items-center justify-between gap-2">
      <!-- login button -->
      <button
        class="w-8/12 h-12 text-white bg-gradient-to-r from-primary to-accent disabled:brightness-75 disabled:cursor-not-allowed rounded-lg hover:shadow-lg transition-all"
      >
        ورود
      </button>
      <!-- sign-up link -->
      <nuxt-link
        to="/auth/sign-up"
        class="w-4/12 h-12 text-primary flex items-center justify-center border-2 border-primary rounded-lg hover:shadow-lg transition-all"
      >
        <span class="text-primary">ثبت‌نام</span>
      </nuxt-link>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
};
</script>

<script setup>
import { ref } from "@nuxtjs/composition-api";

// variables
const userInfo = ref({
  phone: "",
  password: "",
});

// emits
const emit = defineEmits(["submitted"]);

// methods
const updateUserInfo = (key, value) => {
  userInfo.value[key] = value;
};

// submit form and send to parent component
const submitForm = () => {
  emit("submitted", userInfo.value);
};
</script>
