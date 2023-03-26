<script setup>
import { ref, watch } from "vue";
import InputField from "../components/InputField.vue";
import { useRoute, useRouter } from "vue-router";
import useValidation from "../composables/use-validation.composable.js";
import { updateJobRequest } from "@itedya/sor-tokajuk-pracownicy-ajax-validation";
import { fetchJobByName, updateJob } from "../api/job.api.js";
import useErrorCatcher from "../composables/use-error-catcher.composable";

const router = useRouter();
const route = useRoute();

const { errors, validate, isInvalid } = useValidation(updateJobRequest);

const getJob = () => {
  return fetchJobByName(data.value.name).then((res) => {
    res.oldName = res.name;
    data.value = res;
  });
};

const update = async () => {
  validate(data.value);
  if (isInvalid()) {
    return;
  }

  updateJob(data.value.oldName, data.value.name, data.value.wageFrom, data.value.wageTo)
    .then(() => router.push({ name: "job-list" }))
    .catch((err) => useErrorCatcher(err));
};

const data = ref({
  name: route.params.name,
});

watch(data, () => validate(data.value), { deep: true });

getJob();
</script>

<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-12 d-flex flex-column gap-3">
        <div class="card">
          <div class="card-header">Edytuj pracownika</div>

          <div class="card-body d-flex flex-column gap-3">
            <InputField
              label="Nazwa"
              v-model="data.name"
              :error="errors.name"
            />
            <InputField
              label="Płaca od"
              type="number"
              v-model="data.wageFrom"
              :error="errors.wageFrom"
            />
            <InputField
              label="Płaca do"
              type="number"
              v-model="data.wageTo"
              :error="errors.wageTo"
            />
          </div>

          <div class="card-footer">
            <button class="btn btn-success" @click="update">Zaktualizuj</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
