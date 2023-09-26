<template>
  <component
    @click="itemClickHandler($event)"
    v-bind="itemProps"
    class="relative"
  >
    <!-- category link -->
    <div class="flex items-center justify-center gap-1.5">
      <span class="text-primary">{{ category.title }}</span>
      <base-icon
        v-if="hasChild(category._id)"
        name="chevron-down-solid"
        class="w-2.5 fill-primary"
      ></base-icon>
    </div>

    <!-- child categories -->
    <div
      v-if="hasChild(category._id) && isDropdownOpened"
      class="absolute min-w-max pl-8 pr-2 py-4 bg-white rounded-xl flex flex-col items-start justify-start gap-2 shadow-lg"
    >
      <nuxt-link
        :to="`/products${category.path}`"
        class="w-full flex items-center justify-start gap-2 group"
      >
        <base-icon
          name="arrow-left-solid"
          class="w-3 fill-neutral-500 scale-x-0 group-hover:scale-100 transition-all origin-right"
        ></base-icon>
        <span class="text-neutral-500">همه</span>
      </nuxt-link>
      <nuxt-link
        class="w-full flex items-center justify-start gap-2 group"
        :to="`/products${childCategory.path}`"
        :key="childCategory._id"
        v-for="childCategory in childCategoriesById(category._id)"
      >
        <base-icon
          name="arrow-left-solid"
          class="w-3 fill-neutral-500 scale-x-0 group-hover:scale-100 transition-all origin-right"
        ></base-icon>
        <span class="text-neutral-500">{{ childCategory.title }}</span>
      </nuxt-link>
    </div>
  </component>
</template>

<script>
export default {
  name: "HeaderNavbarItem",
};
</script>

<script setup>
import { ref, useStore, computed } from "@nuxtjs/composition-api";

// props
const props = defineProps({
  category: {
    type: Object,
    required: true,
    default: function () {
      return {};
    },
  },
});

// variables
const store = useStore();
const isDropdownOpened = ref(false);

// computed
const itemProps = computed(() => {
  const { category } = props;
  if (category.isParent && hasChild(category._id)) {
    return {
      is: "button",
    };
  }
  return {
    is: "nuxt-link",
    to: `/products${category.path}`,
  };
});

// methods
const childCategoriesById = (id) => {
  return store.getters["categories/childCategoriesById"](id);
};
const hasChild = (id) => {
  return store.getters["categories/childCategoriesById"](id).length;
};
const itemClickHandler = () => {
  if (hasChild(props.category._id)) {
    // toggle dropdown
    isDropdownOpened.value = !isDropdownOpened.value;
  }
};
</script>
