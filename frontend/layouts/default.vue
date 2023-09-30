<template>
  <div
    class="relative min-h-screen flex flex-col items-center justify-between gap-4"
  >
    <div class="w-full">
      <app-header></app-header>

      <main>
        <nuxt />
      </main>
    </div>

    <app-footer class="self-end"></app-footer>

    <base-snackbar v-if="$store.state.app.snackbar"></base-snackbar>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<script setup>
import { useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// fetch app data on first load
store.dispatch("auth/userProfile"); // => user details
store.dispatch("categories/getCategories"); // => categories
</script>
