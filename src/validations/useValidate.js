

import {useState, useEffect} from 'react';


const useValidate = (schema) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    schema.isValid(true).then(setIsValid);
  }, [schema]);

  const validate = async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return { errors, isValid, validate };
};

export default useValidate;