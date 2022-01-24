import React, { useEffect } from "react";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import logger from "../utility/logger";

import colors from "../config/colors";

function ImageInput({ imageUri, onChangeImage }) {
	useEffect(() => {
		requestPermission();
	}, []);

	const requestPermission = async () => {
		try {
			const { granted } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (!granted)
				alert("You need to enable permission to access the library");
		} catch (error) {
			logger.log(error);
		}
	};
	const handlePress = () => {
		if (!imageUri) selectImage();
		else
			Alert.alert(
				"Delete",
				"Are you sure you want to delete this image?",
				[
					{
						text: "Yes",
						onPress: () => onChangeImage(null),
					},
					{ text: "No" },
				]
			);
		return;
	};

	const selectImage = async () => {
		// Whenever I set quality to < 1, it crashes on my android
		// device
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			});

			if (!result.cancelled) {
				onChangeImage(result.uri);
				return;
			}
		} catch (error) {
			logger.log(error);
		}
	};

	return (
		<Pressable onPress={handlePress}>
			<View style={styles.container}>
				{!imageUri && (
					<MaterialCommunityIcons
						color={colors.medium}
						name="camera"
						size={40}
					/>
				)}
				{imageUri && (
					<Image source={{ uri: imageUri }} style={styles.image} />
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.light,
		borderRadius: 15,
		height: 100,
		overflow: "hidden",
		justifyContent: "center",
		width: 100,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default ImageInput;
