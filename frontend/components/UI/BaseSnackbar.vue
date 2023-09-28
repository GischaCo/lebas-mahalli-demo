<template>
  <div
    :class="[bgColor]"
    class="fixed bottom-4 right-4 rounded-lg shadow-lg overflow-hidden"
  >
    <div class="w-full px-5 py-3 flex items-center justify-start gap-2">
      <!-- icon -->
      <div
        class="w-5 h-5 p-1 flex items-center justify-center border-[2px] border-white rounded-full"
      >
        <base-icon :name="iconName" class="fill-white"></base-icon>
      </div>

      <!-- message -->
      <p class="text-sm text-white">{{ store.state.app.snackbar.message }}</p>
    </div>

    <!-- progress bar -->
    <div class="w-full h-1 bg-white/40 flex items-center justify-start">
      <span class="progressbar-style block h-full bg-white rounded-full"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSnackbar",
};
</script>

<script setup>
import { ref, computed, onMounted, useStore } from "@nuxtjs/composition-api";

// variables
const timeout = ref(3);
const store = useStore();
const progressValue = ref(300);

// computed
const iconName = computed(() => {
  return store.state.app.snackbar.status === 200
    ? "check-solid"
    : "xmark-solid";
});
const bgColor = computed(() => {
  return store.state.app.snackbar.status === 200
    ? "bg-green-600"
    : "bg-rose-600";
});
const progressBarPercent = computed(() => {
  return 1 / (timeout.value / progressValue.value);
});

// methods
const runProgress = () => {
  setInterval(() => {
    progressValue.value--;
  }, 10);
};

const resetProgress = () => {
  timeout.value = 3;
  progressValue.value = 300;
};

// lifecycles
onMounted(() => {
  resetProgress();
  runProgress();
});
</script>

<style scoped>
.progressbar-style {
  width: calc(v-bind(progressBarPercent) * 1%);
}
</style>
