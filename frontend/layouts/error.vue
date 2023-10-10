<template>
  <div class="flex flex-col md:flex-row items-center justify-center gap-3">
    <div
      v-if="error.statusCode === 404"
      class="flex flex-col items-center justify-center gap-2"
    >
      <h1 class="text-primary text-3xl font-bold">صفحه مورد نظر یافت نشد!</h1>
      <nuxt-link to="/" class="flex items-center justify-center gap-1">
        <base-icon name="house-solid" class="w-3.5 fill-secondary"></base-icon>
        <p class="text-secondary">برگشت به صفحه‌اصلی</p>
      </nuxt-link>
    </div>

    <h1 v-else class="text-primary text-xl font-bold">{{ error.message }}</h1>

    <img
      src="../static/img/public/obsessed-man.png"
      class="w-56"
      alt="error occured"
    />
  </div>
</template>

<script>
export default {
  name: "ErrorLayout",
  layout: "empty",
};
</script>

<script setup>
// props
defineProps({
  error: {
    type: Object,
  },
});
</script>
