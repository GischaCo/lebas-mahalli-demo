<template>
  <section class="w-full">
    <table
      v-if="comments.length"
      class="w-full bg-slate-50 rounded-xl overflow-hidden shadow-md"
    >
      <thead class="w-full">
        <tr class="w-full">
          <td><p class="text-sm md:text-base">ردیف</p></td>
          <td><p class="text-sm md:text-base">کاربر</p></td>
          <td><p class="text-sm md:text-base">موبایل</p></td>
          <td><p class="text-sm md:text-base">محصول</p></td>
          <td><p class="text-sm md:text-base">متن</p></td>
          <td><p class="text-sm md:text-base">لینک</p></td>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          class="w-full even:bg-slate-50 odd:bg-slate-200"
          v-for="(comment, i) in comments"
          :key="comment._id"
        >
          <td>
            <span>{{ i + 1 }}</span>
          </td>
          <td>
            <p class="text-overflow text-xs md:text-base font-bold">
              {{ comment.user.fullname }}
            </p>
          </td>
          <td>
            <p class="text-overflow text-xs md:text-base">
              {{ comment.user.phone }}
            </p>
          </td>
          <td>
            <p class="text-overflow text-sm md:text-base">
              {{ comment.product.title }}
            </p>
          </td>
          <td>
            <p class="text-overflow text-sm md:text-base">
              {{ comment.text }}
            </p>
          </td>
          <td>
            <nuxt-link :to="`/products/${comment.product.id}`">
              <span class="text-sm text-primary">مشاهده</span>
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="text-secondary text-center mt-12">
      در حال حاضر هیچ دیدگاهی وجود ندارد
    </p>
  </section>
</template>

<script>
export default {
  name: "AdminAllComments",
};
</script>

<script setup>
import { useStore, computed, onMounted } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// computed
const comments = computed(() => {
  return store.getters["admin/allComments"];
});

// methods
const getComments = () => {
  store.dispatch("admin/getComments");
};

// lifecycles
onMounted(() => {
  // fetch all comments on first mount
  if (store.getters["admin/allComments"].length === 0) getComments();
});
</script>

<style scoped>
td {
  padding: 0.5rem 0.4rem;
}
.text-overflow {
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}
</style>
