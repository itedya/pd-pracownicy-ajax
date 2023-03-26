<script setup>
import { ref, watch } from "vue";
import { fetchTeams } from "../api/team.api.js";
import InputField from "../components/InputField.vue";
import { useRouter } from "vue-router";
import useValidation from "../composables/use-validation.composable";
import { createTeamRequest } from "@itedya/sor-tokajuk-pracownicy-ajax-validation";
import { createTeam } from "../api/team.api.js";

const router = useRouter();

const { errors, validate, isInvalid } = useValidation(createTeamRequest);

const create = async () => {
  validate(data.value);
  if (isInvalid()) {
    return;
  }

  createTeam(data.value.name, data.value.address).then(() =>
    router.push({ name: "team-list" })
  );
};

const data = ref({});

watch(data, () => validate(data.value), { deep: true });
</script>

<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-12 d-flex flex-column gap-3">
        <div class="card">
          <div class="card-header">Stwórz zespół</div>

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
            <button class="btn btn-success" @click="create">Stwórz</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
