const userStatuses = {
	ACTIVE: "Active",
	AFK: "Away from keyboard",
	OFFLINE: "Offline"
};
export default userStatuses;

export const updateUserStatus = (now, user) => {
	let status = userStatuses.ACTIVE;
	if (user.isOnline) {
		const activeTime = user.lastActiveOn;
		if (now - 0.1 * 1000 * 60 > activeTime) {
			status = userStatuses.AFK;
		}
	}
	else {
		status = userStatuses.OFFLINE;
	}

	user.status = status;
	return user;
}