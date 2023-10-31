<template>
  <button
    @click="addToCart"
    :disabled="!isAvailable"
    class="min-w-max px-3 h-10 md:px-6 md:h-12 bg-blue-800 hover:bg-blue-600 flex items-center justify-center gap-3 rounded-md shadow-xl shadow-blue-100 hover:shadow-blue-200 disabled:shadow-none disabled:hover:shadow-none disabled:bg-light disabled:cursor-not-allowed transition-all"
  >
    <span class="text-sm md:text-base text-white">افزودن به سبد خرید</span>
    <base-icon
      v-if="loading"
      name="spinner-solid"
      class="w-4 h-4 fill-white animate-spin"
    ></base-icon>
  </button>
</template>

<script>
export default {
  name: "SingleProductBtn",
};
</script>

<script setup>
import { useStore, computed } from "@nuxtjs/composition-api";

// variables
const store = useStore();

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

// computed
const loading = computed(() => {
  return store.getters["app/loading"];
});

// method
const addToCart = () => {
  emit("add-to-cart");
};
</script>
