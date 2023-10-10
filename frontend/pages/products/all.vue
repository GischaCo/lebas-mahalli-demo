<template>
  <!-- <section class="w-full flex items-start justify-start gap-6 flex-wrap"> -->
  <section
    class="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
  >
    <template v-if="products.length">
      <product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></product-card>
      <product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></product-card>
      <product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></product-card>
      <product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></product-card>
      <product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></product-card>
      <product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></product-card>
      <product-card
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></product-card>
    </template>

    <p v-else class="text-center font-bold text-secondary">
      در حال دریافت لیست محصولات
    </p>
  </section>
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
