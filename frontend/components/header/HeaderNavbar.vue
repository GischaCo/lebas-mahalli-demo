<template>
  <div class="w-full h-10 px-8 bg-light/20 flex items-center justify-start">
    <nav class="h-full flex items-center justify-start gap-4">
      <nuxt-link to="/products/all">
        <span class="text-primary">همه محصولات</span>
      </nuxt-link>

      <span class="w-0.5 h-1/2 bg-light rounded-2xl"></span>

      <!-- categories -->
      <header-navbar-item
        v-for="category in parentCategories"
        :key="category._id"
        :category="category"
      ></header-navbar-item>

      <span class="w-0.5 h-1/2 bg-light rounded-2xl"></span>

      <!-- cart -->
      <nuxt-link to="/panel/cart">
        <span class="text-primary">سبد خرید</span>
      </nuxt-link>

      <!-- blog -->
      <nuxt-link to="/blog">
        <span class="text-primary">مقالات</span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderNavbar",
};
</script>

<script setup>
import { computed, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// computed
const parentCategories = computed(() => {
  return store.getters["categories/parentCategories"];
});
</script>
