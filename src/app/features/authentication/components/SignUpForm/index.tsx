import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import Form from './Form';

/**
 * The sign up page.
 */
function SignUpForm() {
	return (
		<div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
			<img
				className="w-48"
				src="assets/images/logo/logo.svg"
				alt="logo"
			/>

			<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">Sign up</Typography>
			<div className="mt-2 flex items-baseline font-medium">
				<Typography>Already have an account?</Typography>
				<Link
					className="ml-4"
					to="/sign-in"
				>
					Sign in
				</Link>
			</div>

			<Form />
		</div>
	);
}

export default SignUpForm;
