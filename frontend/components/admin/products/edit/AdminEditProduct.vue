<template>
  <div class="w-full max-w-lg mt-6 mx-auto">
    <div
      v-if="product !== null"
      class="w-full p-4 bg-slate-200 rounded-xl mt-4 shadow"
    >
      <validation-observer class="w-full" v-slot="{ invalid }">
        <form
          @submit.prevent="submitForm"
          class="w-full flex flex-col items-start justify-start gap-3"
        >
          <!-- title -->
          <h2 class="w-full text-lg text-secondary font-bold text-center">
            ویرایش محصول
          </h2>

          <!-- divider -->
          <span class="w-full h-[1px] rounded-full bg-secondary"></span>

          <!-- main image -->
          <div class="w-full flex flex-col items-start gap-1">
            <span class="text-sm text-neutral-900 transition-all"
              >تصویر اصلی</span
            >

            <div
              class="w-24 h-24 bg-zinc-100 rounded-md flex items-center justify-center overflow-hidden"
            >
              <img
                class="w-auto max-h-full"
                :src="$config.imagePrefix + product.image"
                :alt="productInfo.title"
              />
            </div>
          </div>

          <!-- other images -->
          <div
            v-if="product.images.length"
            class="w-full flex flex-col items-start gap-1"
          >
            <span class="text-sm text-neutral-900 transition-all"
              >دیگر تصاویر</span
            >

            <div class="w-full flex items-center justify-start gap-4">
              <div
                v-for="(image, i) in product.images"
                :key="i"
                class="w-16 h-16 bg-zinc-100 rounded-md flex items-center justify-center overflow-hidden"
              >
                <img
                  class="w-auto max-h-full"
                  :src="$config.imagePrefix + image"
                  :alt="productInfo.title"
                />
              </div>
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
                v-for="category in categories"
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
            class="w-full py-3 bg-slate-700 text-white text-lg rounded-lg disabled:brightness-75 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            ثبت تغییرات
          </button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminEditProduct",
};
</script>

<script setup>
import {
  ref,
  watch,
  useStore,
  useRoute,
  useRouter,
  onMounted,
  computed,
} from "@nuxtjs/composition-api";

// variables
const store = useStore();
const route = useRoute();
const router = useRouter();
const productId = ref(route.value.query.id);
const productInfo = ref({
  title: "",
  description: "",
  price: "",
  salePrice: "",
  category: "",
  available: true,
});

// computed
const categories = computed(() => {
  return store.getters["categories/allCategories"];
});
const product = computed(() => {
  return store.getters["admin/singleProduct"];
});
const validCategory = computed(() => {
  return !!productInfo.value.category.length;
});
const validDescription = computed(() => {
  return !!productInfo.value.description.length;
});

// methods
const updateProductInfo = (key, value) => {
  productInfo.value[key] = value;
};
const checkRouteQuery = () => {
  if (productId.value === undefined) {
    // move to all products page
    router.push("/admin/products/all");
    // show snackbar
    store.dispatch("app/showSnackbar", {
      status: 400,
      message: "ابتدا یک محصول جهت ویرایش انتخاب کنید",
    });
  } else {
    // fetch product's data
    fetchProduct();
  }
};
const fetchProduct = () => {
  // fetch products data
  store.dispatch("admin/getProduct", productId.value);
};
const submitForm = () => {
  const data = productInfo.value;
  store.dispatch("admin/updateProduct", { id: productId.value, data });
};

// lifecycles
onMounted(() => {
  // check if the url has query including a product's id
  checkRouteQuery();
});

watch(
  () => product.value,
  (value) => {
    if (product.value !== null) {
      // remove image/images properties (won't be used while posting data)
      const { image, images, ...rest } = product.value;
      productInfo.value = rest;
    }
  }
);
</script>
