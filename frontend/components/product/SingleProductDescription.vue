<template>
  <p class="text-sm md:text-base text-neutral-500 whitespace-pre-line">
    {{ description }}
  </p>
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
