import React, { useState } from 'react';
import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
// import Checkbox from '../../../components/UI/Checkbox/Checkbox';
import axios from '../../../axios/axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SignVendors from '../../../components/Auth/SignVendors/SignVendors';

const appName = "sszat";

const SignUp = ({ signed }) => {

	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [formValues, setFormValues] = useState({
		"User Name": "",
		"Email Address": "",
		"Confirm Email Address": "",
		"Password": "",
		"Confirm Password": ""
	});

	const inputChangeHandler = (ev) => {
		const name = ev.target.name;
		const value = ev.target.value;


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
		if (false) {
			setSubmitLoading(true);
			tryToRegisterUser()
			.catch(err => {
				setSubmitLoading(false);
				console.log('err', err)
				setSubmitError("Ops, something went wrong.");
			});
		}
	};

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

	return (
		<main className={classes.SignUp}>
			<div className={classes.SignUpContainer}>
				<div className={classes.FormContainer}>
					{submitError && <p className={classes.SubmitError}>{submitError}</p>}
					<form onSubmit={formSubmitHandler}>
						<h2>Sing Up</h2>
						<div className={classes.InputContainer}>
							<label
								htmlFor="User Name"
							></label>
							<Input
								name="User Name"
								type="text"
								value={formValues["User Name"]}
								onChange={inputChangeHandler}
								required	
								placeholder="User Name"
							/>
						</div>
						<div className={classes.InputContainer}>
							<label
								htmlFor="Email Address"
							></label>
							<Input
								name="Email Address"
								type="email"
								value={formValues["Email Address"]}
								onChange={inputChangeHandler}
								required
								placeholder="Email Address"
							/>
						</div>
						<div className={classes.InputContainer}>
							<label
								htmlFor="Confirm Email Address"
							></label>
							<Input
								name="Confirm Email Address"
								type="email"
								value={formValues["Confirm Email Address"]}
								onChange={inputChangeHandler}
								required
								placeholder="Confirm Email Address"
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor="Password"></label>
							<Input
								name="Password"
								type="password"
								value={formValues["Password"]}
								onChange={inputChangeHandler}
								required
								placeholder="Password"
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor="Confirm Password"></label>
							<Input
								name="Confirm Password"
								type="password"
								value={formValues["Confirm Password"]}
								onChange={inputChangeHandler}
								required
								placeholder="Confirm Password"
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