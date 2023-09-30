<template>
  <div class="w-full flex flex-col items-start justify-start gap-5">
    <!-- backward button -->
    <nuxt-link
      to="/panel"
      class="md:hidden pl-3 py-2 flex items-center justify-center gap-1.5"
    >
      <base-icon
        class="w-3 fill-neutral-400"
        name="arrow-right-solid"
      ></base-icon>
      <span class="text-sm text-neutral-400">بازگشت به منو</span>
    </nuxt-link>

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
