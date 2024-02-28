import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';

import FuseSvgIcon from '@root/@fuse/core/FuseSvgIcon';
import { usePrevious } from '@root/@fuse/hooks';
import ThemesPanel from '@root/@fuse/theme-layouts/shared-components/configurator/ThemesPanel';

import { useAuth } from '@root/app/features/authentication/contexts/AuthRouteProvider';
import { selectIsUserGuest, selectUserSettings } from '@root/app/features/user/store/userSlice';
import _ from '@root/app/libs/@lodash';

const Root = styled('div')(({ theme }) => ({
	position: 'absolute',
	height: 80,
	right: 0,
	top: 160,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
	padding: 0,
	borderTopLeftRadius: 6,
	borderBottomLeftRadius: 6,
	borderBottomRightRadius: 0,
	borderTopRightRadius: 0,
	zIndex: 999,
	color: theme.palette.getContrastText(red[500]),
	backgroundColor: red[400],
	'&:hover': {
		backgroundColor: red[500]
	},

	'@keyframes rotating': {
		from: {
			transform: 'rotate(0deg)'
		},
		to: {
			transform: 'rotate(360deg)'
		}
	}
}));

/**
 * The settings panel.
 */
function Configurator() {
	const theme = useTheme();
	const [open, setOpen] = useState('');
	const isUserGuest = useSelector(selectIsUserGuest);
	const userSettings = useSelector(selectUserSettings);
	const prevUserSettings = usePrevious(userSettings);

	const { updateUser } = useAuth();

	useEffect(() => {
		if (!isUserGuest && prevUserSettings && !_.isEqual(userSettings, prevUserSettings)) {
			updateUser({ data: { settings: userSettings } });
		}
	}, [isUserGuest, userSettings]);

	const handlerOptions = {
		onSwipedLeft: () => Boolean(open) && theme.direction === 'rtl' && handleClose(),
		onSwipedRight: () => Boolean(open) && theme.direction === 'ltr' && handleClose()
	};

	const schemesHandlers = useSwipeable(handlerOptions);

	const handleOpen = (panelId: string) => {
		setOpen(panelId);
	};

	const handleClose = () => {
		setOpen('');
	};

	return (
		<>
			<Root
				id="fuse-settings-panel"
				className="buttonWrapper"
			>
				<Button
					className="m-0 h-40 w-40 min-w-40"
					onClick={() => handleOpen('schemes')}
					variant="text"
					color="inherit"
					disableRipple
				>
					<FuseSvgIcon size={20}>heroicons-outline:color-swatch</FuseSvgIcon>
				</Button>
			</Root>
			<ThemesPanel
				schemesHandlers={schemesHandlers}
				onClose={handleClose}
				open={Boolean(open === 'schemes')}
			/>
		</>
	);
}

export default memo(Configurator);
