<template>
  <article
    class="w-full min-h-screen flex flex-col items-center justify-between"
  >
    <app-header></app-header>
    <section class="w-full my-12 flex items-center justify-center">
      <nuxt />
    </section>
    <app-footer></app-footer>
  </article>
</template>

<script>
export default {
  name: "EmptyLayout",
};
</script>
