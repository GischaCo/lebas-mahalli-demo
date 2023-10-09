<template>
  <label>
    <div
      class="w-20 h-20 bg-white flex items-center justify-center rounded-lg overflow-hidden"
    >
      <img
        :class="[width]"
        class="w-auto max-h-full"
        :src="src"
        alt="blank image"
      />
    </div>
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
import { onMounted, ref } from "@nuxtjs/composition-api";

// variables
const src = ref();

onMounted(() => {
  if (props.value?.length > 0) {
    src.value = props.value;
  } else {
    src.value = require("../../../../static/img/admin/blank.png");
  }
});

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
  value: {
    type: String,
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
