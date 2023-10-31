<template>
  <section class="w-full">
    <!-- comments data table -->
    <!-- <table
      v-if="comments !== null && comments.length"
      class="w-full bg-slate-50 rounded-xl overflow-hidden shadow-md"
    >
      <thead class="w-full">
        <tr class="w-full">
          <td><p class="text-sm md:text-base">ردیف</p></td>
          <td><p class="text-sm md:text-base">کاربر</p></td>
          <td><p class="text-sm md:text-base">موبایل</p></td>
          <td><p class="text-sm md:text-base">محصول</p></td>
          <td><p class="text-sm md:text-base">متن</p></td>
          <td><p class="text-sm md:text-base">تاریخ</p></td>
          <td><p class="text-sm md:text-base">حذف</p></td>
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
            <nuxt-link :to="`/products/${comment.product.id}`">
              <p class="text-overflow text-sm md:text-base text-primary">
                {{ comment.text }}
              </p>
            </nuxt-link>
          </td>
          <td>
            <p class="text-xs md:text-base">
              {{ $moment(comment.createdAt).format("jYYYY/jM/jDD") }}
            </p>
          </td>
          <td>
            <button
              title="حذف"
              @click="deleteComment(comment.product.id)"
              class="p-1.5 md:p-2 rounded bg-slate-700 shadow-md hover:shadow-lg transition-all"
            >
              <base-icon
                class="w-3 h-3 md:w-3.5 md:h-3.5 fill-white"
                name="trash-can-regular"
              ></base-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table> -->

    <div
      v-if="comments !== null && comments.length"
      class="w-full flex flex-col items-center justify-start gap-2"
    >
      <div v-for="comment in comments" :key="comment._id" class="w-full">
        <nuxt-link
          :to="`/products/${comment.product.id}`"
          class="w-full p-3 bg-slate-50 flex flex-col items-start justify-start gap-2 rounded-xl shadow hover:shadow-none transition-all"
        >
          <!-- header -->
          <div class="w-full flex items-center justify-start gap-3">
            <h3 class="text-base text-primary font-bold">
              {{ comment.user.fullname }}
            </h3>
            <p class="text-xs md:text-sm text-slate-400">
              آیدی: {{ comment.user.id }}
            </p>
          </div>

          <!-- divider -->
          <span class="w-full h-[1px] rounded-[50%] bg-slate-100"></span>

          <!-- product -->
          <div class="w-full flex items-center justify-start gap-2">
            <p class="text-sm text-primary font-bold">محصول</p>

            <base-icon
              class="w-3 fill-primary"
              name="arrow-left-solid"
            ></base-icon>

            <p class="text-sm text-primary font-bold">
              {{ comment.product.title }}
            </p>
          </div>

          <!-- body -->
          <p class="text-overflow w-full text-sm text-slate-500">
            {{ comment.text }}
          </p>

          <!-- divider -->
          <span class="w-full h-[1px] rounded-[50%] bg-slate-100"></span>

          <!-- delete -->
          <button
            title="حذف محصول"
            @click.prevent="deleteComment(comment._id)"
            class="px-2.5 py-1 mt-1 bg-none hover:bg-red-400 flex items-center justify-center gap-2 rounded border-2 border-red-400 transition-all group"
          >
            <span class="text-sm text-red-400 group-hover:text-slate-50"
              >حذف</span
            >
            <base-icon
              class="w-3.5 h-3.5 fill-red-400 group-hover:fill-slate-50"
              name="trash-can-regular"
            ></base-icon>
          </button>
        </nuxt-link>
      </div>
    </div>

    <!-- empty state -->
    <p
      v-else-if="comments !== null && !comments.length"
      class="text-secondary text-center mt-12"
    >
      در حال حاضر هیچ دیدگاهی وجود ندارد
    </p>

    <!-- loading -->
    <div v-else class="w-full my-12 flex items-center justify-center">
      <app-loading></app-loading>
    </div>
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
const deleteComment = (x) => {
  console.log("Deleted::::", x);
};

// lifecycles
onMounted(() => {
  // fetch all comments on first mount
  if (store.getters["admin/allComments"] === null) getComments();
});
</script>

<style scoped>
td {
  padding: 0.5rem 0.4rem;
}
.text-overflow {
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 6 !important;
  line-clamp: 6 !important;
  -webkit-box-orient: vertical !important;
}
</style>
