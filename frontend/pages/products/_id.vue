<template>
  <article class="w-full my-12">
    <section
      v-if="product !== null"
      class="w-full flex items-center justify-center gap-8"
    >
      <!-- images -->
      <div class="w-80 flex flex-col items-center justify-center gap-3.5">
        <!-- main image -->
        <div
          class="w-full h-80 bg-white flex items-center justify-center shadow-lg rounded-xl overflow-hidden"
        >
          <img
            class="w-auto max-h-full"
            :src="previewImage || $config.imagePrefix + product.image"
            :alt="product.title"
          />
        </div>

        <!-- images -->
        <div class="w-full flex items-center justify-between">
          <div
            v-for="image in product.images"
            @click="setPreviewImage($config.imagePrefix + image)"
            class="w-[4.5rem] h-[4.5rem] bg-white flex items-center justify-center shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
          >
            <img
              class="w-auto max-h-full"
              :src="$config.imagePrefix + image"
              :alt="product.title"
            />
          </div>
        </div>
      </div>

      <!-- details -->
      <span></span>
    </section>
  </article>
</template>

<script>
export default {
  name: "ProductPage",
};
</script>

<script setup>
import {
  useStore,
  useRoute,
  onMounted,
  computed,
  ref,
} from "@nuxtjs/composition-api";

// variables
const route = useRoute();
const store = useStore();
const previewImage = ref(null);

// computed
const categories = computed(() => {
  return store.getters["categories/allCategories"];
});
const product = computed(() => {
  return store.getters["products/product"];
});
const setPreviewImage = (img) => {
  previewImage.value = img;
};

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
const categoryTitle = (id) => {
  const identifiedCategory = categories.value.find(
    (category) => category._id === id
  );
  return identifiedCategory;
};

// lifecycles
onMounted(() => {
  fetchCategories();
  fetchProduct();
});
</script>
