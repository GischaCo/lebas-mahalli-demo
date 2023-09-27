<template>
  <label class="w-full flex flex-col items-start gap-1 group">
    <span
      class="text-sm text-neutral-500 group-focus-within:text-primary transition-all"
    >
      <slot></slot>
    </span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="w-full h-11 p-2 border-[1px] border-neutral-500 group-focus-within:border-primary rounded-lg transition-all"
      :required="required"
      :value="value"
      @input="value = $event.target.value"
    />
  </label>
</template>

<script>
export default {
  name: "BaseInput",
};
</script>

<script setup>
import { computed } from "@nuxtjs/composition-api";

// emit
const emit = defineEmits(["value"]);

// props
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
    default: "text",
  },
  placeholder: {
    type: [String, Number],
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    default: null,
  },
});

// computed
const value = computed({
  get: () => props.value,
  set: (value) => emit("update:value", value),
});
</script>
