<script setup>
import Sidebar from "../layouts/partials/admin/Sidebar.vue";
</script>

<template>
  <main class="admin-layout flex">
    <div class="w-1/5 sticky h-screen top-0 left-0">
      <Sidebar />
    </div>
    <div class="w-full">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
