<template>
  <Navbar />
  <section class="bg-black h-auto">
    <div class="w-[1261px] h-[346px] mx-auto pt-[70px]">
      <img
        src="../assets/images/navbarPic.png"
        alt=""
      />
    </div>
    <div
      class="w-[1114px] h-[169px] rounded-xl bg-black2 absolute ml-[117px] p-[30px] text-center"
    >
      <p class="text-gold text-3xl">Qidirish</p>

      <div class="ml-[100px] mt-6 flex">
        <input
          type="text"
          class="py-2 px-4 outline-none bg-gray2 border-gray2 text-white rounded-2xl w-[80%]"
          placeholder="Adiblar"
          v-model="searchWord"
          @input="searchProduct"
        />
        <button
          @click="searchProduct"
          class="bg-persikoviy text-orange-950 px-6 rounded-lg ml-3"
        >
          Izlash
        </button>
      </div>
    </div>

    <div class="w-full h-screen mt-[250px] text-center">
      <p class="text-gold text-3xl">Asosiy kategoriyalar</p>
    </div>
  </section>
  <div v-for="author of authors">
    <h1>{{ author.firstName }}</h1>
  </div>
</template>

<script setup>
import Navbar from "../components/navbar.vue";
import Input from "../components/base/base-input.vue";

import { useHome } from "../composable";
const { authors } = useHome();
</script>

<style scoped></style>
