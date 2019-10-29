import ErrorTypes from '../FormErrorsTypes';
import { signInFormFields as FormFields } from './SignFormsFields';


export default function validate(formValues) {
	let errors = {};

	const emailAddressRegExp = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

	if (!formValues[FormFields.EMAIL_ADDRESS]) {
		errors[FormFields.EMAIL_ADDRESS] = ErrorTypes.FIELD_REQUIRED.replace(":FIELD_NAME", FormFields.EMAIL_ADDRESS);
	}
	else if (!emailAddressRegExp.test(formValues[FormFields.EMAIL_ADDRESS])) {
		errors[FormFields.EMAIL_ADDRESS] = ErrorTypes.EMAIL_FORMAT;
	}

	if (!formValues[FormFields.PASSWORD]) {
		errors[FormFields.PASSWORD] = ErrorTypes.FIELD_REQUIRED.replace(":FIELD_NAME", FormFields.PASSWORD);
	}

	return errors;
}