<template>
  <p class="text-neutral-500">{{ description }}</p>
</template>

<script>
export default {
  name: "SingleProductDescription",
};
</script>

<script setup>
// props
defineProps({
  description: {
    type: String,
    required: true,
    default: "",
  },
});
</script>
