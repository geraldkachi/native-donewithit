import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
	// Calling multiple apis
	// const getListingsApi = useApi(listingsApi.getListings())

	// useEffect(() => {
	// 	getListingsApi.request.loadListings();
	// }, []);

	// Calling a single api
	const {
		data: listings,
		error,
		loading,
		request: loadListings,
	} = useApi(listingsApi.getListings);

	useEffect(() => {
		loadListings();
	}, []);

	return (
		<>
			<ActivityIndicator visible={loading} />
			<Screen style={styles.screen} viewStyle={styles.view}>
				{error && !loading && (
					<View style={styles.error}>
						<AppText>Couldn't retrieve the listings</AppText>
						<AppButton title="Retry" onPress={loadListings} />
					</View>
				)}
				{!error && (
					<FlatList
						data={listings}
						keyExtractor={(listing) => listing.id.toString()}
						renderItem={({ item }) => (
							<Card
								imageUrl={item.images[0].url}
								onPress={() =>
									navigation.navigate(
										routes.LISTING_DETAILS,
										item
									)
								}
								subTitle={"$" + item.price}
								title={item.title}
								thumbnailUrl={item.images[0].thumbnailUrl}
							/>
						)}
					/>
				)}
			</Screen>
		</>
	);
}

const styles = StyleSheet.create({
	error: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	screen: {
		padding: 20,
		backgroundColor: colors.light,
	},
	view: {
		paddingTop: 20,
	},
});

export default ListingsScreen;
