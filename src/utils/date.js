const options = {
	month: '2-digit',
	day: '2-digit', 
	year: '2-digit', 
	hour: '2-digit', 
	minute: '2-digit', 
	second: '2-digit', 
	hour12: false
};

export function toDate(date) {
	if (date instanceof Date) {
		return date.toLocaleString(navigator.language, options);
	}
	else {
		return new Date(date).toLocaleString(navigator.language, options);
	}
}