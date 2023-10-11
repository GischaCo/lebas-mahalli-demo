<template>
  <!-- category -->
  <p class="text-sm text-primary">
    در دسته‌بندی
    <strong>{{ categoryTitle(category) }}</strong>
  </p>
</template>

<script>
export default {
  name: "SingleProductCategory",
};
</script>

<script setup>
import { useStore, computed } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// props
const props = defineProps({
  category: {
    type: String,
    required: true,
    default: "",
  },
});

// computed
const categories = computed(() => {
  return store.getters["categories/allCategories"];
});

// methods
const categoryTitle = (id) => {
  const identifiedCategory = categories.value.find(
    (category) => category._id === id
  );
  return identifiedCategory.title;
};
</script>
