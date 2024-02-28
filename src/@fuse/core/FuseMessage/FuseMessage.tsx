import { memo } from 'react';
import { useSelector } from 'react-redux';
import { amber, blue, green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import {
	fuseMessageSlice,
	hideMessage,
	selectFuseMessageOptions,
	selectFuseMessageState
} from '@root/@fuse/core/FuseMessage/store/fuseMessageSlice';

import { useAppDispatch } from '@root/store/store';
import withSlices from '@root/store/withSlices';

import FuseSvgIcon from '../FuseSvgIcon';

export type FuseMessageVariantType = 'success' | 'error' | 'warning' | 'info';

type StyledSnackbarProps = {
	variant?: FuseMessageVariantType;
};

const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>(({ theme, variant }) => ({
	'& .FuseMessage-content': {
		...(variant === 'success' && {
			backgroundColor: green[600],
			color: '#FFFFFF'
		}),

		...(variant === 'error' && {
			backgroundColor: theme.palette.error.dark,
			color: theme.palette.getContrastText(theme.palette.error.dark)
		}),

		...(variant === 'info' && {
			backgroundColor: blue[600],
			color: '#FFFFFF'
		}),

		...(variant === 'warning' && {
			backgroundColor: amber[600],
			color: '#FFFFFF'
		})
	}
}));

const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info'
};

/**
 * FuseMessage
 * The FuseMessage component holds a snackbar that is capable of displaying message with 4 different variant. It uses the @mui/material React packages to create the components.
 */
function FuseMessage() {
	const dispatch = useAppDispatch();
	const state = useSelector(selectFuseMessageState);
	const options = useSelector(selectFuseMessageOptions);

	return (
		<StyledSnackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
		>
			<SnackbarContent
				className="FuseMessage-content"
				message={
					<div className="flex items-center">
						{variantIcon[options.variant] && (
							<FuseSvgIcon color="inherit">{variantIcon[options.variant]}</FuseSvgIcon>
						)}
						<Typography className="mx-8">{options.message}</Typography>
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => dispatch(hideMessage())}
						size="large"
					>
						<FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
					</IconButton>
				]}
			/>
		</StyledSnackbar>
	);
}

export default withSlices([fuseMessageSlice])(memo(FuseMessage));