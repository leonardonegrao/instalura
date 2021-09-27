import React from 'react';

function formatErrors(yupErrors = []) {
  return yupErrors.reduce((errorObjectAcc, currentError) => {
    const fieldName = currentError.path;
    const errorMessage = currentError.message;

    return { ...errorObjectAcc, [fieldName]: errorMessage };
  }, {});
}

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = React.useState(initialValues);
  const [touchedFields, setTouchedFields] = React.useState({});
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);

      setErrors({});
      setIsFormDisabled(false);
    } catch (err) {
      const formattedErrors = formatErrors(err.inner);

      setErrors(formattedErrors);
      setIsFormDisabled(true);
    }
  }

  React.useEffect(() => {
    validateValues(values)
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
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
