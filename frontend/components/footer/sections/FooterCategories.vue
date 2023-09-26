<template>
  <footer-section title="دسته‌بندی ها">
    <footer-section-link to="/products/all">همه محصولات</footer-section-link>
    <footer-section-link
      v-for="category in parentCategories"
      :key="category._idh"
      :to="`/products${category.path}`"
      >{{ category.title }}</footer-section-link
    >
  </footer-section>
</template>

<script>
export default {
  name: "FooterCategories",
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
