import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet, View } from "react-native";

function Screen({ children, headerAbove, style, viewStyle }) {
	const headerAboveStyle = headerAbove && { paddingTop: 0 };

	return (
		<SafeAreaView style={[styles.screen, headerAboveStyle, style]}>
			<View style={[styles.view, viewStyle]}>{children}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	view: {
		flex: 1,
	},
});

export default Screen;
