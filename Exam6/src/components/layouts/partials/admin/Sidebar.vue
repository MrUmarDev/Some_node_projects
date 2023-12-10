<script setup></script>

<template>
  <aside class="h-screen bg-purple px-4 py-6 flex flex-col">
    <h2 class="text-center uppercase text-xl font-semibold mb-4 text-white">
      Admin Panel
    </h2>
    <router-link
      to="/admin/users"
      class="sidebar_item"
      >Users</router-link
    >
    <router-link
      to="/admin/category"
      class="sidebar_item"
      >Category</router-link
    >
    <router-link
      to="/admin/book"
      class="sidebar_item"
      >Book</router-link
    >
    <router-link
      to="/admin/author"
      class="sidebar_item"
      >Author</router-link
    >
  </aside>
</template>

<style scoped>
.router-link-active {
  background-color: #fff;
  color: black;
}
</style>
