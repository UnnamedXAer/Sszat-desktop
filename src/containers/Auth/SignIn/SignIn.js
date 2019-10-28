import React, { useState } from 'react';
import classes from './SignIn.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Checkbox from '../../../components/UI/Checkbox/Checkbox';
import axios from '../../../axios/axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SignVendors from '../../../components/Auth/SignVendors/SignVendors';

const appName = "sszat";

const SignIn = ({ signed }) => {

	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [rememberUser, setRememberUser] = useState(true);
	const [tryCount, setTryCount] = useState(0);

	const loginChangeHandler = (ev) => {
		setLogin(ev.target.value);
	};

	const passwordChangeHandler = (ev) => {
		setPassword(ev.target.value);
	};

	const rememberUserChangeHandler = ev => {
		setRememberUser(ev.target.checked);
	}

	const formSubmitHandler = (ev) => {
		ev.preventDefault();
		setTryCount(prevCount => ++prevCount);
		setSubmitLoading(true)
		axios.get(`/users.json?orderBy="name"&equalTo="${login}"`)
			.then(res => {
				console.log('res.data', res)
				const userIds = Object.keys(res.data);
				if (userIds.length === 0) {
					setSubmitError("Login or Password is incorrect.");
					setSubmitLoading(false);
				}
				else {
					const user = { ...res.data[userIds[0]], id: userIds[0] };
					signed(user);
				}
			})
			.catch(err => {
				console.log('err', err)
				setSubmitError("Ops, something went wrong.");
				setSubmitLoading(false);

			});
	};

	return (
		<main className={classes.SignIn}>
			<div className={classes.SignInContainer}>
				<div className={classes.FormContainer}>
					<h2>Sing In</h2>
					{submitError && <p className={classes.SubmitError}>{submitError}</p>}
					<form onSubmit={formSubmitHandler}>
						<div className={classes.InputContainer}>
							<label
								htmlFor="login"
							></label>
							<Input
								name="login"
								value={login}
								onChange={loginChangeHandler}
								required
								placeholder="Email or Login"
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor="password"></label>
							<Input
								name="password"
								type="password"
								value={password}
								onChange={passwordChangeHandler}
								required
								placeholder="Password"
							/>
						</div>
						<div className={classes.FormLinksContainer}>
							{tryCount > 0 && <p><span className={classes.FakeLink}>Remind password</span></p>}
							<p style={tryCount === 0 ? { width: "100%" } : {}}>
								New to {appName}? <span className={classes.FakeLink}>Sign Up</span>
							</p>
						</div>
						<div className={classes.SubmitContainer} >
							<div className={[classes.InputContainer, classes.StayLogged].join(" ")}>
								<Checkbox
									label="Remember me."
									title="Do not sign out when application is closed."
									name="rememberUser"
									checked={rememberUser}
									onChange={rememberUserChangeHandler}
								/>
							</div>
							<Button btnType="Success" style={{ width: "100px" }}>{submitLoading ? <Spinner /> : "Sign In"}</Button>
						</div>
					</form>
				</div>
				<SignVendors />
			</div>
		</main>
	);
};
export default SignIn;