<template>
  <article class="w-full my-12">
    <section
      v-if="product !== null"
      class="w-full flex flex-col md:flex-row items-center justify-center gap-12"
    >
      <!-- images -->
      <single-product-images
        :title="product.title"
        :image="product.image"
        :images="product.images"
      ></single-product-images>

      <!-- details -->
      <div
        class="w-96 md:min-h-[23rem] flex flex-col items-start justify-between gap-2"
      >
        <div>
          <single-product-category
            :category="product.category"
          ></single-product-category>

          <!-- title -->
          <single-product-title :title="product.title"></single-product-title>
        </div>

        <div class="w-full flex flex-col items-start justify-between gap-3">
          <!-- description -->
          <single-product-description
            :description="product.description"
          ></single-product-description>

          <!-- sales -->
          <single-product-sales :sales="product.sales"></single-product-sales>

          <!-- price -->
          <single-product-price
            :price="product.price"
            :sale-price="product.salePrice"
          ></single-product-price>

          <!-- buttons -->
          <div class="flex items-center justify-start gap-3">
            <single-product-btn
              :is-available="product.available"
            ></single-product-btn>

            <single-product-qty
              :is-available="product.available"
            ></single-product-qty>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: "SingleProduct",
};
</script>

<script setup>
import {
  useStore,
  useRoute,
  onMounted,
  computed,
} from "@nuxtjs/composition-api";

// variables
const route = useRoute();
const store = useStore();

// computed
const product = computed(() => {
  return store.getters["products/product"];
});

// methods
const fetchCategories = () => {
  // fetch categories
  store.dispatch("categories/getCategories");
};
const fetchProduct = () => {
  // fetch product details by its id
  const productId = route.value.params.id;
  store.dispatch("products/getProduct", productId);
};

// lifecycles
onMounted(() => {
  fetchCategories();
  fetchProduct();
});
</script>
