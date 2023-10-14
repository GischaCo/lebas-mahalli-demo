<template>
  <section class="w-11/12 flex flex-col items-center justify-start gap-2">
    <!-- header -->
    <div class="w-full flex items-center justify-center gap-2">
      <span class="w-2/12 h-[2px] rounded-lg bg-neutral-300"></span>
      <p class="min-w-max text-neutral-400">دیدگاه کاربران</p>
      <span class="w-full h-[2px] rounded-lg bg-neutral-300"></span>
    </div>

    <div class="w-full flex flex-col items-start justify-start gap-3">
      <button
        v-if="!formOpened"
        @click="toggleForm"
        class="px-4 py-2 flex items-center justify-start gap-2 rounded-lg border-2 border-primary transition-all group"
      >
        <base-icon
          name="plus-solid"
          class="w-0 h-4 fill-primary group group-hover:w-4 transition-all"
        ></base-icon>
        <span class="text-primary font-bold">ثبت دیدگاه</span>
      </button>

      <!-- alert -->
      <div
        v-if="formOpened && store.state.panel.user === null"
        class="w-full p-4 bg-gradient-to-r from-light to-light/40 flex items-center justify-start gap-4 rounded-lg"
      >
        <div
          class="w-6 h-6 p-1 rounded-full bg-primary/60 flex items-center justify-center"
        >
          <base-icon
            name="info-solid"
            class="w-3.5 h-3.5 fill-light"
          ></base-icon>
        </div>
        <p class="text-primary/60 font-bold">
          برای ثبت دیدگاه‌ابتدا باید
          <nuxt-link to="/auth/sign-up" class="text-blue-600"
            >ثبت‌نام</nuxt-link
          >
          کنید یا اگر حساب‌کاربری دارید،
          <nuxt-link to="/auth/login" class="text-blue-600">وارد شوید</nuxt-link
          >.
        </p>
      </div>

      <!-- form -->
      <form
        v-if="formOpened && store.state.panel.user !== null"
        @submit.prevent="submitForm"
        class="w-full p-4 bg-gradient-to-r from-light to-light/40 flex flex-col items-start justify-start gap-2 rounded-lg"
      >
        <!-- title -->
        <h4 class="text-primary text-xl font-bold">ثبت دیدگاه</h4>

        <!-- fullname -->
        <label class="w-full flex flex-col items-start gap-0.5">
          <span class="text-secondary">نام</span>
          <input
            type="text"
            disabled
            v-model="commentInfo.fullname"
            class="w-full px-3 py-2 text-neutral-600 bg-white/60 rounded-lg disabled:opacity-50"
          />
        </label>

        <!-- phone -->
        <label class="w-full flex flex-col items-start gap-0.5">
          <span class="text-secondary">شماره تماس</span>
          <input
            type="number"
            disabled
            v-model="commentInfo.phone"
            class="w-full px-3 py-2 text-neutral-600 bg-white/60 rounded-lg disabled:opacity-50"
          />
        </label>

        <!-- phone alert -->
        <p class="text-sm md:text-base text-primary">
          * شماره تماس شما نزد ما محفوظ بوده و منتشر نمی‌شود.
        </p>

        <!-- comment text -->
        <label class="w-full flex flex-col items-start gap-0.5">
          <span class="text-secondary">دیدگاه</span>
          <textarea
            type="text"
            v-model="commentInfo.text"
            class="w-full min-h-[10rem] max-h-[15rem] px-3 py-2 text-neutral-600 bg-white/60 rounded-lg"
          ></textarea>
        </label>

        <!-- button -->
        <button
          type="submit"
          :disabled="commentInfo.text.length < 1"
          class="px-6 h-10 text-white bg-gradient-to-tr from-secondary to-primary rounded-lg shadow-md hover:shadow-lg shadow-primary/20 hover:shadow-primary/30 disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:shadow-primary/20 transition-all"
        >
          ثبت دیدگاه
        </button>
      </form>

      <!-- empty state -->
      <p v-if="comments.length < 1">هنوز دیدگاهی برای این محصول ثبت نشده.</p>

      <!-- comments -->
      <div
        v-else
        class="w-full flex flex-col-reverse items-center justify-start gap-4"
      >
        <div
          class="w-full p-3 bg-light/30 flex flex-col items-start justify-start gap-2 rounded-lg border-r-4 border-primary/40"
          v-for="(comment, i) in comments"
          :key="i"
        >
          <div class="flex items-center justify-start gap-3">
            <!-- title -->
            <h5 class="text-lg text-primary font-bold">
              {{ comment.fullname }}
            </h5>

            <!-- reply -->
            <div
              @click="replyComment"
              class="flex items-center justify-start gap-1 cursor-pointer"
            >
              <base-icon
                name="reply-solid"
                class="w-2 h-2 fill-neutral-400"
              ></base-icon>
              <p class="text-xs text-neutral-400">پاسخ</p>
            </div>
          </div>
          <p class="text-neutral-600">{{ comment.text }}</p>
          <p class="text-sm text-neutral-400">
            {{ $moment(comment.date).format("jDD jMMMM jYYYY") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SingleProductComments",
};
</script>

<script setup>
import { ref, onMounted, useStore } from "@nuxtjs/composition-api";

// variables
const store = useStore();
const formOpened = ref(false);
const commentInfo = ref({
  fullname: "",
  phone: "",
  text: "",
});

// props
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: "",
  },
  comments: {
    type: Array,
    required: true,
    default: function () {
      return [];
    },
  },
});

// methods
const toggleForm = () => {
  formOpened.value = !formOpened.value;
};
const submitForm = () => {
  // comment data & action call
  const payload = {
    id: props.id,
    data: commentInfo.value,
  };
  store.dispatch("products/addComment", payload);
  // toggle (close) submit form after submitting
  toggleForm();
  // clear form text after submitting
  commentInfo.value.text = "";
};
const replyComment = () => {
  store.dispatch("app/showSnackbar", {
    status: 400,
    message: "این قابلیت به زودی اضافه می‌شود",
  });
};

// lifecycles
onMounted(() => {
  const user = store.state.panel.user;
  if (user !== null) {
    commentInfo.value.fullname = user.fullname;
    commentInfo.value.phone = user.phone;
  }
});
</script>
