<template>
  <header class="w-full">
    <div class="w-full flex items-center justify-between px-4 md:px-6 py-2">
      <div class="flex items-center justify-start gap-4">
        <!-- logo -->
        <app-logo class="w-10"></app-logo>

        <!-- title -->
        <h1 class="text-primary font-bold text-xl">لباس محلی دنیا</h1>

        <!-- searchbox -->
        <!-- <header-searchbox></header-searchbox> -->
      </div>

      <header-menu></header-menu>
    </div>
    <header-navbar></header-navbar>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
