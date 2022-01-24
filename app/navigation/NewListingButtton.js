import React from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NewListingButtton({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<MaterialCommunityIcons
					name="plus-circle"
					color={colors.white}
					size={40}
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.primary,
		borderColor: colors.white,
		borderRadius: 40,
		borderWidth: 10,
		bottom: 22,
		height: 80,
		justifyContent: "center",
		width: 80,
	},
	feedback: {
		borderRadius: 9999,
		overflow: "hidden",
	},
});

export default NewListingButtton;
