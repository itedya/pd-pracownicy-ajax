import { ref } from "vue";

const useValidation = (schema) => {
  const errors = ref({});

  const isInvalid = () => Object.keys(errors.value).length !== 0;
  const isValid = () => !isInvalid.value;

  const validate = (data) => {
    try {
      schema.validateSync(data, { abortEarly: false });
      errors.value = {};
    } catch (e) {
      const mappedErrors = {};
      e.inner.forEach(
        (innerObject) =>
          (mappedErrors[innerObject.path] = innerObject.errors[0])
      );
      errors.value = mappedErrors;
    }
  };

  return { errors, validate, isInvalid, isValid };
};

export default useValidation;
