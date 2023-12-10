<template>
  <Navbar />
  <section class="bg-black h-auto">
    <div class="w-[1261px] h-[346px] mx-auto pt-[70px]">
      <img
        src="../assets/images/main-img.png"
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
          @input="searchProducts"
        />
        <button
          @click="searchProducts"
          class="bg-persikoviy text-orange-950 px-6 rounded-lg ml-3"
        >
          Izlash
        </button>
      </div>
    </div>

    <div class="w-full h-[100px] mt-[250px] text-center">
      <p class="text-gold text-3xl">Asosiy kategoriyalar</p>
    </div>
    <div class="w-[70%] h-[40px] px-[20px] flex mx-auto justify-around">
      <p class="text-white hover:text-gold text-xl">Temuriylar davri</p>
      <p class="text-white hover:text-gold text-xl">Jadid adabiyoti</p>
      <p class="text-white hover:text-gold text-xl">Sovet davri</p>
      <p class="text-white hover:text-gold text-xl">Mustaqillik davri</p>
    </div>

    <div class="w-full p-[50px] py-[40px]">
      <div class="flex flex-wrap gap-7 mx-auto">
        <div
          class="mx-auto"
          v-for="product of products"
        >
          <div class="w-[164px] h-[240px]">
            <img
              :src="product.images[0]"
              alt=""
            />
          </div>
          <h1 class="text-gold text-xl w-[165px]">{{ product.title }}</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Navbar from "../components/navbar.vue";
import Input from "../components/base/base-input.vue";

import { useHome } from "../composables";

const { products, searchProducts, searchWord } = useHome();
</script>

<style scoped></style>
