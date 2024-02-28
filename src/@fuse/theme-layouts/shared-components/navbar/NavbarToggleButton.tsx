import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';

import { FuseSettingsConfigType } from '@root/@fuse/core/FuseSettings/FuseSettings';
import { selectFuseCurrentSettings, setDefaultSettings } from '@root/@fuse/core/FuseSettings/store/fuseSettingsSlice';
import FuseSvgIcon from '@root/@fuse/core/FuseSvgIcon';
import useThemeMediaQuery from '@root/@fuse/hooks/useThemeMediaQuery';

import { useAppDispatch } from '@root/store/store';

import _ from '@root/app/libs/@lodash';

import { navbarToggle, navbarToggleMobile } from './store/navbarSlice';

type NavbarToggleButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props: NavbarToggleButtonProps) {
	const {
		className = '',
		children = (
			<FuseSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:view-list
			</FuseSvgIcon>
		)
	} = props;

	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const settings: FuseSettingsConfigType = useSelector(selectFuseCurrentSettings);
	const { config } = settings.layout;

	return (
		<IconButton
			className={className}
			color="inherit"
			size="small"
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config?.navbar?.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings?.layout?.config?.navbar?.folded)
						)
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default NavbarToggleButton;
