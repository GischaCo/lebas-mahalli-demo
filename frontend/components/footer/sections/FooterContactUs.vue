<template>
  <footer-section title="ارتباط با ما">
    <footer-section-text
      >جهت دریافت اطلاعات بیشتر، سفارش محصول، سفارش عمده و هرگونه هماهنگی، با ما
      در ارتباط باشید</footer-section-text
    >

    <!-- links -->
    <footer-section-link
      v-for="(link, i) in contactLinks"
      :key="i"
      :href="link.href"
    >
      <base-icon
        :name="link.icon"
        class="w-3.5 fill-neutral-600 group-hover:fill-primary transition-all"
      ></base-icon>
      {{ link.title }}
    </footer-section-link>
  </footer-section>
</template>

<script>
export default {
  name: "FooterContactUs",
};
</script>

<script setup>
import { ref } from "@nuxtjs/composition-api";

// variables
const contactLinks = ref([
  {
    title: "09114579853",
    href: "tel:+989114579853",
    icon: "phone-flip-solid",
  },
  {
    title: "tahmineh.amoei1@gmail.com",
    href: "mailto:tahmineh.amoei1@gmail.com",
    icon: "envelope-solid",
  },
  {
    title: "lebasmahalli_donya",
    href: "https://instagram.com/lebasmahalli_donya",
    icon: "instagram",
  },
  {
    title: "donya_handcrafts",
    href: "https://t.me/donya_handcrafts",
    icon: "telegram",
  },
]);
</script>
