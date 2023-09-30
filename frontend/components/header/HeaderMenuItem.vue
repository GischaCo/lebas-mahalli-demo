<template>
  <div class="w-full" @click="clickHandler">
    <nuxt-link
      :to="to"
      class="w-full py-1.5 flex items-center justify-start gap-2 hover:-translate-x-0.5 transition-all"
    >
      <base-icon :name="icon" class="w-4 fill-neutral-500"></base-icon>
      <span class="text-sm text-neutral-500">
        <slot></slot>
      </span>
    </nuxt-link>
  </div>
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

// emit
const emit = defineEmits(["close-menu"]);

// methods
const clickHandler = () => {
  emit("close-menu");
};
</script>
