import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import FuseSvgIcon from '@root/@fuse/core/FuseSvgIcon';

import Form from './Form';

function SignInForm() {
	return (
		<CardContent className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
			<img
				className="w-48"
				src="assets/images/logo/logo.svg"
				alt="logo"
			/>

			<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">Sign in</Typography>
			<div className="mt-2 flex items-baseline font-medium">
				<Typography>Don't have an account?</Typography>
				<Link
					className="ml-4"
					to="/sign-up"
				>
					Sign up
				</Link>
			</div>

			<Alert
				icon={false}
				severity="info"
				className="mt-24 px-16 text-13 leading-relaxed"
			>
				You are browsing <b>Fuse React Demo</b>. Click on the "Sign in" button to access the Demo and
				Documentation.
			</Alert>

			<Form />

			<div className="mt-32 flex items-center">
				<div className="mt-px flex-auto border-t" />
				<Typography
					className="mx-8"
					color="text.secondary"
				>
					Or continue with
				</Typography>
				<div className="mt-px flex-auto border-t" />
			</div>

			<div className="mt-32 flex items-center space-x-16">
				<Button
					variant="outlined"
					className="flex-auto"
				>
					<FuseSvgIcon
						size={20}
						color="action"
					>
						feather:facebook
					</FuseSvgIcon>
				</Button>
				<Button
					variant="outlined"
					className="flex-auto"
				>
					<FuseSvgIcon
						size={20}
						color="action"
					>
						feather:twitter
					</FuseSvgIcon>
				</Button>
				<Button
					variant="outlined"
					className="flex-auto"
				>
					<FuseSvgIcon
						size={20}
						color="action"
					>
						feather:github
					</FuseSvgIcon>
				</Button>
			</div>
		</CardContent>
	);
}

export default SignInForm;
