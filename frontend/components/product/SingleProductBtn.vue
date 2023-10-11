<template>
  <button
    :disabled="!isAvailable"
    class="min-w-max px-6 h-12 text-white bg-blue-800 hover:bg-blue-600 rounded-md shadow-xl shadow-blue-100 hover:shadow-blue-200 disabled:hover:shadow-inherit disabled:bg-light disabled:cursor-not-allowed transition-all"
  >
    افزودن به سبد خرید
  </button>
</template>

<script>
export default {
  name: "SingleProductBtn",
};
</script>

<script setup>
// props
defineProps({
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
});
</script>
