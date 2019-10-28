import React, { useState } from 'react';
import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
// import Checkbox from '../../../components/UI/Checkbox/Checkbox';
import axios from '../../../axios/axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SignVendors from '../../../components/Auth/SignVendors/SignVendors';
import Validator from '../../../utils/validator/validator';

const appName = "sszat";

const ERRORS_TYPES = {
	PASSWORD_STRENGTH: "Password must be 6+ chars long, contain number and uppercase and lowercase letter.",
	PASSWORD_CONFIRMATION: "Password and Password Confirmation do not match.",
	EMAIL_FORMAT: "Email Address format is invalid.",
	EMAIL_CONFIRMATION: "Email Address and Email Address Confirmation do not match.",
}

const SignUp = ({ signed }) => {

	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [formValues, setFormValues] = useState({
		userName: "",
		emailAddress: "",
		confirmEmailAddress: "",
		password: "",
		confirmPassword: ""
	});

	const getPassword = () => formValues.password;

	const validator = new Validator([
		{
			name: 'userName',
			rules: ['required', 'alpha_num', 'min', 'notAllowed'],
			params: { min: 2, notAllowed: ['admin', 'administrator', 'moderator', 'null', 'undefined'] }
		},
		{
			name: 'emailAddress',
			rules: ['required', 'email']
		},
		{
			name: 'password',
			rules: ['required', 'min', 'password'],
			params: { password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, min: 6 }
		},
		{
			name: 'passwordConfirmation',
			rules: ['required', 'passwordConfirmation'],
			params: { passwordConfirmation: getPassword } // todo: wrong password passed
		}
	]);

	const inputChangeHandler = (ev) => {
		const name = ev.target.name;
		const value = ev.target.value;

		validator.validateField(name, value);

		setFormValues(previewsFormValues => {
			const updatedFormValues = {
				...previewsFormValues, 
				[name]: value
			};
			return updatedFormValues
		});
	};

	const formSubmitHandler = (ev) => {
		ev.preventDefault();
		validator.validateAll()
		const isFormValid = validate();

		if (isFormValid) {
			setSubmitLoading(true);
			tryToRegisterUser()
			.catch(err => {
				setSubmitLoading(false);
				console.log('err', err)
				setSubmitError("Ops, something went wrong.");
			});
		}
	};

	const validate = () => {
		let isValid = true;

		if (formValues.emailAddress !== formValues.confirmEmailAddress) {
			isValid = false;
		}
		else if (formValues.password !== formValues.confirmPassword) {
			isValid = false;
		}
		else if (new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/).test(formValues.emailAddress)) {
			isValid = false;
		}

		return isValid;
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
	}

	const checkIsEmailUnique = async () => {
		const { data } = await axios.get(`/users.json?orderBy="email"&equalTo="${formValues.emailAddress}"`);
		return Object.keys(data).length === 0;
	};

	const postUser = async () => {
		const { data } =  await axios.post("/users.json", {
			"joinDate": new Date().toUTCString(),
			"lastActiveDate": new Date().toUTCString(),
			"name": formValues.userName,
			"provider": "sszat",
			"email": formValues.emailAddress,
			"password": "temppasswordplaceholder"
		});

		return data.name ? data.name : null;
	};

	const getUser = async (id) => {
		const { data } = await axios.get(`/users/${id}.json`);
		return data;
	};

	// const validationErrors = formValues[].map((x, index) => {
	// 	return <li key={index}>{(x.param ? x.param + ": " : "") + x.msg}</li>
	// });

	const formOk = validator.allValid();

	return (
		<main className={classes.SignUp}>
			<div className={classes.SignUpContainer}>
				<div className={classes.FormContainer}>
					<h2>Sing Up</h2>
					<ul>
						{/* {validationErrors} */}
					</ul>
					{submitError && <p className={classes.SubmitError}>{submitError}</p>}
					<form onSubmit={formSubmitHandler}>
						<div className={classes.InputContainer}>
							<label
								htmlFor="userName"
							></label>
							<Input
								name="userName"
								type="text"
								value={formValues.userName}
								onChange={inputChangeHandler}
								required	
								placeholder="User Name"
								validator={validator}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label
								htmlFor="emailAddress"
							></label>
							<Input
								name="emailAddress"
								type="email"
								value={formValues.emailAddress}
								onChange={inputChangeHandler}
								required
								placeholder="Email Address"
								validator={validator}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label
								htmlFor="confirmEmailAddress"
							></label>
							<Input
								name="confirmEmailAddress"
								type="email"
								value={formValues.confirmEmailAddress}
								onChange={inputChangeHandler}
								required
								placeholder="Confirm Email Address"
								validator={validator}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor="password"></label>
							<Input
								name="password"
								type="password"
								value={formValues.password}
								onChange={inputChangeHandler}
								required
								placeholder="Password"
								validator={validator}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor="confirmPassword"></label>
							<Input
								name="confirmPassword"
								type="password"
								value={formValues.confirmPassword}
								onChange={inputChangeHandler}
								required
								placeholder="Confirm Password"
								validator={validator}
							/>
						</div>
						<div className={classes.FormLinksContainer}>
							<p style={{ width: "100%" }}>
								Already Signed to {appName}? <span className={classes.FakeLink}>Sign In</span>
							</p>
						</div>
						<div className={classes.SubmitContainer} >
							<div className={[classes.InputContainer, classes.StayLogged].join(" ")}>
								{/* placeholder */}
							</div>
							<Button btnType="Success" style={{ width: "100px" }} disabled={submitLoading || formOk}>{submitLoading ? <Spinner /> : "Sign Up"}</Button>
						</div>
					</form>
				</div>
				<SignVendors />
			</div>
		</main>
	);
};
export default SignUp;