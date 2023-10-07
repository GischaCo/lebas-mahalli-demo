<template>
  <section class="w-full">
    <table
      v-if="products.length"
      class="w-full bg-slate-50 rounded-xl overflow-hidden"
    >
      <thead class="w-full">
        <tr class="w-full">
          <td><p class="text-sm md:text-base">ردیف</p></td>
          <td><p class="text-sm md:text-base">تصویر</p></td>
          <td><p class="text-sm md:text-base">عنوان</p></td>
          <td><p class="text-sm md:text-base">قیمت</p></td>
          <td><p class="text-sm md:text-base">عملیات</p></td>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          class="w-full even:bg-slate-50 odd:bg-slate-200"
          v-for="(product, i) in products"
          :key="product._id"
        >
          <td>
            <span>{{ i + 1 }}</span>
          </td>
          <td>
            <nuxt-link :to="`/products/${product._id}`">
              <div
                class="w-12 h-12 rounded bg-zinc-100 flex items-center justify-center overflow-hidden"
              >
                <img
                  class="w-auto max-h-full"
                  :src="`${$config.imagePrefix}/${product.image}`"
                  :alt="product.title"
                />
              </div>
            </nuxt-link>
          </td>
          <td>
            <p class="product-title text-xs md:text-base font-bold">
              {{ product.title }}
            </p>
          </td>
          <td>
            <p class="product-title text-sm md:text-base">
              {{ product.price }}
            </p>
          </td>
          <td>
            <div class="flex items-center justify-start gap-3">
              <!-- edit -->
              <button
                title="ویرایش"
                @click="editProduct(product._id)"
                class="p-2 rounded bg-slate-700 shadow-md hover:shadow-lg transition-all"
              >
                <base-icon
                  class="w-3.5 h-3.5 fill-white"
                  name="pen-solid"
                ></base-icon>
              </button>
              <!-- delete -->
              <button
                title="حذف"
                @click="deleteProduct(product._id)"
                class="p-2 rounded bg-slate-700 shadow-md hover:shadow-lg transition-all"
              >
                <base-icon
                  class="w-3.5 h-3.5 fill-white"
                  name="trash-can-regular"
                ></base-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="text-red-500 text-center mt-12">
      در حال حاضر محصولی برای نمایش وجود ندارد
    </p>
  </section>
</template>

<script>
export default {
  name: "AdminAllProducts",
};
</script>

<script setup>
import {
  useStore,
  useRouter,
  computed,
  onMounted,
} from "@nuxtjs/composition-api";

// variables
const store = useStore();
const router = useRouter();

// computed
const products = computed(() => {
  return store.getters["admin/allProducts"];
});

// methods
const getProducts = () => {
  store.dispatch("admin/getProducts");
};
const editProduct = (productId) => {
  router.push(`/admin/products/edit?id=${productId}`);
};
const deleteProduct = (productId) => {
  store.dispatch("admin/deleteProduct", productId);
};

// lifecycles
onMounted(() => {
  // fetch all products on first mount
  if (store.getters["admin/allProducts"].length === 0) getProducts();
});
</script>

<style scoped>
td {
  padding: 0.5rem 0.4rem;
}
.product-title {
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}
</style>
