<template>
  <div class="w-full" v-if="store.state.panel.user !== null">
    <backward-link></backward-link>

    <panel-container>
      <nuxt-child></nuxt-child>
    </panel-container>
  </div>

  <!-- loading -->
  <div v-else class="w-full my-12 flex items-center justify-center">
    <app-loading></app-loading>
  </div>
</template>

<script>
export default {
  name: "PanelPage",
};
</script>

<script setup>
import { useStore, onMounted, useRouter } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const router = useRouter();

// lifecycles
onMounted(() => {
  if (
    !store.state.auth.authorized &&
    localStorage.getItem("userAuthTOKEN") === null
  ) {
    router.push("/auth/login");
    store.dispatch("app/setSnackbar", {
      status: 400,
      message: "لطفا ابتدا وارد حساب کاربری خود شوید",
    });
  }
});
</script>
