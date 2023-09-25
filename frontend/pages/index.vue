<template>
  <h1>Index</h1>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<script setup>
import { useStore, onMounted } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// lifecycles
onMounted(() => {
  store.dispatch("categories/getCategories");
});
</script>
