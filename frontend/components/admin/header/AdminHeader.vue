<template>
  <header>
    <div class="w-full flex items-center justify-between px-4 md:px-6 py-2">
      <nuxt-link to="/" class="flex items-center justify-start gap-4">
        <!-- logo -->
        <app-logo class="w-10"></app-logo>
        <!-- title -->
        <h1 class="text-primary font-bold text-xl">لباس محلی دنیا</h1>
      </nuxt-link>

      <nuxt-link
        to="/"
        class="rounded-lg border-primary flex items-center justify-center gap-2"
      >
        <span class="text-primary font-bold">صفحه اصلی</span>
        <base-icon
          name="arrow-left-solid"
          class="w-3.5 fill-primary"
        ></base-icon>
      </nuxt-link>
    </div>
  </header>
</template>
