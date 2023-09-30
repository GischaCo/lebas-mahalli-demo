<template>
  <panel-container v-if="store.state.panel.user !== null">
    <nuxt-child></nuxt-child>
  </panel-container>

  <p v-else class="w-full text-center text-primary font-bold text-xl">
    لطفا صبر کنید
  </p>
</template>

<script>
export default {
  name: "PanelPage",
};
</script>

<script setup>
import {
  useStore,
  onMounted,
  useRoute,
  useRouter,
} from "@nuxtjs/composition-api";

// variables
const store = useStore();
const route = useRoute();
const router = useRouter();

// lifecycles
onMounted(() => {
  if (store.state.auth.authorized) {
    router.push("/panel/profile");
  } else {
    if (route.value.name === "auth") {
      router.push("/auth/login");
      store.dispatch("panel/showSnackbar", {
        status: 400,
        message: "لطفا ابتدا وارد حساب کاربری خود شوید",
      });
    }
  }
});
</script>
