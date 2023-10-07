<template>
  <div :class="[itemsJustify]" class="w-full flex items-center">
    <!-- add product -->
    <nuxt-link
      v-if="hasButton"
      :to="buttonPath"
      class="px-4 py-2 bg-secondary rounded-md flex items-center justify-center gap-2 hover:brightness-110 transition-all"
    >
      <base-icon :name="buttonIcon" class="w-4 h-4 fill-white"></base-icon>
      <span class="text-white">{{ buttonTitle }}</span>
    </nuxt-link>

    <!-- admin actions -->
    <nuxt-link
      to="/admin"
      class="px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:brightness-110 transition-all"
    >
      <span class="text-secondary">بازگشت به پنل ادمین</span>
      <base-icon
        name="arrow-left-solid"
        class="w-4 h-4 fill-secondary"
      ></base-icon>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "AdminHeaderButtons",
};
</script>

<script setup>
import { computed } from "@nuxtjs/composition-api";

// props
const props = defineProps({
  hasButton: {
    type: Boolean,
    default: false,
  },
  buttonTitle: {
    type: String,
    default: "",
  },
  buttonIcon: {
    type: String,
    default: "",
  },
  buttonPath: {
    type: String,
    default: "",
  },
});

// computed
const itemsJustify = computed(() => {
  return props.hasButton ? "justify-between" : "justify-end";
});
</script>
