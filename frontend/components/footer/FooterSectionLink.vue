<template>
  <component v-bind="linkProps">
    <span
      class="text-sm text-neutral-600 flex items-center justify-start gap-2 hover:text-primary transition-all group"
    >
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  name: "FooterSectionLnk",
};
</script>

<script setup>
import { computed } from "@nuxtjs/composition-api";

// props
const props = defineProps({
  to: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
});

//  computed
const linkProps = computed(() => {
  const { to, href } = props;
  if (to?.length) {
    return {
      is: "nuxt-link",
      to,
    };
  } else if (href?.length) {
    return {
      is: "a",
      href,
    };
  } else {
    return { is: "div" };
  }
});
</script>
