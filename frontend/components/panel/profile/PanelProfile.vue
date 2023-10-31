<template>
  <panel-child-container title="اطلاعات حساب کاربری">
    <div class="w-full">
      <validation-observer class="w-full" v-slot="{ invalid }">
        <form
          @submit.prevent="submitForm"
          class="w-full flex flex-col items-start gap-3"
        >
          <!-- fullname -->
          <base-input
            type="text"
            name="fullname"
            :value="userInfo.fullname"
            @update:value="updateUserInfo('fullname', $event)"
            rules="required"
            >نام</base-input
          >

          <!-- mobile -->
          <base-input
            type="number"
            name="mobile-number"
            placeholder="مثال: 09112345678"
            :value="userInfo.phone"
            @update:value="updateUserInfo('phone', $event)"
            rules="required|mobile_min:11|mobile_max:11"
            >شماره موبایل</base-input
          >

          <!-- address -->
          <base-input
            type="text"
            name="address"
            :value="userInfo.address"
            @update:value="updateUserInfo('address', $event)"
            rules="required"
            >آدرس</base-input
          >

          <!-- gender -->
          <label class="w-full flex flex-col items-start gap-1 group">
            <span
              class="text-sm text-neutral-500 group-focus-within:text-primary transition-all"
              >جنسیت (اختیاری)</span
            >

            <select
              name="gender"
              class="w-full h-11 p-2 border-[1px] border-neutral-500 group-focus-within:border-primary rounded-lg transition-all"
              v-model="userInfo.gender"
            >
              <option value="0">تعیین نشده</option>
              <option value="1">خانم</option>
              <option value="2">آقا</option>
            </select>
          </label>

          <!-- button -->
          <button
            type="submit"
            :disabled="invalid"
            class="px-5 py-2 flex items-center justify-center gap-3 rounded-lg bg-primary shadow-lg hover:scale-[1.02] transition-all disabled:cursor-not-allowed disabled:brightness-75"
          >
            <span class="text-white">ذخیره تغییرات</span>
            <base-icon
              v-if="loading"
              name="spinner-solid"
              class="w-4 h-4 fill-white animate-spin"
            ></base-icon>
          </button>
        </form>
      </validation-observer>
    </div>
  </panel-child-container>
</template>

<script>
export default {
  name: "PanelProfileSection",
};
</script>

<script setup>
import { ref, useStore, computed } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const userInfo = ref(store.state.panel.user);

// computed
const loading = computed(() => {
  return store.getters["app/loading"];
});

// methods
const updateUserInfo = (key, value) => {
  userInfo.value[key] = value;
};
const submitForm = () => {
  store.dispatch("app/setLoading", true);
  store.dispatch("panel/updateUser", userInfo.value);
};
</script>
