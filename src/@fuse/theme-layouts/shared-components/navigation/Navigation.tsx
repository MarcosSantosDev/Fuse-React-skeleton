import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import FuseNavigation from '@root/@fuse/core/FuseNavigation';
import { FuseNavigationProps } from '@root/@fuse/core/FuseNavigation/FuseNavigation';
import useThemeMediaQuery from '@root/@fuse/hooks/useThemeMediaQuery';

import { useAppDispatch } from '@root/store/store';
import withSlices from '@root/store/withSlices';

import { navbarCloseMobile } from '../navbar/store/navbarSlice';

import { navigationSlice, selectNavigation } from './store/navigationSlice';

/**
 * Navigation
 */

type NavigationProps = Partial<FuseNavigationProps>;

function Navigation(props: NavigationProps) {
	const { className = '', layout = 'vertical', dense, active } = props;

	const navigation = useSelector(selectNavigation);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<FuseNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
				checkPermission
			/>
		);
	}, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default withSlices<NavigationProps>([navigationSlice])(Navigation);
