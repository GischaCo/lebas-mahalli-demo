<template>
  <div class="w-full px-2.5 py-4 flex flex-col items-start justify-start gap-1">
    <panel-menu-item to="/panel/profile" icon="user-solid">
      <h2 class="text-xl text-white font-bold">
        {{ userInfo.fullname }}
      </h2>
      <span class="text-sm text-white">({{ userInfo.phone }})</span>
    </panel-menu-item>

    <span class="w-10/12 mx-auto my-2 h-[1px] bg-light/60 rounded-full"></span>

    <panel-menu-item to="/panel/cart" icon="bag-shopping-solid">
      <p class="text-white">سبد خرید</p>
    </panel-menu-item>

    <panel-menu-item to="/panel/wallet" icon="wallet-solid">
      <p class="text-white">کیف پول</p>
    </panel-menu-item>

    <panel-menu-item to="/panel/purchases" icon="rotate-left-solid">
      <p class="text-white">سفارشات</p>
    </panel-menu-item>

    <panel-menu-item to="/panel/support" icon="phone-flip-solid">
      <p class="text-white">پشتیبانی</p>
    </panel-menu-item>
  </div>
</template>

<script>
export default {
  name: "PanelMenu",
};
</script>

<script setup>
import { useStore, computed } from "@nuxtjs/composition-api";

// variables
const store = useStore();

const userInfo = computed(() => {
  return store.getters["panel/userInfo"];
});
</script>
