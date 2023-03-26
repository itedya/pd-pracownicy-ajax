<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useRouter } from "vue-router";
import useErrorCatcher from "../composables/use-error-catcher.composable.js";
import { fetchJobs, deleteJob } from "../api/job.api";

const router = useRouter();

const jobs = ref([]);

const getJobs = () => {
  fetchJobs()
    .then((res) => (jobs.value = res))
    .catch((err) => useErrorCatcher(err));
};

const createJob = () => router.push({ name: "job-create" });

const updateJob = (name) => {
  router.push({ name: "job-update", params: { name } });
};

const deleteModalOpen = ref(false);
const deleteJobName = ref();

const showDeleteJobModal = (name) => {
  deleteJobName.value = name;
  deleteModalOpen.value = true;
};

const confirmDeleteJob = () => {
  deleteModalOpen.value = false;

  return deleteJob(deleteJobName.value)
    .then(() => getJobs())
    .catch((err) => useErrorCatcher(err));
};

getJobs();
</script>

<template>
  <Modal v-model="deleteModalOpen">
    <template #title>Potwierdzenie</template>
    <template #body> Czy na pewno chcesz usunąć ten etat? </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Nie
      </button>
      <button type="button" class="btn btn-danger" @click="confirmDeleteJob()">
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
                <th>Nazwa</th>
                <th>Płaca od</th>
                <th>Płaca do</th>
                <th>Edytuj</th>
                <th>Usuń</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="job of jobs" :key="job.id">
                <td>{{ job.name }}</td>
                <td>{{ job.wageFrom }}zł</td>
                <td>{{ job.wageTo }}zł</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="updateJob(job.name)"
                  >
                    Edytuj
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="showDeleteJobModal(job.name)"
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
        <button class="btn btn-success" @click="createJob">Stwórz</button>
      </div>
    </div>
  </div>
</template>
