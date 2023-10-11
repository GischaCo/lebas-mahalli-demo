<template>
  <div class="w-72 flex flex-col items-center justify-center gap-4">
    <!-- main image -->
    <div
      class="w-72 h-72 bg-white flex items-center justify-center shadow-lg rounded-xl overflow-hidden"
    >
      <img
        class="w-auto max-h-full"
        :src="previewImage || $config.imagePrefix + image"
        :alt="title"
      />
    </div>

    <!-- images -->
    <div class="w-full flex items-center justify-between">
      <div
        v-for="image in images"
        @click="setPreviewImage($config.imagePrefix + image)"
        class="w-16 h-16 bg-white flex items-center justify-center shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
      >
        <img
          class="w-auto max-h-full"
          :src="$config.imagePrefix + image"
          :alt="title"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleProductImages",
};
</script>

<script setup>
import { ref } from "@nuxtjs/composition-api";

// variables
const previewImage = ref(null);

// props
defineProps({
  title: {
    type: String,
    required: true,
    default: "تصویر محصول",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  images: {
    type: Array,
    required: true,
    default: [],
  },
});

// methods
const setPreviewImage = (img) => {
  previewImage.value = img;
};
</script>
