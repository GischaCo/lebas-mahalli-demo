<template>
  <div class="min-h-screen flex flex-col items-center justify-between gap-4">
    <div class="w-full">
      <app-header></app-header>

      <main>
        <nuxt />
      </main>
    </div>

    <app-footer class="self-end"></app-footer>
  </div>
</template>
