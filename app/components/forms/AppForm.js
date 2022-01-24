import React from "react";
import { Formik } from "formik";

function AppForm({ initialValues, children, onSubmit, validationSchema }) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => <>{children}</>}
		</Formik>
	);
}

export default AppForm;
