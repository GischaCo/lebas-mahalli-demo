<template>
  <div class="w-full sm:max-w-lg mt-6 mx-auto">
    <div class="w-full p-4 bg-slate-200 rounded-xl mt-4">
      <validation-observer class="w-full" v-slot="{ invalid }">
        <form
          @submit.prevent="submitForm"
          class="w-full flex flex-col items-start justify-start gap-3"
        >
          <!-- title -->
          <h2 class="w-full text-lg text-secondary font-bold text-center">
            افزودن محصول
          </h2>

          <!-- main images -->
          <div class="w-full flex flex-col items-start gap-1">
            <span class="text-sm text-neutral-900 transition-all"
              >تصویر اصلی</span
            >

            <div class="w-full flex items-center justify-start gap-4">
              <add-product-image
                name="main"
                width="w-28 md:w-36"
                @upload-image="updateProductInfo('image', $event.data)"
              ></add-product-image>
            </div>
          </div>

          <!-- other images -->
          <div class="w-full flex flex-col items-start gap-1">
            <span class="text-sm text-neutral-900 transition-all"
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
          <admin-input
            type="text"
            name="title"
            :value="productInfo.title"
            @update:value="updateProductInfo('title', $event)"
            rules="required"
            >نام محصول</admin-input
          >

          <!-- description -->
          <label class="w-full flex flex-col items-start gap-1 group">
            <span
              class="text-sm text-neutral-900 group-focus-within:text-slate-600 transition-all"
              >توضیح کوتاه</span
            >
            <textarea
              class="w-full min-h-[8rem] max-h-[8rem] p-2 group-focus-within:ring-2 group-focus-within:ring-slate-300 rounded-lg transition-all"
              name="description"
              cols="30"
              rows="10"
              v-model="productInfo.description"
            ></textarea>
          </label>

          <!-- price -->
          <admin-input
            type="number"
            name="price"
            :value="productInfo.price"
            @update:value="updateProductInfo('price', $event)"
            rules="required"
            >قیمت محصول</admin-input
          >

          <!-- sale price -->
          <admin-input
            type="number"
            name="sale-price"
            :value="productInfo.salePrice"
            @update:value="updateProductInfo('salePrice', $event)"
            rules="required"
            >قیمت با تخفیف</admin-input
          >

          <!-- category -->
          <label class="w-full flex flex-col items-start gap-1 group">
            <span
              class="text-sm text-neutral-900 group-focus-within:text-slate-600 transition-all"
              >دسته‌بندی محصول</span
            >

            <select
              name="gender"
              class="w-full h-11 p-2 group-focus-within:ring-2 group-focus-within:ring-slate-300 rounded-lg transition-all"
              v-model="productInfo.category"
            >
              <option
                v-for="category in allCategories"
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
              <input
                type="radio"
                name="inventory"
                v-model="productInfo.available"
                :value="true"
                checked
              />
              <span>موجود</span>
            </label>
            <label class="flex items-center justify-start gap-1">
              <input
                type="radio"
                name="inventory"
                v-model="productInfo.available"
                :value="false"
              />
              <span>ناموجود</span>
            </label>
          </div>

          <!-- button -->
          <button
            type="submit"
            :disabled="invalid || !validCategory || !validDescription"
            class="w-full py-3 bg-gradient-to-tr from-secondary to-blue-700 text-white text-lg rounded-lg disabled:brightness-75 shadow-md hover:shadow-lg transition-all"
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
  images: [],
  category: "",
  available: true,
});

// methods
const updateProductInfo = (key, value) => {
  productInfo.value[key] = value;
};
const updateImages = (name, data) => {
  const newImage = { name, img: data };
  productInfo.value.images.push(newImage);
};
const submitForm = () => {
  const data = productInfo.value;
  store.dispatch("admin/addProduct", data);
};

// computed
const allCategories = computed(() => {
  return store.getters["categories/allCategories"];
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
