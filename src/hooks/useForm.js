import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const errorsLength = Object.keys(formErrors).length;
		if (errorsLength === 0 && isSubmitting) {
			callback(); // submit when no errors and prevent from submitting on render
			setIsSubmitting(false);
		}
	}, [formErrors, callback, isSubmitting]);

	const changeHandler = (ev) => {
		const {name, value} = ev.target;
		setFormValues(oldFormValues => ({...oldFormValues, [name]: value }));
	};

	const submitHandler = (event) => {
		if (event) event.preventDefault();
		setIsSubmitting(true);
		setFormErrors(validate(formValues));
	};

	return {
		formValues,
		formErrors,
		submitHandler,
		changeHandler
	};
}

export default useForm;