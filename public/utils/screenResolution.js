const getMainScreenResolution = async () => {
    try {
        const { displays } = await require("systeminformation").graphics();
        const { currentResX, currentResY } = displays.find(x => x.main);
        console.log("currentResX: %s, currentResY: %s", currentResX, currentResY);
        return { currentResX, currentResY };
    }
    catch (err) {
		console.log('getMainScreenResolution error', err);
        return null;
    }
}

module.exports = getMainScreenResolution();