<template>
  <div class="w-full max-w-lg mt-6 mx-auto">
    <h2 class="text-lg text-primary font-bold text-center">افزودن محصول</h2>

    <div
      v-if="product"
      class="w-full p-4 border-2 border-primary rounded-xl mt-4"
    >
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
                :value="`${$config.imagePrefix}/${product._id}/main.png`"
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
                :value="
                  `${$config.imagePrefix}/${product._id}/images/first.png` || ''
                "
                @upload-image="updateImages($event.name, $event.data)"
              ></add-product-image>
              <!-- second -->
              <add-product-image
                name="second"
                :value="
                  `${$config.imagePrefix}/${product._id}/images/second.png` ||
                  ''
                "
                @upload-image="updateImages($event.name, $event.data)"
              ></add-product-image>
              <!-- third -->
              <add-product-image
                name="third"
                :value="
                  `${$config.imagePrefix}/${product._id}/images/third.png` || ''
                "
                @upload-image="updateImages($event.name, $event.data)"
              ></add-product-image>
              <!-- fourth -->
              <add-product-image
                name="fourth"
                :value="
                  `${$config.imagePrefix}/${product._id}/images/fourth.png` ||
                  ''
                "
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
            class="w-full py-3 bg-gradient-to-tr from-primary to-accent text-white text-lg rounded-lg disabled:brightness-75 shadow-md hover:shadow-lg transition-all"
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
  name: "AdminEditProductPage",
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
  image: "",
  images: {},
  category: "",
  available: true,
});

// computed
const categories = computed(() => {
  return store.getters["categories/allCategories"];
});
const product = computed(() => {
  return store.getters["admin/singleProduct"](productId.value);
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
const updateImages = (key, value) => {
  productInfo.value.images[key] = value;
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
  }
};
const fetchProducts = () => {
  // fetch the products
  store.dispatch("admin/getProducts");
};
const fetchCategories = () => {
  store.dispatch("categories/getCategories");
};
const submitForm = () => {
  const data = productInfo.value;
  store.dispatch("admin/updateProduct", { id: productId.value, data });
};

// lifecycles
onMounted(() => {
  // check if the url has query including a product's id
  checkRouteQuery();

  // fetch requirements
  fetchProducts();
  fetchCategories();

  // get product's data
});

watch(
  () => product.value,
  (value) => {
    productInfo.value = value;
  }
);
</script>
