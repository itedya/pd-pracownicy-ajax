<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useRouter } from "vue-router";
import useErrorCatcher from "../composables/use-error-catcher.composable.js";
import { fetchTeams, deleteTeam } from "../api/team.api";

const router = useRouter();

const teams = ref([]);

const getTeams = () => {
  fetchTeams().then((res) => (teams.value = res)).catch(err => useErrorCatcher(err));
};

const createTeam = () => router.push({ name: "team-create" });

const updateTeam = (id) => {
  router.push({ name: "team-update", params: { id } });
};

const deleteModalOpen = ref(false);
const deleteTeamId = ref();

const showDeleteTeamModal = (id) => {
  deleteTeamId.value = id;
  deleteModalOpen.value = true;
};

const confirmDeleteTeam = () => {
  deleteModalOpen.value = false;

  return deleteTeam(deleteTeamId.value)
    .then(() => getTeams())
    .catch((err) => useErrorCatcher(err));
};

getTeams();
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
        @click="confirmDeleteTeam()"
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
                <th>Edytuj</th>
                <th>Usuń</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="team of teams" :key="team.id">
                <td>{{ team.name }}</td>
                <td>{{ team.address }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="updateTeam(team.id)"
                  >
                    Edytuj
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="showDeleteTeamModal(team.id)"
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
        <button class="btn btn-success" @click="createTeam">Stwórz</button>
      </div>
    </div>
  </div>
</template>
