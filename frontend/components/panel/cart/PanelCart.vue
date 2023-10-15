<template>
  <panel-child-container title="سبد خرید">
    <div class="w-full flex flex-col items-center justify-start gap-4">
      <!-- header -->
      <div class="w-full flex items-center justify-between gap-1">
        <!-- payment button -->
        <nuxt-link
          to="/"
          class="px-2 py-1.5 md:px-4 md:py-2 flex items-center justify-center gap-1 md:gap-2 border-2 border-primary rounded-md"
        >
          <base-icon
            name="plus-solid"
            class="w-3.5 h-3.5 fill-primary"
          ></base-icon>
          <span class="text-xs md:text-sm text-primary font-bold"
            >پرداخت و ثبت سفارش</span
          >
        </nuxt-link>

        <!-- total price -->
        <p class="text-xs md:text-sm text-primary font-bold">
          قابل پرداخت: {{ totalPrice }} تومان
        </p>
      </div>

      <table class="w-full shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-slate-100">
            <td class="px-0.5 py-3 text-xs">مشاهده</td>
            <td class="px-0.5 py-3 text-xs">نام محصول</td>
            <td class="px-0.5 py-3 text-xs">قیمت واحد</td>
            <td class="px-0.5 py-3 text-xs">تعداد</td>
            <td class="px-0.5 py-3 text-xs">قیمت کل</td>
            <td class="px-0.5 py-3 text-xs"></td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in cart"
            :key="i"
            class="w-full odd:bg-slate-50 even:bg-slate-100"
          >
            <td class="px-0.5 py-3 text-xs text-neutral-600">
              <p>{{ i + 1 }}</p>
            </td>
            <td class="px-0.5 py-3 text-xs text-neutral-600 font-bold">
              <p>{{ item.product.title }}</p>
            </td>
            <td class="px-0.5 py-3 text-xs text-neutral-600">
              <p>
                {{
                  item.product.salePrice === 0
                    ? item.product.price
                    : item.product.salePrice
                }}
              </p>
            </td>
            <td class="px-0.5 py-3 text-xs text-neutral-600">
              <p class="product-title">{{ item.qty }}</p>
            </td>
            <td class="px-0.5 py-3 text-xs text-neutral-600 font-bold">
              <p>{{ item.totalPrice }}</p>
            </td>
            <td class="px-0.5 py-3 text-xs text-red-500 font-bold">
              <p>حذف</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </panel-child-container>
</template>

<script>
export default {
  name: "PanelCartSection",
};
</script>

<script setup>
import { computed, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// computed
const cart = computed(() => {
  return store.state.panel.user.cart.reverse();
});
const totalPrice = computed(() => {
  let total = 0;
  for (let i = 0; i < cart.value.length; i++) {
    total += cart.value[i].totalPrice;
  }
  return total;
});
</script>

<style scoped>
.product-title {
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}
</style>
