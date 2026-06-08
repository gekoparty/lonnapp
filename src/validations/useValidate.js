import { useState } from "react";

const useValidate = (schema) => {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    try {
      schema.validateSync(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      const fieldErrors = err.inner?.length ? err.inner : [err];

      fieldErrors.forEach((error) => {
        validationErrors[error.path] = error.message;
      });

      setErrors(validationErrors);
      return false;
    }
  };

  return { errors, validate };
};

export default useValidate;
