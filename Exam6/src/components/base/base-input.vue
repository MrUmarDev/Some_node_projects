<template>
  <div
    v-if="label"
    class="mb-2"
  >
    <label :for="id">
      {{ label }}
    </label>
  </div>
  <div>
    <input
      class="w-[300px] h-[40px] rounded-lg border-[2px] mt-[15px] pl-[20px]"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
</script>
