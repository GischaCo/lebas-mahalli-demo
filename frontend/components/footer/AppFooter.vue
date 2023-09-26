<template>
  <footer class="w-full bg-light/20">
    <!-- sections -->
    <div class="w-full py-6 px-12 flex items-start justify-evenly">
      <!-- quick access -->
      <footer-section title="دسترسی سریع">
        <footer-section-link
          v-for="link in quickAccessLinks"
          :key="link.path"
          :to="link.path"
          >{{ link.title }}</footer-section-link
        >
      </footer-section>

      <!-- categories -->
      <footer-section title="دسته‌بندی ها">
        <footer-section-link to="/products/all"
          >همه محصولات</footer-section-link
        >
        <footer-section-link
          v-for="category in parentCategories"
          :key="category._idh"
          :to="`/products${category.path}`"
          >{{ category.title }}</footer-section-link
        >
      </footer-section>

      <!-- about -->
      <footer-section title="درباره ما">
        <footer-section-text>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد
        </footer-section-text>
      </footer-section>

      <!-- contact -->
      <footer-section title="ارتباط با ما">
        <footer-section-text
          >جهت دریافت اطلاعات بیشتر، سفارش محصول، سفارش عمده و هرگونه هماهنگی،
          با ما در ارتباط باشید</footer-section-text
        >

        <!-- phone -->
        <footer-section-link href="tel:+989114579853">
          <base-icon
            name="phone-flip-solid"
            class="w-3.5 fill-neutral-600 group-hover:fill-primary transition-all"
          ></base-icon>
          <span>09114579853</span>
        </footer-section-link>

        <!-- email -->
        <footer-section-link href="mailto:tahmineh.amoei1@gmail.com">
          <base-icon
            name="envelope-solid"
            class="w-3.5 fill-neutral-600 group-hover:fill-primary transition-all"
          ></base-icon>
          <span>tahmineh.amoei1@gmail.com</span>
        </footer-section-link>

        <!-- instagram -->
        <footer-section-link href="https://instagram.com/lebasmahalli_donya">
          <base-icon
            name="instagram"
            class="w-3.5 fill-neutral-600 group-hover:fill-primary transition-all"
          ></base-icon>
          <span>lebasmahalli_donya</span>
        </footer-section-link>

        <!-- telegram -->
        <footer-section-link href="https://t.me/donya_handcrafts">
          <base-icon
            name="telegram"
            class="w-3.5 fill-neutral-600 group-hover:fill-primary transition-all"
          ></base-icon>
          <span>donya_handcrafts</span>
        </footer-section-link>
      </footer-section>
    </div>

    <!-- copyright -->
    <div class="w-full p-1 bg-light/40">
      <p class="text-sm text-center text-primary">
        &copy; کلیه حقوق مادی و معنوی این وبسایت متعلق به فروشگاه پوشاک و صنایع
        دستی دنیا است.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<script setup>
import { ref, computed, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const quickAccessLinks = ref([
  {
    title: "مقالات",
    path: "/blogs",
  },
  {
    title: "حساب کاربری",
    path: "/panel",
  },
  {
    title: "دسته‌بندی ها",
    path: "/categories",
  },
  {
    title: "پرفروش‌ترین ها",
    path: "/products/popular",
  },
]);

// computed
const parentCategories = computed(() => {
  return store.getters["categories/parentCategories"];
});
</script>
