<template>
  <article
    class="w-full mt-6 flex flex-col items-center justify-start gap-10 md:gap-14"
  >
    <admin-actions-section
      v-for="action in actions"
      :key="action.title"
      v-bind="action"
    ></admin-actions-section>
  </article>
</template>

<script>
export default {
  name: "AdminActions",
};
</script>

<script setup>
import { ref } from "@nuxtjs/composition-api";

// variables
const actions = ref([
  {
    title: "محصولات",
    links: [
      {
        title: "لیست محصولات",
        to: "/admin/products/all",
      },
      {
        title: "افزودن محصول",
        to: "/admin/products/add",
      },
      {
        title: "ویرایش محصول",
        to: "/admin/products/edit",
      },
      {
        title: "حذف محصول",
        to: "/admin/products/delete",
      },
    ],
  },
  {
    title: "مقالات",
    links: [
      {
        title: "لیست مقالات",
        to: "/admin/all-blogs",
      },
      {
        title: "افزودن مقاله",
        to: "/admin/add-blog",
      },
      {
        title: "ویرایش مقاله",
        to: "/admin/edit-blog",
      },
      {
        title: "حذف مقاله",
        to: "/admin/delete-blog",
      },
    ],
  },
  {
    title: "متفرقه",
    links: [
      {
        title: "لیست کاربران",
        to: "/admin/users",
      },
      {
        title: "لیست سفارشات",
        to: "/admin/all-orders",
      },
      {
        title: "لیست نظرات",
        to: "/admin/comments",
      },
    ],
  },
]);
</script>
