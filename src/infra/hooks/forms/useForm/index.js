import React from 'react';

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = React.useState(initialValues);
  const [touchedFields, setTouchedFields] = React.useState({});
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    validateSchema(values)
      .then(() => {
        setErrors({});
        setIsFormDisabled(false);
      })
      .catch((err) => {
        const formattedErrors = err.inner.reduce((errorObjectAcc, currentError) => {
          const fieldName = currentError.path;
          const errorMessage = currentError.message;

          return { ...errorObjectAcc, [fieldName]: errorMessage };
        }, {});

        setErrors(formattedErrors);
        setIsFormDisabled(true);
      });
  }, [values]);

  return {
    values,
    isFormDisabled,
    setIsFormDisabled,
    errors,
    touchedFields,
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;
      setValues(() => ({
        ...values,
        [fieldName]: value,
      }));
    },
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');

      setTouchedFields({ ...touchedFields, [fieldName]: true });
    },
  };
}
