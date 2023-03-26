<script setup>
import { ref, watch } from "vue";
import { fetchEmployees } from "../api/employee.api.js";
import { fetchTeams } from "../api/team.api.js";
import { fetchJobs } from "../api/job.api.js";
import InputField from "../components/InputField.vue";
import SelectField from "../components/SelectField.vue";
import { useRoute, useRouter } from "vue-router";
import useValidation from "../composables/use-validation.composable.js";
import { updateEmployeeRequest } from "@itedya/sor-tokajuk-pracownicy-ajax-validation";
import { fetchEmployeeById, updateEmployee } from "../api/employee.api.js";

const router = useRouter();
const route = useRoute();

const { errors, validate, isInvalid } = useValidation(updateEmployeeRequest);

const bosses = ref([]);
const teams = ref([]);
const jobs = ref([]);

const getBosses = () => {
  fetchEmployees().then((res) => {
    bosses.value = res.map((ele) => ({
      label: ele.lastName,
      value: ele.id,
    }));

    bosses.value.unshift({
      label: "Bez szefa",
      value: null,
    });
  });
};

const getTeams = () => {
  fetchTeams().then((res) => {
    teams.value = res.map((ele) => ({
      label: ele.name,
      value: ele.id,
    }));
  });
};

const getJobs = () => {
  fetchJobs().then((res) => {
    jobs.value = res.map((ele) => ({
      label: ele.name,
      value: ele.name,
    }));
  });
};

const getEmployee = () => {
  return fetchEmployeeById(data.value.id).then((res) => {
    res.employeedFrom = new Date(res.employeedFrom).toISOString().slice(0, 10);

    data.value = res;
  });
};

const update = async () => {
  validate(data.value);
  if (isInvalid()) {
    return;
  }

  updateEmployee(
    data.value.id,
    data.value.firstName,
    data.value.lastName,
    data.value.job,
    data.value.bossId,
    data.value.employeedFrom,
    data.value.basicWage,
    data.value.additionalWage,
    data.value.teamId
  ).then(() => router.push({ name: "employee-list" }));
};

const data = ref({
  id: route.params.id,
  bossId: null,
});

watch(data, () => validate(data.value), { deep: true });

getEmployee();
getBosses();
getTeams();
getJobs();
</script>

<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-12 d-flex flex-column gap-3">
        <div class="card">
          <div class="card-header">Edytuj pracownika</div>

          <div class="card-body d-flex flex-column gap-3">
            <InputField
              label="Imię"
              v-model="data.firstName"
              :error="errors.firstName"
            />
            <InputField
              label="Nazwisko"
              v-model="data.lastName"
              :error="errors.lastName"
            />
            <SelectField
              :options="jobs"
              label="Etat"
              v-model="data.job"
              :error="errors.job"
            />
            <SelectField
              :options="bosses"
              label="Szef"
              v-model="data.bossId"
              :error="errors.bossId"
            />
            <InputField
              type="date"
              label="Zatrudniony od"
              v-model="data.employeedFrom"
              :error="errors.employeedFrom"
            />
            <InputField
              type="number"
              label="Płaca podstawowa"
              v-model="data.basicWage"
              :error="errors.basicWage"
            />
            <InputField
              type="number"
              label="Płaca dodatkowa"
              v-model="data.additionalWage"
              :error="errors.additionalWage"
            />
            <SelectField
              :options="teams"
              label="Zespół"
              v-model="data.teamId"
              :error="errors.teamId"
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
