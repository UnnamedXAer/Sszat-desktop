import ErrorTypes from '../FormErrorsTypes';
import { signUpFormFields as FormFields } from './SignFormsFields';

export default function validate(formValues) {
	let errors = {};

	/// User Name
	const notAllowedUserNameValues = ["admin", "administrator", "moderator", "null", "undefined", "mod"];
	const alpha_num_space_underscore_dash_regExp = /^[A-Z0-9_\-\s+]*$/i;
	const userNameMinLength = 2;
	const userNameMaxLength = 50;
	if (!(formValues[FormFields.USER_NAME])) {
		errors[FormFields.USER_NAME] = ErrorTypes.FIELD_REQUIRED.replace(":FIELD_NAME", FormFields.USER_NAME);
	}
	else if ((formValues[FormFields.USER_NAME]).length < userNameMinLength) {
		errors[FormFields.USER_NAME] = ErrorTypes.FIELD_MIN_LENGTH.replace(":LENGTH", userNameMinLength);
	}
	else if ((formValues[FormFields.USER_NAME]).length > userNameMaxLength) {
		errors[FormFields.USER_NAME] = ErrorTypes.FIELD_MAX_LENGTH.replace(":LENGTH", userNameMaxLength);
	}
	else if (!alpha_num_space_underscore_dash_regExp.test(formValues[FormFields.USER_NAME])) {
		errors[FormFields.USER_NAME] = ErrorTypes.ALPHA_NUM_SPACE.replace(":FIELD_NAME", FormFields.USER_NAME);
	}
	else {
		const notAllowedValueIndex = notAllowedUserNameValues.indexOf(formValues[FormFields.USER_NAME]);
		if (notAllowedValueIndex !== -1) {
			errors[FormFields.USER_NAME] = ErrorTypes.NOT_ALLOWED_VALUE.replace(":VALUE", notAllowedUserNameValues[notAllowedValueIndex]);
		}
	}

	/// Email Address
	const emailAddressRegExp = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	if (!(formValues[FormFields.EMAIL_ADDRESS])) {
		errors[FormFields.EMAIL_ADDRESS] = ErrorTypes.FIELD_REQUIRED.replace(":FIELD_NAME", FormFields.EMAIL_ADDRESS);
	}
	else if (!emailAddressRegExp.test(formValues[FormFields.EMAIL_ADDRESS])) {
		errors[FormFields.EMAIL_ADDRESS] = ErrorTypes.EMAIL_FORMAT;
	}

	/// Confirm Email
	if (formValues[FormFields.EMAIL_ADDRESS] !== formValues[FormFields.CONFIRM_EMAIL_ADDRESS]) {
		errors[FormFields.CONFIRM_EMAIL_ADDRESS] = ErrorTypes.CONFIRMATION_MISMATCH.replace(":FIELD_NAME", FormFields.EMAIL_ADDRESS);
	}

	/// Password
	const passwordMinLength = 6;
	const passwordMaxLength = 128;
	// eslint-disable-next-line no-useless-escape
	const passwordRegExp = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\.\(\)\[\:\;\'\"\,\<\.\>\/\?\[\])(?=.{${passwordMinLength},})`);
	if (!formValues[FormFields.PASSWORD]) {
		errors[FormFields.PASSWORD] = ErrorTypes.FIELD_REQUIRED.replace(":FIELD_NAME", FormFields.PASSWORD);
	}
	else if ((formValues[FormFields.PASSWORD]).length > passwordMaxLength) {
		errors[FormFields.PASSWORD] = ErrorTypes.FIELD_MAX_LENGTH.replace(":LENGTH", passwordMaxLength);
	}
	else if (!passwordRegExp.test(formValues[FormFields.PASSWORD])) {
		errors[FormFields.PASSWORD] = ErrorTypes.PASSWORD_STRENGTH;
	}
	
	/// Confirm Password
	if (formValues[FormFields.PASSWORD] !== formValues[FormFields.CONFIRM_PASSWORD]) {
		errors[FormFields.CONFIRM_PASSWORD] = ErrorTypes.CONFIRMATION_MISMATCH.replace(":FIELD_NAME", FormFields.PASSWORD);
	}
	
	return errors;
}