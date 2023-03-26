<script setup>
import { v4 } from "uuid";
import { ref, watch } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  type: {
    type: String,
    validate: (val) =>
      ["text", "number", "email", "date", "password"].includes(val),
    default: "text",
  },
  error: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const modelValue = ref(props.modelValue);
const error = ref(props.error);

watch(
  props,
  () => {
    modelValue.value = props.modelValue;
    error.value = props.error;
  },
  { deep: true }
);
watch(modelValue, (val) => {
  if (val === "") modelValue.value = null;
  else emit("update:modelValue", val);
});

const uuid = ref(v4());
</script>

<template>
  <div :class="['form-floating', error === undefined || 'is-invalid']">
    <input
      :type="type"
      :class="['form-control', error === undefined || 'is-invalid']"
      :id="uuid"
      :placeholder="label"
      v-model="modelValue"
    />
    <label :for="uuid">{{ label }}</label>
    <div class="invalid-feedback">{{ error }}</div>
  </div>
</template>
