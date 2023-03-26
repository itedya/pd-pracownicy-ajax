import emitter from "../plugins/emitter.js"

const useErrorModal = () => {
    const show = (errors) => {
        emitter.emit("error-modal:show", errors);
    }

    const assignListener = (listener) => {
        emitter.on("error-modal:show", listener);
    }

    return {show, assignListener};
}

export default useErrorModal;