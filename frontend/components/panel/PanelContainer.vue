<template>
  <article class="w-full flex items-start justify-start gap-4">
    <!-- side menu -->
    <section
      class="w-3/12 bg-gradient-to-tr from-primary to-pink-200 rounded-2xl shadow-xl"
    >
      <panel-menu></panel-menu>
    </section>

    <!-- body display -->
    <section
      class="w-9/12 h-[42rem] p-5 border-[1px] border-neutral-300 rounded-2xl shadow-xl"
    >
      <slot></slot>
    </section>
  </article>
</template>

<script>
export default {
  name: "PanelContainer",
};
</script>
