import React from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	ScrollView,
	View,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import { ListItem } from "../components/lists";

function ListingDetailsScreen({ route }) {
	const listing = route.params;

	return (
		<ScrollView>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
			>
				<Image
					style={styles.image}
					preview={{ uri: listing.images[0].thumbnailUrl }}
					tint="light"
					uri={listing.images[0].url}
				/>
				<View style={styles.detailsContainer}>
					<AppText style={styles.title}>{listing.title}</AppText>
					<AppText style={styles.price}>${listing.price}</AppText>
					<View style={styles.userContainer}>
						<ListItem
							image={require("../assets/mosh.jpg")}
							title="Mosh Hamedani"
							subTitle="5 Listings"
						/>
					</View>
					<View style={styles.formContainer}>
						<ContactSellerForm listing={listing} />
					</View>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	detailsContainer: {
		padding: 20,
	},
	formContainer: {
		marginBottom: 20,
	},
	image: {
		width: "100%",
		height: 300,
	},
	price: {
		color: colors.secondary,
		fontWeight: "bold",
		fontSize: 18,
		marginVertical: 10,
	},
	title: {
		fontSize: 22,
		fontWeight: "500",
	},
	userContainer: {
		marginVertical: 40,
	},
});

export default ListingDetailsScreen;
