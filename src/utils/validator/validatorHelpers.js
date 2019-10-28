/**
 * Check if given string is correct date.
 */
export function isCorrectDate(date) { // do not work for GMT
	const d = new Date(date);
	let month = d.getMonth() + 1;
	if (month < 10) month = "0" + month;
	let day = d.getDate();
	if (day < 10) day = "0" + day;
	let parsedDate = d.getFullYear() + '-' + month + '-' + day;
	if (date.length > 10) {
		let hh = d.getHours();
		if (hh < 10) hh = "0" + hh;
		let mm = d.getMinutes();
		if (mm < 10) mm = "0" + mm;
		parsedDate += 'T' + hh + ":" + mm;
	}
	return date === parsedDate;
}

/**
 * Check if date is between yesterday nad 100 years ago.
 */
export function isDob(date) {
	const dob = Date.parse(date);
	const today = Date.now();
	let yesterday = new Date(today - 24 * 60 * 60 * 1000);
	yesterday.setFullYear(yesterday.getFullYear() - 100); // 100 years in past
	return dob <= today && dob > yesterday;
}
/**
 * Remove leading and trailing spaces.
 * 
 * @param {String} txt
 * @returns {String}
 */
export function trim(txt) {
	return txt.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
}