<template>
  <div class="w-full">
    <nuxt-link
      :to="to"
      class="w-full px-3 h-12 flex items-center justify-start gap-3 hover:bg-white/20 rounded-lg transition-all"
    >
      <base-icon :name="icon" class="w-4 fill-white"></base-icon>
      <slot></slot>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "PanelMenuItem",
};
</script>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
    default: "/",
  },
  icon: {
    type: String,
    required: true,
    default: "user-regular",
  },
});
</script>

<style scoped>
.nuxt-link-active {
  background-color: #ffffff20;
}
</style>
