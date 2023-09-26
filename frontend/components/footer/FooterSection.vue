<template>
  <div class="max-w-[24rem]">
    <h3 class="text-primary font-bold mb-2">{{ title }}</h3>
    <div class="flex flex-col items-start justify-start gap-1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: "بخش فوتر",
  },
});
</script>
