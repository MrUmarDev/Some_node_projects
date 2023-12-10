<template>
  <form
    @submit.prevent="onSubmit"
    class="flex w-full h-screen"
  >
    <div class="w-[50%] bg-purple">
      <img
        class="m-auto w-[500px] h-[500px] mt-[50px]"
        src="../assets/images/loginLeft.png"
        alt=""
      />
    </div>
    <div class="w-[50%] pl-[170px] mt-[150px]">
      <h2 class="font-bold text-3xl">Sign in</h2>
      <p class="text-xs mt-[10px]">Do not you have an account? Sign up</p>

      <Input
        id="email"
        placeholder="Email"
        type="email"
        required
        v-model="email"
      />

      <Input
        id="password"
        placeholder="Password"
        type="password"
        required
        v-model="password"
      />
      <div class="mt-">
        <Button
          type="submit"
          class="mt-[20px]"
        >
          Next step
        </Button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

import Button from "../components/base/base-button.vue";
import Input from "../components/base/base-input.vue";

const store = useStore();

const email = ref("");
const password = ref("");

async function onSubmit() {
  if (!email.value.length && !password.value.length) {
    return;
  }
  await store.dispatch("auth", {
    email: email.value,
    password: password.value,
  });
}
</script>
