<template>
  <footer class="w-full bg-light/20">
    <!-- sections -->
    <div
      class="w-full py-6 px-12 flex flex-col md:flex-row items-start justify-evenly gap-8 md:gap-0"
    >
      <!-- quick access -->
      <footer-quick-access></footer-quick-access>

      <!-- categories -->
      <footer-categories></footer-categories>

      <!-- about -->
      <footer-about-us></footer-about-us>

      <!-- contact -->
      <footer-contact-us></footer-contact-us>
    </div>

    <!-- copyright -->
    <footer-copyright></footer-copyright>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
