<template>
  <div
    class="w-96 h-9 bg-light/30 focus-within:bg-light/40 px-2 py-1 rounded-lg flex items-center justify-between gap-2 transition-all"
  >
    <!-- icon -->
    <base-icon name="magnify-solid" class="w-4 fill-primary/60"></base-icon>

    <!-- input -->
    <input
      type="text"
      placeholder="جستجو"
      class="w-full text-primary bg-[#ffffff00] caret-primary text-sm placeholder:text-primary/60"
    />
  </div>
</template>

<script>
export default {
  name: "AppSearchbox",
};
</script>
