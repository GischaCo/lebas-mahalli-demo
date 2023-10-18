<template>
  <section class="w-full">
    <!-- users data table -->
    <table
      v-if="users !== null && users.length"
      class="w-full bg-slate-50 rounded-xl overflow-hidden shadow-md"
    >
      <thead class="w-full">
        <tr class="w-full">
          <td><p class="text-sm md:text-base">ردیف</p></td>
          <td><p class="text-sm md:text-base">نام</p></td>
          <td><p class="text-sm md:text-base">موبایل</p></td>
          <td><p class="text-sm md:text-base">کیف‌پول</p></td>
          <td><p class="text-sm md:text-base">عملیات</p></td>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr
          class="w-full even:bg-slate-50 odd:bg-slate-200"
          v-for="(user, i) in users"
          :key="user._id"
        >
          <td>
            <span>{{ i + 1 }}</span>
          </td>
          <td>
            <p class="user-fullname text-xs md:text-base font-bold">
              {{ user.fullname }}
            </p>
          </td>
          <td>
            <p class="user-fullname text-xs md:text-base">
              {{ user.phone }}
            </p>
          </td>
          <td>
            <p class="user-fullname text-sm md:text-base text-primary">
              {{ user.wallet }}
            </p>
          </td>
          <td>
            <div class="flex items-center justify-start gap-3">
              <!-- delete -->
              <button
                title="حذف"
                @click="deleteUser(user._id)"
                class="px-5 py-2 rounded bg-slate-700 shadow-md hover:shadow-lg transition-all"
              >
                <p class="text-white text-sm">حذف</p>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- empty state -->
    <p
      v-else-if="users !== null && !users.length"
      class="text-secondary text-center mt-12"
    >
      در حال حاضر هیچ کاربری وجود ندارد
    </p>

    <!-- loading -->
    <div v-else class="w-full my-12 flex items-center justify-center">
      <app-loading></app-loading>
    </div>
  </section>
</template>

<script>
export default {
  name: "AdminAllUsers",
};
</script>

<script setup>
import { useStore, computed, onMounted } from "@nuxtjs/composition-api";

// variables
const store = useStore();

// computed
const users = computed(() => {
  return store.getters["admin/allUsers"];
});

// methods
const getUsers = () => {
  store.dispatch("admin/getUsers");
};
const deleteUser = (userId) => {
  store.dispatch("admin/deleteUser", userId);
};

// lifecycles
onMounted(() => {
  // fetch all users on first mount
  if (store.getters["admin/allUsers"] === null) getUsers();
});
</script>

<style scoped>
td {
  padding: 0.5rem 0.4rem;
}
.user-fullname {
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}
</style>
