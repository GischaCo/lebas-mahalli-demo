<template>
  <div class="w-full flex flex-col items-start justify-start gap-5">
    <!-- header -->
    <div class="w-full">
      <nuxt-link to="/" class="flex items-center justify-start gap-2">
        <base-icon
          class="w-3.5 fill-neutral-500"
          name="arrow-right-solid"
        ></base-icon>
        <base-icon
          class="w-3.5 fill-neutral-500"
          name="house-solid"
        ></base-icon>
        <span class="text-neutral-500">بازگشت به صفحه اصلی</span>
      </nuxt-link>
    </div>

    <!-- title -->
    <div class="flex items-center justify-start gap-2">
      <span class="w-8 h-2 bg-primary"></span>
      <h1 class="text-xl font-bold text-primary">{{ title }}</h1>
    </div>

    <!-- body -->
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelChildContainer",
};
</script>

<script setup>
// props
defineProps({
  title: {
    type: String,
    required: true,
    default: "صفحه",
  },
});
</script>
