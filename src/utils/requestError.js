export const getErrorMessage = (err)  => {
	let errorMessage = "Ops, something went wrong. Try again later.";
	if (err.response && err.response.status) {
		if (err.response.status === 406) {
			errorMessage = err.response.data.message;
		}
	}
	return errorMessage;
};