const showReduxLogs = process.env.REACT_APP_SHOW_REDUX_LOGS === "true";

const logger = store => next => action => {
	if (showReduxLogs) {
		console.group(action.type);
		console.log('dispatch: ', action);
		const result = next(action);
		console.log("next state: ", store.getState());
		console.groupEnd();
		return result;
	}
	
	return next(action);
}
export default logger;