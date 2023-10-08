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
          class="w-full py-3 bg-slate-700 text-white text-lg rounded-lg disabled:brightness-75 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
        >
          حذف
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
import { ref, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const productId = ref("");

// methods
const updateId = (value) => {
  productId.value = value;
};
const deleteProduct = () => {
  store.dispatch("admin/deleteProduct", productId.value);
};
</script>
