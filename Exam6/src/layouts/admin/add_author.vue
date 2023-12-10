<template>
  <div class="flex justify-between h-full">
    <div class="bg-slate-100 w-[50%]">
      <img
        class="mt-[100px] w-[350px] h-[266px] mx-auto"
        src="../../assets/images/authorPic.png"
        alt=""
      />
      <p class="font-bold text-3xl text-center mt-[20px]">Ulugbek hazinasi</p>
      <Button class="mt-[30px] ml-[90px]">Upload image</Button>
    </div>
    <div class="w-[50%] ml-[150px] mt-[20px]">
      <p class="font-bold text-3xl">Add author</p>
      <Input
        id="name"
        placeholder="First Name"
        type="text"
        required
        v-model="name"
      />

      <Input
        id="lastName"
        placeholder="Last Name"
        type="text"
        required
        v-model="lastName"
      />

      <Input
        id="date_of_birth"
        placeholder="Date of birth"
        type="text"
        required
        v-model="date_of_birth"
      />

      <Input
        id="date_of_death"
        placeholder="Date of death"
        type="text"
        required
        v-model="date_of_death"
      />

      <Input
        id="country"
        placeholder="Country"
        type="text"
        required
        v-model="country"
      />

      <textarea
        class="border-2 rounded-lg mt-[20px] px-[20px]"
        id=""
        placeholder="Bio"
        cols="26"
        rows="2"
        v-model="bio"
      />

      <Input
        id="file"
        placeholder="File"
        type="file"
        required
        @change="uploadFile"
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
