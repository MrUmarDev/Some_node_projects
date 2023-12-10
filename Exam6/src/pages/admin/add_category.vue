<template>
  <div class="w-full text-center mt-[200px]">
    <p class="font-bold text-3xl">Add Category</p>
    <Input
      id="category_name"
      placeholder="Category name"
      type="text"
      required
      v-model="category"
    />
    <Button class="mt-[20px] w-[310px]">Create</Button>
  </div>
</template>

<script setup>
import Input from "../../components/base/base-input.vue";
import Button from "../../components/base/base-button.vue";
</script>

<style scoped></style>
