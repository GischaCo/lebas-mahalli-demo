<template>
  <section class="w-full">
    <!-- title -->
    <div class="w-full flex items-center justify-center gap-2">
      <span class="w-full h-[1px] bg-primary"></span>
      <h2 class="text-lg text-primary font-bold">{{ title }}</h2>
      <span class="w-full h-[1px] bg-primary"></span>
    </div>

    <!-- links -->
    <div class="mt-2.5 flex items-center justify-center gap-4 flex-wrap">
      <!-- link -->
      <div
        v-for="(link, i) in links"
        :key="i"
        class="w-2/5 md:w-auto md:flex-1 h-16 border-2 border-primary rounded-lg"
      >
        <nuxt-link
          :to="link.to"
          class="w-full h-full flex items-center justify-center"
        >
          <span class="text-primary">{{ link.title }}</span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AdminActionsSection",
};
</script>

<script setup>
// props
defineProps({
  title: {
    type: String,
    required: true,
    default: "عملیات",
  },
  links: {
    type: Array,
    required: true,
    default: function () {
      return [];
    },
  },
});
</script>
