<template>
  <button
    @click="addToCart"
    :disabled="!isAvailable"
    class="min-w-max px-3 h-10 md:px-6 md:h-12 text-sm md:text-base text-white bg-blue-800 hover:bg-blue-600 rounded-md shadow-xl shadow-blue-100 hover:shadow-blue-200 disabled:hover:shadow-inherit disabled:bg-light disabled:cursor-not-allowed transition-all"
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
// emit
const emit = defineEmits(["add-to-cart"]);

// props
defineProps({
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// method
const addToCart = () => {
  emit("add-to-cart");
};
</script>
