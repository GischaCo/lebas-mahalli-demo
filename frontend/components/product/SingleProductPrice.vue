<template>
  <p v-if="salePrice === 0" class="text-2xl text-primary">
    <strong>{{ price }} تومان</strong>
  </p>
  <div v-else>
    <div class="flex items-center justify-start gap-3">
      <p class="text-2xl text-primary">
        <strong>{{ salePrice }} تومان</strong>
      </p>
      <div class="px-3 py-0.5 bg-light/60 rounded">
        <p class="text-sm text-primary">{{ salePercent }}%</p>
      </div>
    </div>
    <p class="text-sm text-neutral-400 line-through">{{ price }} تومان</p>
  </div>
</template>

<script>
export default {
  name: "SingleProductPrice",
};
</script>

<script setup>
import { computed } from "@nuxtjs/composition-api";

// props
const props = defineProps({
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  salePrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

// computed
const salePercent = computed(() => {
  const totalPrice = props.price;
  const salePrice = props.salePrice;
  const unit = totalPrice / 100;
  const offPercent = salePrice / unit;
  const salePercent = 100 - offPercent;
  return Math.ceil(salePercent);
});
</script>
