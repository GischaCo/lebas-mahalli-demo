<template>
  <div class="w-full max-w-lg mt-6 mx-auto">
    <h2 class="text-lg text-primary font-bold text-center">افزودن محصول</h2>

    <div class="w-full p-4 border-2 border-primary rounded-xl mt-4">
      <validation-observer class="w-full" v-slot="{ invalid }">
        <form
          @submit.prevent="submitForm"
          class="w-full flex flex-col items-start justify-start gap-3"
        >
          <!-- main images -->
          <div class="w-full flex flex-col items-start gap-1">
            <span class="text-sm text-neutral-500 transition-all"
              >تصویر اصلی</span
            >

            <div class="w-full flex items-center justify-start gap-4">
              <!-- first -->
              <add-product-image
                name="main"
                width="w-28 md:w-36"
                @upload-image="updateProductInfo('image', $event.data)"
              ></add-product-image>
            </div>
          </div>

          <!-- other images -->
          <div class="w-full flex flex-col items-start gap-1">
            <span class="text-sm text-neutral-500 transition-all"
              >دیگر تصاویر</span
            >

            <div class="w-full flex items-center justify-start gap-2.5">
              <!-- first -->
              <add-product-image
                name="first"
                @upload-image="updateImages($event.name, $event.data)"
              ></add-product-image>
              <!-- second -->
              <add-product-image
                name="second"
                @upload-image="updateImages($event.name, $event.data)"
              ></add-product-image>
              <!-- third -->
              <add-product-image
                name="third"
                @upload-image="updateImages($event.name, $event.data)"
              ></add-product-image>
              <!-- fourth -->
              <add-product-image
                name="fourth"
                @upload-image="updateImages($event.name, $event.data)"
              ></add-product-image>
            </div>
          </div>

          <!-- title -->
          <base-input
            type="text"
            name="title"
            :value="productInfo.title"
            @update:value="updateProductInfo('title', $event)"
            rules="required"
            >نام محصول</base-input
          >

          <!-- description -->
          <label class="w-full flex flex-col items-start gap-1 group">
            <span
              class="text-sm text-neutral-500 group-focus-within:text-primary transition-all"
              >توضیح کوتاه</span
            >
            <textarea
              class="w-full min-h-[8rem] max-h-[8rem] p-2 border-[1px] border-neutral-500 group-focus-within:border-primary rounded-lg transition-all"
              name="description"
              cols="30"
              rows="10"
              v-model="productInfo.description"
            ></textarea>
          </label>

          <!-- price -->
          <base-input
            type="number"
            name="price"
            :value="productInfo.price"
            @update:value="updateProductInfo('price', $event)"
            rules="required"
            >قیمت محصول</base-input
          >

          <!-- sale price -->
          <base-input
            type="number"
            name="sale-price"
            :value="productInfo.salePrice"
            @update:value="updateProductInfo('salePrice', $event)"
            rules="required"
            >قیمت با تخفیف</base-input
          >

          <!-- category -->
          <label class="w-full flex flex-col items-start gap-1 group">
            <span
              class="text-sm text-neutral-500 group-focus-within:text-primary transition-all"
              >دسته‌بندی محصول</span
            >

            <select
              name="gender"
              class="w-full h-11 p-2 border-[1px] border-neutral-500 group-focus-within:border-primary rounded-lg transition-all"
              v-model="productInfo.category"
            >
              <option
                v-for="category in childCategories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.title }}
              </option>
            </select>
          </label>

          <!-- inventory -->
          <div class="w-full flex items-center justify-start gap-8">
            <label class="flex items-center justify-start gap-1">
              <input type="radio" name="inventory" :value="true" checked />
              <span>موجود</span>
            </label>
            <label class="flex items-center justify-start gap-1">
              <input type="radio" name="inventory" :value="false" />
              <span>ناموجود</span>
            </label>
          </div>

          <!-- button -->
          <button
            type="submit"
            :disabled="invalid || !validCategory || !validDescription"
            class="w-full py-3 bg-gradient-to-tr from-primary to-accent text-white text-lg rounded-lg disabled:brightness-75 shadow-md hover:shadow-lg transition-all"
          >
            افزودن
          </button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminAddProduct",
};
</script>

<script setup>
import { ref, computed, useStore, onMounted } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const productInfo = ref({
  title: "",
  description: "",
  price: "",
  salePrice: "",
  image: "",
  images: {},
  category: "",
  available: "",
});

// methods
const updateProductInfo = (key, value) => {
  productInfo.value[key] = value;
};
const updateImages = (key, value) => {
  productInfo.value.images[key] = value;
};
const submitForm = () => {
  const data = productInfo.value;
  store.dispatch("admin/addProduct", data);
};

// computed
const childCategories = computed(() => {
  return store.getters["categories/childCategories"];
});
const validCategory = computed(() => {
  return !!productInfo.value.category.length;
});
const validDescription = computed(() => {
  return !!productInfo.value.description.length;
});

// lifecycles
onMounted(() => {
  store.dispatch("categories/getCategories");
});
</script>
