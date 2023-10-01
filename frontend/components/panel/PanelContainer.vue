<template>
  <article
    class="w-full flex flex-col md:flex-row items-start justify-center gap-4"
  >
    <!-- side menu -->
    <section
      :class="[route.name === 'panel' ? 'w-full' : 'hidden md:block']"
      class="md:min-w-max lg:w-fit bg-gradient-to-tr from-primary to-pink-200 rounded-2xl shadow-xl"
    >
      <panel-menu></panel-menu>
    </section>

    <!-- body display -->
    <section
      v-if="route.name !== 'panel'"
      class="w-full lg:w-[42rem] p-5 border-[1px] border-neutral-300 rounded-2xl shadow-xl"
    >
      <slot></slot>
    </section>
  </article>
</template>

<script>
export default {
  name: "PanelContainer",
};
</script>

<script setup>
import { useRoute } from "@nuxtjs/composition-api";

// variables
const route = useRoute();
</script>
