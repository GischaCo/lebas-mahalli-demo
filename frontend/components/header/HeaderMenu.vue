<template>
  <div class="relative">
    <!-- button -->
    <button
      @click="toggleMenu"
      class="px-4 py-2 rounded-lg bg-primary flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
    >
      <template v-if="!isMenuOpened">
        <span class="text-white">حساب کاربری</span>
        <base-icon name="user-solid" class="w-3.5 fill-white"></base-icon>
      </template>
      <span v-else class="text-white">بستن</span>
    </button>

    <!-- menu -->
    <div
      v-if="isMenuOpened"
      class="absolute left-0 w-48 bg-white shadow-lg rounded-2xl z-40"
    >
      <nav class="w-full p-4 flex flex-col items-center justify-start gap-1">
        <!-- panel -->
        <nuxt-link to="/panel" class="w-full">
          <div
            class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all"
          >
            <base-icon
              name="user-regular"
              class="w-4 fill-neutral-500"
            ></base-icon>
            <span class="text-sm text-neutral-500">حساب کاربری</span>
          </div>
        </nuxt-link>

        <!-- cart -->
        <nuxt-link to="/panel/cart" class="w-full">
          <div
            class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all"
          >
            <base-icon
              name="bag-shopping-solid"
              class="w-4 fill-neutral-500"
            ></base-icon>
            <span class="text-sm text-neutral-500">سبد خرید</span>
          </div>
        </nuxt-link>

        <!-- wallet -->
        <nuxt-link to="/panel/wallet" class="w-full">
          <div
            class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all"
          >
            <base-icon
              name="wallet-solid"
              class="w-4 fill-neutral-500"
            ></base-icon>
            <span class="text-sm text-neutral-500">کیف پول</span>
          </div>
        </nuxt-link>

        <!-- purchases -->
        <nuxt-link to="/panel/purchases" class="w-full">
          <div
            class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all"
          >
            <base-icon
              name="rotate-left-solid"
              class="w-4 fill-neutral-500"
            ></base-icon>
            <span class="text-sm text-neutral-500">سفارشات</span>
          </div>
        </nuxt-link>

        <!-- logout -->
        <div
          class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all"
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
import { ref } from "@nuxtjs/composition-api";

// variables
const isMenuOpened = ref(false);

// methods
const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value;
};
</script>
