<template>
  <section class="w-full h-96 flex items-center justify-center">
    <validation-observer v-slot="{ invalid }">
      <div
        class="w-80 p-6 bg-slate-200 flex flex-col items-start justify-center gap-2 rounded-lg"
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
          class="w-full py-3 bg-gradient-to-tr from-secondary to-blue-700 text-white text-lg rounded-lg disabled:brightness-75 shadow-md hover:shadow-lg transition-all"
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
import { ref, useStore, computed } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const productId = ref("");

// computed
const inputIsEmpty = computed(() => {
  return productId.value.length === 0;
});

// methods
const updateId = (value) => {
  productId.value = value;
};
const deleteProduct = () => {
  store.dispatch("admin/deleteProduct", productId.value);
};
</script>
