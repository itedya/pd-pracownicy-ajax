<script setup>
import { ref, watch } from "vue";
import InputField from "../components/InputField.vue";
import { useRoute, useRouter } from "vue-router";
import useValidation from "../composables/use-validation.composable.js";
import { updateTeamRequest } from "@itedya/sor-tokajuk-pracownicy-ajax-validation";
import { fetchTeamById, updateTeam } from "../api/team.api.js";
import useErrorCatcher from "../composables/use-error-catcher.composable";

const router = useRouter();
const route = useRoute();

const { errors, validate, isInvalid } = useValidation(updateTeamRequest);

const getTeam = () => {
  return fetchTeamById(data.value.id)
    .then((res) => {
      data.value = res;
    })
    .catch((err) => useErrorCatcher(err));
};

const update = async () => {
  validate(data.value);
  if (isInvalid()) {
    return;
  }

  updateTeam(data.value.id, data.value.name, data.value.address).then(() =>
    router.push({ name: "team-list" })
  );
};

const data = ref({ id: parseInt(route.params.id) });

watch(data, () => validate(data.value), { deep: true });

getTeam();
</script>

<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-12 d-flex flex-column gap-3">
        <div class="card">
          <div class="card-header">Edytuj zespół</div>

          <div class="card-body d-flex flex-column gap-3">
            <InputField
              label="Nazwa"
              v-model="data.name"
              :error="errors.name"
            />
            <InputField
              label="Adres"
              v-model="data.address"
              :error="errors.address"
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
