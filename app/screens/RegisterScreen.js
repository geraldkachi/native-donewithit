import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import {
	AppForm,
	AppFormField,
	ErrorMessage,
	SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import logger from "../utility/logger";

const validationSchema = Yup.object().shape({
	name: Yup.string().required().min(1).label("Name"),
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen(props) {
	const registerApi = useApi(usersApi.register);
	const loginApi = useApi(authApi.login);
	const auth = useAuth();
	const [error, setError] = useState();

	const handleSubmit = async (userInfo) => {
		try {
			const result = await registerApi.request(userInfo);
			if (!result.ok) {
				if (result.data) setError(result.data.error);
				else {
					setError("An unexpected error occured.");
				}
				return;
			}

			const { data: authToken } = await loginApi.request(
				userInfo.email,
				userInfo.password
			);
			auth.login(authToken);
		} catch (error) {
			logger.log(error);
		}
	};

	return (
		<>
			<ActivityIndicator
				visible={registerApi.loading || loginApi.loading}
			/>
			<Screen style={styles.container}>
				<AppForm
					initialValues={{ email: "", name: "", password: "" }}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<ErrorMessage error={error} visible={error} />
					<AppFormField
						autoCapitalize="words"
						icon="account"
						name="name"
						placeholder="Name"
					/>
					<AppFormField
						autoCapitalize="none"
						autoCorrect={false}
						icon="email"
						keyboardType="email-address"
						name="email"
						placeholder="Email"
						textContentType="emailAddress"
					/>
					<AppFormField
						autoCapitalize="none"
						autoCorrect={false}
						icon="lock"
						name="password"
						placeholder="Password"
						secureTextEntry
						textContentType="password"
					/>
					<SubmitButton title="Register" />
				</AppForm>
			</Screen>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	logo: {
		width: 80,
		height: 80,
		alignSelf: "center",
		marginTop: 50,
		marginBottom: 20,
	},
});

export default RegisterScreen;
