const logSocketMessage = (key, data, type) => {
	const color = type === "emit" ? "green" : "blue";
	console.log(`---[socket.client]: %c${type} %c${key}%c data: %o`,
		`color: #e08300; font-weight: normal`,
		`color: ${color}; font-weight: bold`,
		"color: initial; font-weight: normal",
		data
	);
};

export default logSocketMessage;