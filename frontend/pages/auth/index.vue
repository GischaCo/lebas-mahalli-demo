<template>
  <div
    class="bg-white w-[22rem] md:w-[42rem] md:h-[26rem] rounded-3xl custom-shadow-1 flex flex-col md:flex-row justify-between overflow-hidden"
  >
    <!-- mobile -->
    <img
      class="w-full block md:hidden brightness-75"
      src="@/static/img/auth/banner-desktop.jpeg"
      alt="ثبت نام در فروشگاه لباس محلی دنیا"
    />

    <!-- desktop -->
    <img
      class="h-full hidden md:block brightness-75"
      src="@/static/img/auth/banner.jpeg"
      alt="ثبت نام در فروشگاه لباس محلی دنیا"
    />

    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: "AuthPage",
  layout: "auth",
};
</script>

<script setup>
import {
  useStore,
  useRoute,
  useRouter,
  onMounted,
} from "@nuxtjs/composition-api";

// variables
const store = useStore();
const route = useRoute();
const router = useRouter();

// onMlifecycles
onMounted(() => {
  if (store.state.panel.authenticated) {
    router.push("/panel");
  } else {
    if (route.value.name === "auth") {
      router.push("/auth/login");
    }
  }
});
</script>
