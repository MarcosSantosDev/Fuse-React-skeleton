import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import FuseShortcuts from '@root/@fuse/core/FuseShortcuts';
import { usePrevious } from '@root/@fuse/hooks';
import {
	navigationSlice,
	selectFlatNavigation
} from '@root/@fuse/theme-layouts/shared-components/navigation/store/navigationSlice';

import { useAppDispatch } from '@root/store/store';
import withSlices from '@root/store/withSlices';

import { useAuth } from '@root/app/features/authentication/contexts/AuthRouteProvider';
import { selectIsUserGuest, selectUserShortcuts, setUserShortcuts } from '@root/app/features/user/store/userSlice';
import _ from '@root/app/libs/@lodash';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	const { variant, className } = props;
	const dispatch = useAppDispatch();
	const navigation = useSelector(selectFlatNavigation);

	const userShortcuts = useSelector(selectUserShortcuts) || [];
	const isUserGuest = useSelector(selectIsUserGuest);
	const prevUserShortcuts = usePrevious(userShortcuts);

	const { updateUser: updateUserService } = useAuth();

	useEffect(() => {
		if (!isUserGuest && prevUserShortcuts && !_.isEqual(userShortcuts, prevUserShortcuts)) {
			updateUserService({ data: { shortcuts: userShortcuts } });
		}
	}, [isUserGuest, userShortcuts]);

	function handleShortcutsChange(newShortcuts: string[]) {
		dispatch(setUserShortcuts(newShortcuts));
	}

	return (
		<FuseShortcuts
			className={className}
			variant={variant}
			navigation={navigation}
			shortcuts={userShortcuts}
			onChange={handleShortcutsChange}
		/>
	);
}

export default withSlices<NavigationShortcutsProps>([navigationSlice])(NavigationShortcuts);
