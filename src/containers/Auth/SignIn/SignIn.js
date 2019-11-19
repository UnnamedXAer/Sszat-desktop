import React, { useState } from 'react';
import classes from './SignIn.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Checkbox from '../../../components/UI/Checkbox/Checkbox';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SignVendors from '../../../components/Auth/SignVendors/SignVendors';
import validate from '../../../utils/FormValidation/ValidationRules/SignInValidationRules';
import useForm from '../../../hooks/useForm';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

const appName = "sszat";

const SignIn = ({ signIn, loading, submitError, redirectToSignUp }) => {
	const [rememberUser, setRememberUser] = useState(true);
	const [tryCount, setTryCount] = useState(0);
	
	const _signIn = () => {
		console.info("Trying to signIn")
		setTryCount(prevCount => ++prevCount);
		signIn({
			'Email Address': formValues['Email Address'],
			'Password': formValues['Password']
		});
	};
	
	const { 
		formErrors,
		formValues,
		changeHandler,
		submitHandler
	} = useForm(_signIn, validate);

	const rememberUserChangeHandler = ev => {
		setRememberUser(ev.target.checked);
	}

	return (
		<main className={classes.SignIn}>
			<div className={classes.SignInContainer}>
				<div className={classes.FormContainer}>
					<h2>Sing In</h2>
					{submitError && <p className={classes.SubmitError}>{submitError}</p>}
					<form onSubmit={submitHandler}>
						<div className={classes.InputContainer}>
							<label
								htmlFor="Email Address"
							></label>
							<Input
								name="Email Address"
								value={formValues["Email Address"] || ""}
								onChange={changeHandler}
								// required
								placeholder="Email Address"
								error={formErrors["Email Address"]}
							/>
						</div>
						<div className={classes.InputContainer}>
							<label htmlFor="Password"></label>
							<Input
								name="Password"
								type="password"
								value={formValues["Password"] || ""}
								onChange={changeHandler}
								// required
								placeholder="Password"
								error={formErrors["Password"]}
							/>
						</div>
						<div className={classes.FormLinksContainer}>
							{tryCount > 0 && <p><span className={classes.FakeLink}>Remind password</span></p>}
							<p style={tryCount === 0 ? { width: "100%" } : {}} onClick={redirectToSignUp}>
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
							<Button btnType="Success" style={{ width: "100px" }}>{loading ? <Spinner /> : "Sign In"}</Button>
						</div>
					</form>
				</div>
				<SignVendors />
			</div>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		submitError: state.auth.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (credentials) => dispatch(actions.signInUser(credentials))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);