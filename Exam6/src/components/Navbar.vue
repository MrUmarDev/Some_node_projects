<template>
  <nav
    class="bg-black flex text-white justify-between w-full h-[80px] px-[50px] border-b-2 border-gray-900"
  >
    <div class="pt-[20px] text-2xl text-gold">
      <p>Badiiyat</p>
    </div>

    <div class="flex gap-10 pt-[25px] ml-[400px]">
      <router-link to="/">Bosh sahifa</router-link>
      <p>Nasr</p>
      <p>Nazm</p>
      <!-- <p>Maqolalar</p>
      <p>Forum</p> -->
      <router-link to="/admin">Admin Panel</router-link>
      <Button
        class="btn"
        @click="logout"
        >Chiqish</Button
      >
    </div>
    <div class="pt-[15px]">
      <img
        class="rounded-full"
        src="../assets/images/admPic.png"
        alt=""
      />
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

function logout() {
  store.commit("LOGOUT");
}
</script>

<style scoped>
.btn {
  width: 100px;
  height: 30px;
  background-color: #c9ac8c;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: -10px;
}
</style>
