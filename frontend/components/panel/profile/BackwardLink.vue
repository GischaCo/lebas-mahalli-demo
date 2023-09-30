<template>
  <div class="w-full mb-4">
    <nuxt-link to="/" class="flex items-center justify-start gap-2">
      <base-icon
        class="w-3.5 fill-neutral-500"
        name="arrow-right-solid"
      ></base-icon>
      <base-icon class="w-3.5 fill-neutral-500" name="house-solid"></base-icon>
      <span class="text-neutral-500">بازگشت به صفحه اصلی</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "ProfilebackwardLink",
};
</script>
