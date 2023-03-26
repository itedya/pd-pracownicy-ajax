import useErrorModal from "./use-error-modal.composable.js";

const useErrorCatcher = async (err) => {
    const {show} = useErrorModal();

    try {
        if (err.response === undefined || err.response.status === undefined) throw new Error("Unknown response status");

        const json = err.response.data;

        if (!Array.isArray(json.data)) throw new Error("Response from server does not contain array of errors");

        show(json.data);
    } catch (e) {
        console.log(err);
        show(["Wystąpił nieoczekiwany błąd, skontaktuj się z administratorem aplikacji jeżeli sytuacja się powtarza."]);
    }
}

export default useErrorCatcher;