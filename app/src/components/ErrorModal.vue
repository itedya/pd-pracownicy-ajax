<script setup>
import { computed, ref } from "vue";
import Modal from "./Modal.vue";
import useErrorModal from "../composables/use-error-modal.composable.js";

const show = ref(false);
const errors = ref([]);
const errorsFormatted = computed(() => errors.value.join("<br/>"));

useErrorModal().assignListener((data) => {
  errors.value = data;
  show.value = true;
});
</script>

<template>
  <Modal v-model="show">
    <template #title>Wystąpił błąd</template>
    <template #body>{{ errorsFormatted }}</template>
    <template #footer>
      <button class="btn btn-danger" data-bs-dismiss="modal" @click="show = false">Zamknij</button>
    </template>
  </Modal>
</template>
