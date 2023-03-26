import {computed, ref} from "vue";

const sessions = ref([]);

const useLoading = () => {
    const createLoadingSession = () => {
        let identifier = new Date().getTime();

        sessions.value.push(identifier);

        return () => {
            sessions.value = sessions.value.filter(session => session !== identifier);
        };
    }

    const isLoading = computed(() => sessions.value.length !== 0);

    return {createLoadingSession, isLoading};
}

export default useLoading;