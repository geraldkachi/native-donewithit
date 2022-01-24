import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
	ListItem,
	ListItemDeleteAction,
	ListItemSeparator,
} from "../components/lists";
import Screen from "../components/Screen";

const data = [
	{
		id: 1,
		title: "Mosh Hamedani",
		description: "Hey! Is this item still available?",
		image: require("../assets/mosh.jpg"),
	},
	{
		id: 2,
		title: "John Smith",
		description:
			"I'm interested in this item, when will you be able to post it?",
		image: require("../assets/mosh.jpg"),
	},
];

function MessagesScreen() {
	const [messages, setMessages] = useState(data);
	const [refreshing, setRefreshing] = useState(false);

	const handleDelete = (message) => {
		const newMessages = messages.filter((m) => m.id !== message.id);
		setMessages(newMessages);
	};

	return (
		<Screen headerAbove>
			<FlatList
				data={messages}
				keyExtractor={(message) => message.id.toString()}
				renderItem={({ item }) => (
					<ListItem
						onPress={() =>
							console.log("Message selected:", item.title)
						}
						title={item.title}
						subTitle={item.description}
						image={item.image}
						renderRightActions={() => (
							<ListItemDeleteAction
								onPress={() => handleDelete(item)}
							/>
						)}
					/>
				)}
				ItemSeparatorComponent={ListItemSeparator}
				refreshing={refreshing}
				onRefresh={() => {
					setMessages([
						{
							id: 2,
							title: "John Smith",
							description:
								"I'm interested in this item, when will you be able to post it?",
							image: require("../assets/mosh.jpg"),
						},
					]);
				}}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});

export default MessagesScreen;
