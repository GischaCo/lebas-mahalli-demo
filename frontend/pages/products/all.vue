<template>
  <section
    v-if="products.length"
    class="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
  >
    <product-card
      v-for="product in products"
      :key="product._id"
      :product="product"
    ></product-card>
  </section>

  <!-- loading -->
  <div v-else class="w-full my-12 flex items-center justify-center">
    <app-loading></app-loading>
  </div>
</template>

<script>
export default {
  name: "AllProductsPage",
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
