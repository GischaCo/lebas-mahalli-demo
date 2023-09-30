<template>
  <div class="w-full" v-if="store.state.panel.user !== null">
    <backward-link></backward-link>

    <panel-container>
      <nuxt-child></nuxt-child>
    </panel-container>
  </div>

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
  if (!store.state.auth.authorized) {
    if (route.name === "panel") {
      router.push("/auth/login");
      store.dispatch("panel/showSnackbar", {
        status: 400,
        message: "لطفا ابتدا وارد حساب کاربری خود شوید",
      });
    }
  }
});
</script>
