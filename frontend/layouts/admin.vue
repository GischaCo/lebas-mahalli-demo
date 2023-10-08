<template>
  <div
    class="relative min-h-screen flex flex-col items-center justify-between gap-4"
  >
    <div class="w-full">
      <admin-header></admin-header>

      <main class="w-full px-4 mx-auto my-6">
        <nuxt />
      </main>
    </div>

    <base-snackbar v-if="$store.state.app.snackbar"></base-snackbar>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
};
</script>

<script setup>
import { onMounted, useRouter, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const router = useRouter();

// fetch app data on first load
store.dispatch("auth/userProfile"); // => user details

onMounted(() => {
  if (store.state.auth.authorized) {
    if (store.state.panel.user.role !== "admin") router.push("/");
  }
});
</script>
