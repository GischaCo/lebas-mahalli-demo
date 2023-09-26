<template>
  <footer-section title="دسترسی سریع">
    <footer-section-link
      v-for="link in quickAccessLinks"
      :key="link.path"
      :to="link.path"
      >{{ link.title }}</footer-section-link
    >
  </footer-section>
</template>

<script>
export default {
  name: "FooterQuickAccess",
};
</script>

<script setup>
import { ref } from "@nuxtjs/composition-api";

// variables
const quickAccessLinks = ref([
  {
    title: "مقالات",
    path: "/blogs",
  },
  {
    title: "حساب کاربری",
    path: "/panel",
  },
  {
    title: "دسته‌بندی ها",
    path: "/categories",
  },
  {
    title: "پرفروش‌ترین ها",
    path: "/products/popular",
  },
]);
</script>
