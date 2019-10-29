const ERRORS_TYPES = {
	PASSWORD_STRENGTH: "The Password minimum 6 chars long, contain lowercase, uppercase letter, number and special character.",
	CONFIRMATION_MISMATCH: ":FIELD_NAMEs do not match.",
	EMAIL_FORMAT: "Email Address format is invalid.",
	EMAIL_CONFIRMATION: "Email Address and Email Address Confirmation do not match.",
	FIELD_REQUIRED: ":FIELD_NAME is required.",
	NOT_ALLOWED_VALUE: ":VALUE is not allowed.",
	FIELD_MIN_LENGTH: "Minimal length is :LENGTH.",
	FIELD_MAX_LENGTH: "Maximum length is :LENGTH.",
	ALPHA_NUM_SPACE: "The :FIELD_NAME may only contain letters, numbers, underscores, dashes and spaces."
}

export default ERRORS_TYPES;