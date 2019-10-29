import React, { useState } from 'react';
import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios/axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SignVendors from '../../../components/Auth/SignVendors/SignVendors';
import validate from '../../../utils/FormValidation/ValidationRules/SignUpValidationRules';
import { signUpFormFields as FormFields } from '../../../utils/FormValidation/ValidationRules/SignFormsFields';
import useForm from '../../../hooks/useForm';

const appName = "sszat";

const SignUp = ({ signed }) => {

	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const signUp = () => {
		setSubmitLoading(true);
		tryToRegisterUser()
			.catch(err => {
				setSubmitLoading(false);
				console.log('err', err)
				setSubmitError("Ops, something went wrong.");
			});
	}

	const tryToRegisterUser = async () => {
		try {
			let createdUserId;
			const isEmailUnique = await checkIsEmailUnique();
			if (isEmailUnique) {
				createdUserId = await postUser();
				if (createdUserId) {
					const user = await getUser(createdUserId);
					if (user) {
						signed(user);
					}
				}
			}
			else {
				setSubmitError("Email address already in use.");
			}
		}
		catch (err) {
			console.log('err', err)
			setSubmitError("Ops, something went wrong.");
		}
	};

	const {
		formErrors,
		formValues,
		changeHandler,
		submitHandler
	} = useForm(signUp, validate);

	const checkIsEmailUnique = async () => {
		const email = formValues[FormFields.EMAIL_ADDRESS];
		const { data } = await axios.get(`/users.json?orderBy="email"&equalTo="${email}"`);
		const userCount = Object.keys(data).length;
		return userCount === 0;
	};

	const postUser = async () => {
		const payload = {
			"joinDate": new Date().toUTCString(),
			"lastActiveDate": new Date().toUTCString(),
			"name": formValues[FormFields.USER_NAME],
			"provider": "sszat",
			"email": formValues[FormFields.EMAIL_ADDRESS],
			"password": formValues[FormFields.PASSWORD]
		}
		const { data } = await axios.post("/users.json", {...payload});

		return data.name ? data.name : null;
	};

	const getUser = async (id) => {
		const { data } = await axios.get(`/users/${id}.json`);
		return data;
	};

	return (
		<main className={classes.SignUp}>
			<div className={classes.SignUpContainer}>
				<div className={classes.FormContainer}>
					<form onSubmit={submitHandler}>
						<h2>Sing Up</h2>
						<div className={classes.InputContainer}>
							<label
								htmlFor={FormFields.USER_NAME}
							></label>
							<Input
								name={FormFields.USER_NAME}
								type="text"
								value={formValues[FormFields.USER_NAME] || ""}
								onChange={changeHandler}
								placeholder={FormFields.USER_NAME}
								error={formErrors[FormFields.USER_NAME]}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label
								htmlFor={FormFields.EMAIL_ADDRESS}
							></label>
							<Input
								name={FormFields.EMAIL_ADDRESS}
								type="text"
								value={formValues[FormFields.EMAIL_ADDRESS] || ""}
								onChange={changeHandler}
								placeholder={FormFields.EMAIL_ADDRESS}
								error={formErrors[FormFields.EMAIL_ADDRESS]}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label
								htmlFor={FormFields.CONFIRM_EMAIL_ADDRESS}
							></label>
							<Input
								name={FormFields.CONFIRM_EMAIL_ADDRESS}
								type="text"
								value={formValues[FormFields.CONFIRM_EMAIL_ADDRESS] || ""}
								onChange={changeHandler}
								placeholder={FormFields.CONFIRM_EMAIL_ADDRESS}
								error={formErrors[FormFields.CONFIRM_EMAIL_ADDRESS]}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor={FormFields.PASSWORD}></label>
							<Input
								name={FormFields.PASSWORD}
								type="password"
								value={formValues[FormFields.PASSWORD] || ""}
								onChange={changeHandler}
								placeholder={FormFields.PASSWORD}
								error={formErrors[FormFields.PASSWORD]}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor={FormFields.CONFIRM_PASSWORD}></label>
							<Input
								name={FormFields.CONFIRM_PASSWORD}
								type="password"
								value={formValues[FormFields.CONFIRM_PASSWORD] || ""}
								onChange={changeHandler}
								placeholder={FormFields.CONFIRM_PASSWORD}
								error={formErrors[FormFields.CONFIRM_PASSWORD]}
							/>
						</div>
						<div className={classes.FormLinksContainer}>
							<p style={{ width: "100%" }}>
								Already Signed to {appName}? <span className={classes.FakeLink}>Sign In</span>
							</p>
						</div>
						{submitError && <p className={classes.SubmitError}>{submitError}</p>}
						<div className={classes.SubmitContainer} >
							<div className={[classes.InputContainer, classes.StayLogged].join(" ")}>
								{/* placeholder */}
							</div>
							<Button btnType="Success" style={{ width: "100px" }} disabled={submitLoading}>{submitLoading ? <Spinner /> : "Sign Up"}</Button>
						</div>
					</form>
				</div>
				<SignVendors />
			</div>
		</main>
	);
};
export default SignUp;