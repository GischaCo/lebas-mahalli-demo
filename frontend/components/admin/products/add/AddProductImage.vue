<template>
  <label class="flex flex-col items-start gap-1">
    <img :class="[width]" class="rounded-lg" :src="src" alt="blank image" />
    <input
      type="file"
      @input="updateImage($event)"
      :name="`${name}-image`"
      class="w-0 h-0 hidden"
    />
  </label>
</template>

<script>
export default {
  name: "AddProductImage",
};
</script>

<script setup>
import { ref } from "@nuxtjs/composition-api";

// variables
const src = ref(require("../../../../static/img/admin/blank.png"));

// props
const props = defineProps({
  width: {
    type: String,
    default: "w-14 md:w-20",
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
});

// emit
const emit = defineEmits([`upload-image`]);

// methods
const updateImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const result = event.target.result;
      emit(`upload-image`, { name: props.name, data: result });
      src.value = result;
    };
    fileReader.readAsDataURL(file);
  }
};
</script>
