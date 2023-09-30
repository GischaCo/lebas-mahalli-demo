<template>
  <nuxt-link :to="to" class="w-full">
    <div
      class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all"
    >
      <base-icon :name="icon" class="w-4 fill-neutral-500"></base-icon>
      <span class="text-sm text-neutral-500">
        <slot></slot>
      </span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "HeaderMenuItem",
};
</script>

<script setup>
// props
const props = defineProps({
  to: {
    type: String,
    required: true,
    default: "/",
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>
