<template>
  <component :is="icon"></component>
</template>

<script>
export default {
  name: "BaseIcon",
};
</script>

<script setup>
import { computed } from "@nuxtjs/composition-api";

// props
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: "",
  },
});

// computed
const icon = computed(() => {
  return require(`@/assets/svg/${props.name}.svg?inline`);
});
</script>
