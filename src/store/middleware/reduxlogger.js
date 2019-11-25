const logger  = state => next => action => {
	console.log('dispatch: ', action);

	const result = next(action);
	
}