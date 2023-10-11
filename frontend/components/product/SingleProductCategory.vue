<template>
  <!-- category -->
  <p class="text-sm text-primary">
    در دسته‌بندی
    <strong class="[word-spacing:4px]">{{ categoryTitle(category) }}</strong>
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

  if (identifiedCategory.isParent) {
    // if the category is parent itself, return its name
    return identifiedCategory.title;
  } else {
    // if the category isn't parent itself, return both title and parent-title
    const parentCategory = categories.value.find(
      (category) => category._id === identifiedCategory.parent
    );
    const parentTitle = parentCategory.title;

    return `${parentTitle} > ${identifiedCategory.title}`;
  }
};
</script>
