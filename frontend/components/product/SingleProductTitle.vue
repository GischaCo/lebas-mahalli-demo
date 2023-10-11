<template>
  <h1 class="mt-2 text-xl md:text-3xl text-secondary font-bold">{{ title }}</h1>
</template>

<script>
export default {
  name: "SingleProductTitle",
};
</script>

<script setup>
// props
defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});
</script>
