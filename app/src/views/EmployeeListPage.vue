<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useRouter } from "vue-router";
import useErrorCatcher from "../composables/use-error-catcher.composable.js";
import { fetchEmployees, deleteEmployee } from "../api/employee.api";

const router = useRouter();

const employees = ref([]);

const getEmployees = () => {
  fetchEmployees().then((res) => (employees.value = res)).catch(err => useErrorCatcher(err));
};

const createEmployee = () => router.push({ name: "employee-create" });

const updateEmployee = (id) => {
  router.push({ name: "employee-update", params: { id } });
};

const deleteModalOpen = ref(false);
const deleteEmployeeId = ref();

const showDeleteEmployeeModal = (id) => {
  deleteEmployeeId.value = id;
  deleteModalOpen.value = true;
};

const confirmDeleteEmployee = () => {
  deleteModalOpen.value = false;

  return deleteEmployee(deleteEmployeeId.value)
    .then(() => getEmployees())
    .catch((err) => useErrorCatcher(err));
};

getEmployees();
</script>

<template>
  <Modal v-model="deleteModalOpen">
    <template #title>Potwierdzenie</template>
    <template #body> Czy na pewno chcesz usunąć tego pracownika? </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click="confirmDeleteEmployee()"
      >
        Tak
      </button>
    </template>
  </Modal>

  <div class="container py-3">
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Etat</th>
                <th>Szef</th>
                <th>Zatrudniony od</th>
                <th>Płaca podstawowa</th>
                <th>Płaca dodatkowa</th>
                <th>Zespół</th>
                <th>Edytuj</th>
                <th>Usuń</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="employee of employees" :key="employee.id">
                <td>{{ employee.firstName }}</td>
                <td>{{ employee.lastName }}</td>
                <td>{{ employee.job }}</td>
                <td>{{ employee.boss.lastName }}</td>
                <td>{{ employee.formattedEmployeedFrom }}</td>
                <td>{{ employee.basicWage }}zł</td>
                <td>
                  {{
                    employee.additionalWage !== null
                      ? `${employee.additionalWage}zł`
                      : ""
                  }}
                </td>
                <td>{{ employee.team.name }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="updateEmployee(employee.id)"
                  >
                    Edytuj
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="showDeleteEmployeeModal(employee.id)"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 d-flex flex-row justify-content-end gap-3">
        <button class="btn btn-success" @click="createEmployee">Stwórz</button>
      </div>
    </div>
  </div>
</template>
