<template>
  <section class="w-full h-96 flex items-center justify-center">
    <validation-observer v-slot="{ invalid }">
      <div
        class="w-80 p-6 bg-slate-100 flex flex-col items-start justify-center gap-2 rounded-lg shadow"
      >
        <admin-input
          type="text"
          name="product-id"
          :value="productId"
          @update:value="updateId($event)"
          rules="required"
          >لطفا آیدی محصول جهت حذف آن را وارد کنید</admin-input
        >
        <button
          @click="deleteProduct"
          :disabled="invalid"
          class="w-full py-3 bg-slate-700 flex items-center justify-center gap-3 rounded-lg disabled:brightness-75 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
        >
          <span class="text-white text-lg">حذف</span>
          <base-icon
            v-if="loading"
            name="spinner-solid"
            class="w-4 h-4 fill-white animate-spin"
          ></base-icon>
        </button>
      </div>
    </validation-observer>
  </section>
</template>

<script>
export default {
  name: "AdminDeleteProduct",
};
</script>

<script setup>
import { computed, ref, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const productId = ref("");

// computed
const loading = computed(() => {
  return store.getters["app/loading"];
});

// methods
const updateId = (value) => {
  productId.value = value;
};
const deleteProduct = () => {
  store.dispatch("app/setLoading", true);
  store.dispatch("admin/deleteProduct", productId.value);
};
</script>
