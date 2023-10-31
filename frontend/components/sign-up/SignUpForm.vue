<template>
  <validation-observer class="w-full" v-slot="{ invalid }">
    <form
      @submit.prevent="submitForm"
      class="w-full flex flex-col items-start justify-start gap-2"
    >
      <!-- name -->
      <base-input
        type="text"
        name="fullname"
        :value="userInfo.fullname"
        @update:value="updateUserInfo('fullname', $event)"
        rules="required"
        >نام</base-input
      >

      <!-- mobile -->
      <base-input
        type="number"
        name="mobile-number"
        :value="userInfo.phone"
        placeholder="مثال: 09112345678"
        @update:value="updateUserInfo('phone', $event)"
        rules="required|mobile_min:11|mobile_max:11"
        >شماره موبایل</base-input
      >

      <div class="w-full flex items-start justify-center gap-2">
        <!-- password -->
        <base-input
          type="password"
          name="password"
          ref="password"
          vid="password"
          :value="userInfo.password"
          @update:value="updateUserInfo('password', $event)"
          rules="required|password:8"
          >رمز عبور</base-input
        >

        <!-- password confirm -->
        <base-input
          type="password"
          name="password-confirm"
          :value="passwordConfirm"
          @update:value="passwordConfirm = $event"
          rules="required|confirmed:password"
          data-vv-as="password"
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
          type="submit"
          :disabled="invalid"
          class="w-8/12 h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-secondary to-primary disabled:brightness-75 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg hover:shadow-lg transition-all"
        >
          <span class="text-white">ثبت‌نام</span>
          <base-icon
            v-if="loading"
            name="spinner-solid"
            class="w-4 h-4 fill-white animate-spin"
          ></base-icon>
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
  </validation-observer>
</template>

<script>
export default {
  name: "SignUpForm",
};
</script>

<script setup>
import { computed, ref, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const password = ref(null);
const passwordConfirm = ref("");
const userInfo = ref({
  fullname: "",
  phone: "",
  password: "",
});

// emits
const emit = defineEmits(["submitted"]);

// computed
const loading = computed(() => {
  return store.getters["app/loading"];
});

// methods
const updateUserInfo = (key, value) => {
  userInfo.value[key] = value;
};
const submitForm = () => {
  store.dispatch("app/setLoading", true);
  emit("submitted", userInfo.value);
};
</script>
