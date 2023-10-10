<template>
  <nuxt-link
    :to="`/products/${product._id}`"
    class="relative w-full h-full p-3 bg-slate-100 flex flex-col items-start justify-between gap-2 rounded-lg shadow-md hover:shadow transition-all group"
  >
    <!-- sale alart -->
    <div
      v-if="product.salePrice !== 0"
      class="absolute -left-4 -top-4 w-12 h-12 flex items-center justify-center rounded-full bg-primary shadow-lg -rotate-12 group-hover:scale-110 transition-all z-30"
    >
      <span class="text-white">ویژه!</span>
    </div>

    <div class="flex flex-col items-start justify-start gap-2">
      <!-- image -->
      <div
        class="w-full bg-white flex items-center justify-center rounded-lg overflow-hidden"
      >
        <img
          :src="$config.imagePrefix + product.image"
          :alt="product.title"
          class="w-auto max-h-full"
        />
      </div>

      <!-- title -->
      <h3 class="text-primary">
        <strong>{{ product.title }}</strong>
      </h3>
    </div>

    <div class="flex flex-col items-start justify-start gap-2">
      <!-- price -->
      <p v-if="product.salePrice === 0" class="flex items-center gap-1">
        <span>{{ product.price }}</span>
        <span>تومان</span>
      </p>

      <!-- sale price -->
      <div v-else class="flex flex-wrap items-center justify-start gap-2">
        <p
          class="text-xs text-neutral-400 flex items-center gap-1 line-through"
        >
          <span>{{ product.price }}</span>
          <span>تومان</span>
        </p>
        <p class="flex items-center gap-1">
          <span>{{ product.salePrice }}</span>
          <span>تومان</span>
        </p>
      </div>

      <!-- comments & sales -->
      <div class="flex items-center justify-start gap-6">
        <!-- comments -->
        <div class="flex items-center justify-start gap-2">
          <base-icon
            name="comments-solid"
            class="w-4 h-4 fill-neutral-500"
          ></base-icon>
          <span class="text-sm text-neutral-500">
            {{ product.comments.length }}
          </span>
        </div>

        <!-- sales -->
        <div class="flex items-center justify-start gap-2">
          <base-icon
            name="bag-shopping-solid"
            class="w-4 h-4 fill-neutral-500"
          ></base-icon>
          <span class="text-sm text-neutral-500">
            {{ product.sales }} خرید
          </span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "ProductCard",
};
</script>

<script setup>
// props
defineProps({
  product: {
    type: Object,
    required: true,
    default: function () {
      return {};
    },
  },
});
</script>
