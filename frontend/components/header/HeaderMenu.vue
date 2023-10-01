<template>
  <div class="relative">
    <!-- login button -->
    <nuxt-link
      to="/auth/login"
      v-if="!isAuthorized"
      class="rounded-lg border-primary flex items-center justify-center gap-2"
    >
      <span class="text-primary">ثبت‌نام / ورود</span>
      <base-icon
        name="right-to-bracket-solid"
        class="w-4 fill-primary"
      ></base-icon>
    </nuxt-link>
    <!-- panel button -->
    <button
      v-else
      @click="toggleMenu"
      class="rounded-lg border-primary flex items-center justify-center gap-2"
    >
      <template v-if="!isMenuOpened">
        <span class="text-primary">حساب کاربری</span>
        <base-icon name="user-solid" class="w-3.5 fill-primary"></base-icon>
      </template>
      <span v-else class="text-primary">بستن</span>
    </button>

    <!-- menu -->
    <div
      v-if="isMenuOpened"
      class="absolute left-0 w-56 bg-white shadow-lg rounded-2xl z-40"
    >
      <nav class="w-full p-4 flex flex-col items-center justify-start gap-1">
        <!-- panel -->
        <header-menu-item
          to="/panel/profile"
          icon="user-regular"
          @close-menu="toggleMenu"
          >حساب کاربری ({{ store.state.panel.user.fullname }})</header-menu-item
        >

        <!-- admin panel -->
        <header-menu-item
          to="/admin"
          v-if="store.state.panel.user.role === 'admin'"
          icon="lock-solid"
          @close-menu="toggleMenu"
          >پنل مدیریت</header-menu-item
        >

        <!-- cart -->
        <header-menu-item
          to="/panel/cart"
          icon="bag-shopping-solid"
          @close-menu="toggleMenu"
          >سبد خرید</header-menu-item
        >

        <!-- wallet -->
        <header-menu-item
          to="/panel/wallet"
          icon="wallet-solid"
          @close-menu="toggleMenu"
          >کیف پول</header-menu-item
        >

        <!-- purchases -->
        <header-menu-item
          to="/panel/purchases"
          icon="rotate-left-solid"
          @close-menu="toggleMenu"
          >سفارشات</header-menu-item
        >

        <!-- logout -->
        <div
          @click="logout"
          class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all cursor-pointer"
        >
          <base-icon
            name="right-from-bracket-solid"
            class="w-4 fill-neutral-500"
          ></base-icon>
          <span class="text-sm text-neutral-500">خروج از حساب</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
};
</script>

<script setup>
import { ref, useStore, computed } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const isMenuOpened = ref(false);

// computed
const isAuthorized = computed(() => {
  return store.state.auth.authorized;
});

// methods
const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value;
};
const logout = () => {
  toggleMenu();
  store.dispatch("auth/userLogout");
};
</script>
