<template>
  <div>
    <div
      v-for="product in products"
      :key="product._id"
      class="w-48 bg-gradient-to-tr from-primary to-accent flex flex-col items-start justify-start gap-2 rounded-lg"
    >
      <img
        class="w-full"
        :src="`${$config.imagePrefix}/${product._id}/main.png`"
        :alt="product.title"
      />
      <h3 class="font-bold text-lg">{{ product.title }}</h3>
      <p>{{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllProducts",
};
</script>

<script setup>
import { useStore, computed, onMounted } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// computed
const products = computed(() => {
  return store.getters["products/allProducts"];
});

// lifecycles
onMounted(() => {
  // fetch all products on first mount
  store.dispatch("products/getAllProducts");
});
</script>
