<template>
  <div
    class="w-full h-10 px-4 md:px-8 bg-light/20 flex items-center justify-start"
  >
    <nav class="h-full flex items-center justify-start gap-4">
      <!-- all products -->
      <nuxt-link to="/products/all">
        <span class="text-primary hidden md:block">همه محصولات</span>
        <span class="text-primary block md:hidden">فروشگاه</span>
      </nuxt-link>

      <!-- categories page -->
      <nuxt-link to="/categories" class="block md:hidden">
        <span class="text-primary">دسته‌بندی</span>
      </nuxt-link>

      <span class="w-0.5 h-1/2 bg-light rounded-2xl hidden md:block"></span>

      <!-- categories -->
      <div class="h-full hidden md:flex items-center justify-start gap-4">
        <header-navbar-item
          v-for="category in parentCategories"
          :key="category._id"
          :category="category"
        ></header-navbar-item>
      </div>

      <span class="w-0.5 h-1/2 bg-light rounded-2xl hidden md:block"></span>

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
