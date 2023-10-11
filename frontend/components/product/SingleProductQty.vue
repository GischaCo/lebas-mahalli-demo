<template>
  <div
    v-if="isAvailable"
    class="h-10 md:h-12 flex items-center justify-start rounded-md bg-zinc-100 overflow-hidden"
  >
    <!-- inscrease -->
    <button
      class="w-10 md:w-12 h-full flex items-center justify-center hover:bg-light/60 cursor-pointer transition-all duration-300"
    >
      <span class="text-xl text-blue-800 font-bold">+</span>
    </button>
    <!-- qty -->
    <div class="w-10 md:w-12 h-full flex items-center justify-center">
      <span class="text-base md:text-lg text-slate-800 font-bold">1</span>
    </div>
    <!-- descrease -->
    <button
      disabled
      class="w-10 md:w-12 h-full flex items-center justify-center hover:bg-light/60 disabled:hover:bg-inherit cursor-pointer disabled:cursor-default transition-all duration-300 group"
    >
      <span class="text-xl text-blue-800 font-bold group-disabled:text-light"
        >-</span
      >
    </button>
  </div>
  <!-- not exist -->
  <p v-else class="text-blue-500">در حال حاضر این کالا در انبار موجود نیست!</p>
</template>

<script>
export default {
  name: "SingleProductQty",
};
</script>

<script setup>
// props
defineProps({
  isAvailable: {
    type: Boolean,
    required: true,
    deafult: true,
  },
});
</script>
