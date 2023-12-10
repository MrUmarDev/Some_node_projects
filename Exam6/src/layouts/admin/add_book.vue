<template>
  <div class="flex justify-between h-full">
    <div class="bg-slate-100 w-[50%]">
      <img
        class="w-[300px] h-[400px] mt-[20px] mx-auto"
        src="../../assets/images/bookPic.png"
        alt=""
      />
      <p class="font-bold text-3xl text-center mt-[20px]">Ulugbek hazinasi</p>
      <Button class="mt-[30px] ml-[90px]">Upload image</Button>
    </div>
    <div class="w-[50%] ml-[150px] mt-[20px]">
      <p class="font-bold text-3xl">Add book</p>
      <Input
        id="title"
        placeholder="Title"
        type="text"
        required
        v-model="title"
      />

      <Input
        id="pages"
        placeholder="Pages"
        type="text"
        required
        v-model="pages"
      />

      <Input
        id="year"
        placeholder="Year"
        type="text"
        required
        v-model="year"
      />

      <Input
        id="price"
        placeholder="Price"
        type="text"
        required
        v-model="price"
      />

      <Input
        id="country_book"
        placeholder="Country"
        type="text"
        required
        v-model="country_book"
      />

      <Input
        id="author"
        placeholder="Author"
        type="text"
        required
        v-model="author"
      />

      <textarea
        class="border-2 rounded-lg mt-[20px] px-[20px]"
        id="description"
        placeholder="Description"
        cols="26"
        rows="2"
        v-model="description"
      />

      <Input
        id="file_book"
        placeholder="File"
        type="file"
        required
        @change="uploadFileBook"
      />

      <Button class="mt-[20px] w-[310px]">Create</Button>
    </div>
  </div>
</template>

<script setup>
import Input from "../../components/base/base-input.vue";
import Button from "../../components/base/base-button.vue";
</script>

<style scoped></style>
