<template>
  <section class="w-full h-96 flex items-center justify-center">
    <div class="w-80 flex flex-col items-start justify-center gap-2">
      <p class="text-primary text-lg">
        لطفا آیدی محصول جهت حذف آن را وارد کنید
      </p>
      <input
        v-model="productId"
        class="w-full h-12 p-2 rounded-md border-2 border-accent focus:ring-4 focus:ring-light transition-all"
      />
      <button
        @click="deleteProduct"
        :disabled="inputIsEmpty"
        class="w-full h-12 rounded-md text-white bg-primary disabled:brightness-75"
      >
        حذف
      </button>
    </div>
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
const deleteProduct = () => {
  store.dispatch("admin/deleteProduct", productId.value);
};
</script>
