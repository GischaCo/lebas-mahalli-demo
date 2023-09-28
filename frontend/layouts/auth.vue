<template>
  <div class="w-screen min-h-screen bg-light flex items-center justify-center">
    <main>
      <nuxt />
    </main>

    <base-snackbar v-if="$store.state.app.snackbar"></base-snackbar>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>
