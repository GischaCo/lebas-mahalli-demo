<template>
  <div class="flex items-center justify-start gap-2">
    <base-icon
      name="bag-shopping-solid"
      class="w-3.5 h-3.5 fill-neutral-500"
    ></base-icon>
    <p class="text-sm text-neutral-500">تعداد سفارشات تا کنون: {{ sales }}</p>
  </div>
</template>

<script>
export default {
  name: "SingleProductSales",
};
</script>

<script setup>
// props
defineProps({
  sales: {
    type: Number,
    required: true,
    default: 0,
  },
});
</script>
