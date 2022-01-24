import Constants from "expo-constants";

const settings = {
	dev: {
		apiUrl: "http://192.168.43.71:9000/api",
	},
	staging: {
		apiUrl: "https://fierce-springs-44768.herokuapp.com/api",
	},
	prod: {
		apiUrl: "https://fierce-springs-44768.herokuapp.com/api",
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	else if (Constants.manifest.releaseChannel === "staging")
		return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
