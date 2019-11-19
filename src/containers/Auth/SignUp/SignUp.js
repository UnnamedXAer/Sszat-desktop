import React from 'react';
import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SignVendors from '../../../components/Auth/SignVendors/SignVendors';
import validate from '../../../utils/FormValidation/ValidationRules/SignUpValidationRules';
import { signUpFormFields as FormFields } from '../../../utils/FormValidation/ValidationRules/SignFormsFields';
import useForm from '../../../hooks/useForm';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions';

const appName = "sszat";

const SignUp = ({ signUp, submitError, submitLoading, redirectToSignIn }) => {

	const _signUp = () => {

		const payload = {
			"joinDate": new Date().toUTCString(),
			"lastActiveDate": new Date().toUTCString(),
			"name": formValues[FormFields.USER_NAME],
			"provider": "local",
			"email": formValues[FormFields.EMAIL_ADDRESS],
			"password": formValues[FormFields.PASSWORD]
		}

		signUp(payload);
	}

	const {
		formErrors,
		formValues,
		changeHandler,
		submitHandler
	} = useForm(_signUp, validate);

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
							<p style={{ width: "100%" }} onClick={redirectToSignIn}>
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

const mapStateToProps = (state) => ({
	submitLoading: state.auth.loading,
	submitError: state.auth.error
});

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (payload) => dispatch(actions.signUpUser(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);