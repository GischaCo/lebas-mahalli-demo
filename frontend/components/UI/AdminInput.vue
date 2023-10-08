<template>
  <label class="w-full flex flex-col items-start gap-1 group">
    <span
      class="text-sm text-neutral-900 group-focus-within:text-slate-600 transition-all"
    >
      <slot></slot>
    </span>

    <validation-provider
      :vid="vid"
      :rules="rules"
      v-slot="{ errors }"
      class="w-full"
    >
      <input
        :type="type"
        :name="name"
        :placeholder="placeholder"
        class="w-full h-11 p-2 group-focus-within:ring-2 group-focus-within:ring-slate-300 rounded-lg transition-all"
        v-model="value"
      />
      <span v-if="errors.length" class="text-xs text-blue-800 transition-all">
        - {{ errors[0] }}
      </span>
    </validation-provider>
  </label>
</template>

<script>
export default {
  name: "AdminInput",
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
  rules: {
    type: String,
  },
  value: {
    default: "",
  },
  vid: {
    default: "",
  },
});

// computed
const value = computed({
  get: () => props.value,
  set: (value) => emit("update:value", value),
});
</script>
