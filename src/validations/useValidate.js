import { useCallback, useState } from "react";

const useValidate = (schema) => {
  const [errors, setErrors] = useState({});

  const validate = useCallback((data) => {
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
  }, [schema]);

  return { errors, validate };
};

export default useValidate;
