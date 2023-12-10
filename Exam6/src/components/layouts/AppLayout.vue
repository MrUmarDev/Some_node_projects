<template>
  <component>
    <slot />
  </component>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped></style>
