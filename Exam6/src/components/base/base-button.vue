<template>
  <button
    :type="type"
    :disabled="disabled"
    class="bg-dark_blue w-[328px] h-[46px] rounded-3xl text-white hover:bg-green-600 transition-all"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
