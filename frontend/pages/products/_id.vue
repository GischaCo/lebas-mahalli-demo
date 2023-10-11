<template>
  <article class="w-full my-12">
    <section
      v-if="product !== null"
      class="w-full flex flex-col md:flex-row items-center justify-center gap-16"
    >
      <!-- images -->
      <div class="w-72 flex flex-col items-center justify-center gap-4">
        <!-- main image -->
        <div
          class="w-72 h-72 bg-white flex items-center justify-center shadow-lg rounded-xl overflow-hidden"
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
            class="w-16 h-16 bg-white flex items-center justify-center shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
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
      <div class="w-96 flex flex-col items-start justify-between gap-4">
        <div>
          <!-- category -->
          <p class="text-sm text-primary">
            در دسته‌بندی
            <strong>{{ categoryTitle(product.category) }}</strong>
          </p>

          <!-- title -->
          <h1 class="text-3xl text-secondary font-bold">{{ product.title }}</h1>
        </div>

        <!-- description -->
        <p class="text-neutral-500">{{ product.description }}</p>

        <!-- price -->
        <p v-if="product.salePrice === 0" class="text-2xl text-primary">
          <strong>{{ product.price }} تومان</strong>
        </p>
        <div v-else>
          <div class="flex items-center justify-start gap-3">
            <p class="text-2xl text-primary">
              <strong>{{ product.salePrice }} تومان</strong>
            </p>
            <div class="px-3 py-0.5 bg-light/60 rounded">
              <p class="text-sm text-primary">{{ salePercent }}%</p>
            </div>
          </div>
          <p class="text-sm text-neutral-400 line-through">
            {{ product.price }} تومان
          </p>
        </div>

        <!-- sales -->
        <div class="flex items-center justify-start gap-2">
          <base-icon
            name="bag-shopping-solid"
            class="w-3.5 h-3.5 fill-neutral-500"
          ></base-icon>
          <p class="text-sm text-neutral-500">
            تعداد سفارشات تا کنون: {{ product.sales }}
          </p>
        </div>

        <!-- buttons -->
        <div class="flex items-center justify-start gap-3">
          <button
            :disabled="!product.available"
            class="min-w-max px-6 h-12 text-white bg-blue-800 hover:bg-blue-600 rounded-md shadow-xl shadow-blue-100 hover:shadow-blue-200 disabled:hover:shadow-inherit disabled:bg-light disabled:cursor-not-allowed transition-all"
          >
            افزودن به سبد خرید
          </button>

          <div
            v-if="product.available"
            class="h-12 flex items-center justify-start rounded-md bg-zinc-100 overflow-hidden"
          >
            <!-- inscrease -->
            <button
              class="w-12 h-full flex items-center justify-center hover:bg-light/60 cursor-pointer transition-all duration-300"
            >
              <span class="text-xl text-blue-800 font-bold">+</span>
            </button>
            <!-- qty -->
            <div class="w-12 h-full flex items-center justify-center">
              <span class="text-lg text-slate-800 font-bold">1</span>
            </div>
            <!-- descrease -->
            <button
              disabled
              class="w-12 h-full flex items-center justify-center hover:bg-light/60 disabled:hover:bg-inherit cursor-pointer disabled:cursor-default transition-all duration-300 group"
            >
              <span
                class="text-xl text-blue-800 font-bold group-disabled:text-light"
                >-</span
              >
            </button>
          </div>
          <p v-else class="text-blue-500">
            در حال حاضر این کالا در انبار موجود نیست!
          </p>
        </div>
      </div>
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
const salePercent = computed(() => {
  const totalPrice = product.value.price;
  const salePrice = product.value.salePrice;
  const unit = totalPrice / 100;
  const offPercent = salePrice / unit;
  const salePercent = 100 - offPercent;
  return Math.ceil(salePercent);
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
const categoryTitle = (id) => {
  const identifiedCategory = categories.value.find(
    (category) => category._id === id
  );
  return identifiedCategory.title;
};

// lifecycles
onMounted(() => {
  fetchCategories();
  fetchProduct();
});
</script>
