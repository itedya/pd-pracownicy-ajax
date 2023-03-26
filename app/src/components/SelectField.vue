<script setup>
import { v4 } from "uuid";
import { ref, watch } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = ref(props.modelValue);
const error = ref(props.error);

watch(modelValue, (val) => emit("update:modelValue", val));
watch(
  props,
  (val) => {
    modelValue.value = props.modelValue;
    error.value = props.error;
  },
  { deep: true }
);

const uuid = ref(v4());
</script>

<template>
  <div :class="['form-floating', error === undefined || 'is-invalid']">
    <select :class="['form-select', error === undefined || 'is-invalid']" :id="uuid" v-model="modelValue">
      <option
        v-for="option of options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <label :for="uuid">{{ label }}</label>
    <div class="invalid-feedback">{{ error }}</div>
  </div>
</template>
