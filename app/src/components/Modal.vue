<script setup>
import { ref, watch, onMounted } from "vue";
import { Modal as BsModal } from "bootstrap";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = ref(props.modelValue);
let modalElement = ref(null);

watch(modelValue, () => emit("update:modelValue", modelValue.value));

onMounted(() => {
  const modal = new BsModal(modalElement.value);

  modalElement.value.addEventListener("hidden.bs.modal", (event) => {
    modelValue.value = false;
  });

  modalElement.value.addEventListener("show.bs.modal", (event) => {
    modelValue.value = true;
  });

  watch(props, () => {
    modelValue.value = props.modelValue;

    if (modelValue.value === false) {
      modal.hide();
    } else {
      modal.show();
    }
  });
});
</script>

<template>
  <div class="modal" tabindex="-1" ref="modalElement">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
