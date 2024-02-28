import { useSelector } from 'react-redux';

import { selectFuseCurrentLayoutConfig } from '@root/@fuse/core/FuseSettings/store/fuseSettingsSlice';
import useThemeMediaQuery from '@root/@fuse/hooks/useThemeMediaQuery';
import { Layout1ConfigDefaultsType } from '@root/@fuse/theme-layouts/layout1/Layout1Config';
import NavbarToggleFab from '@root/@fuse/theme-layouts/shared-components/navbar/NavbarToggleFab';
import { navbarToggle, navbarToggleMobile } from '@root/@fuse/theme-layouts/shared-components/navbar/store/navbarSlice';

import { useAppDispatch } from '@root/store/store';

type NavbarToggleFabLayout1Props = {
	className?: string;
};

/**
 * The navbar toggle fab layout 1.
 */
function NavbarToggleFabLayout1(props: NavbarToggleFabLayout1Props) {
	const { className } = props;

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const config = useSelector(selectFuseCurrentLayoutConfig) as Layout1ConfigDefaultsType;

	const dispatch = useAppDispatch();

	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
			}}
			position={config.navbar.position}
		/>
	);
}

export default NavbarToggleFabLayout1;
