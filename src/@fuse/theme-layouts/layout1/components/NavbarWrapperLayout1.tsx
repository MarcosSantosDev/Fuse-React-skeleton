import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';

import {
	selectFuseCurrentLayoutConfig,
	selectNavbarTheme
} from '@root/@fuse/core/FuseSettings/store/fuseSettingsSlice';
import useThemeMediaQuery from '@root/@fuse/hooks/useThemeMediaQuery';
import NavbarToggleFabLayout1 from '@root/@fuse/theme-layouts/layout1/components/NavbarToggleFabLayout1';
import { Layout1ConfigDefaultsType } from '@root/@fuse/theme-layouts/layout1/Layout1Config';
import {
	navbarCloseMobile,
	navbarSlice,
	selectFuseNavbar
} from '@root/@fuse/theme-layouts/shared-components/navbar/store/navbarSlice';

import { useAppDispatch } from '@root/store/store';
import withSlices from '@root/store/withSlices';

import NavbarStyle1 from './navbar/style-1/NavbarStyle1';

/**
 * The navbar wrapper layout 1.
 */
function NavbarWrapperLayout1() {
	const config = useSelector(selectFuseCurrentLayoutConfig) as Layout1ConfigDefaultsType;
	const navbar = useSelector(selectFuseNavbar);
	const location = useLocation();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { pathname } = location;
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isMobile) {
			dispatch(navbarCloseMobile());
		}
	}, [pathname, isMobile]);

	const navbarTheme = useSelector(selectNavbarTheme);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>{config.navbar.style === 'style-1' && <NavbarStyle1 />}</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && !navbar.open && <NavbarToggleFabLayout1 />}
		</>
	);
}

export default withSlices([navbarSlice])(memo(NavbarWrapperLayout1));
