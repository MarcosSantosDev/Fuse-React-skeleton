import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { matchRoutes, RouteMatch, RouteObject, useLocation } from 'react-router-dom';
import { PartialDeep } from 'type-fest';

import { FuseSettingsConfigType } from '@root/@fuse/core/FuseSettings/FuseSettings';
import {
	fuseSettingsSlice,
	generateSettings,
	selectFuseCurrentSettings,
	selectFuseDefaultSettings,
	setSettings
} from '@root/@fuse/core/FuseSettings/store/fuseSettingsSlice';
import { useDeepCompareEffect } from '@root/@fuse/hooks';
import { themeLayoutsType } from '@root/@fuse/theme-layouts/themeLayouts';

import { useAppDispatch } from '@root/store/store';
import withSlices from '@root/store/withSlices';

import AppContext from '@root/app/contexts/AppContext';
import _ from '@root/app/libs/@lodash';

import FuseLoading from '../FuseLoading';

export type FuseRouteObjectType = RouteObject & {
	settings?: FuseSettingsConfigType;
};

export type FuseRouteMatchType = RouteMatch & {
	route: FuseRouteObjectType;
};

type FuseLayoutProps = {
	layouts: themeLayoutsType;
	children?: React.ReactNode;
};

/**
 * FuseLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function FuseLayout(props: FuseLayoutProps) {
	const { layouts, children } = props;
	const dispatch = useAppDispatch();
	const settings = useSelector(selectFuseCurrentSettings);
	const defaultSettings = useSelector(selectFuseDefaultSettings);

	const layoutStyle = settings.layout.style;

	const appContext = useContext(AppContext);
	const { routes } = appContext;

	const location = useLocation();
	const { pathname } = location;

	const matchedRoutes = matchRoutes(routes, pathname) as FuseRouteMatchType[] | null;

	const matched = matchedRoutes?.[0] || false;

	const newSettings = useRef<PartialDeep<FuseSettingsConfigType>>(settings);

	const shouldAwaitRender = useCallback(() => {
		let _newSettings: FuseSettingsConfigType;

		/**
		 * On Path changed
		 */
		// if (prevPathname !== pathname) {
		if (typeof matched !== 'boolean') {
			/**
			 * if matched route has settings
			 */

			const routeSettings = matched.route.settings;

			_newSettings = generateSettings(defaultSettings, routeSettings);
		} else if (!_.isEqual(newSettings.current, defaultSettings)) {
			/**
			 * Reset to default settings on the new path
			 */
			_newSettings = _.merge({}, defaultSettings);
		} else {
			_newSettings = newSettings.current as FuseSettingsConfigType;
		}

		if (!_.isEqual(newSettings.current, _newSettings)) {
			newSettings.current = _newSettings;
		}
	}, [defaultSettings, matched]);

	shouldAwaitRender();

	const currentSettings = useMemo(() => newSettings.current, [newSettings.current]);

	useDeepCompareEffect(() => {
		if (!_.isEqual(currentSettings, settings)) {
			dispatch(setSettings(currentSettings as FuseSettingsConfigType));
		}
	}, [dispatch, currentSettings, settings]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return useMemo(() => {
		if (!_.isEqual(currentSettings, settings)) {
			return <FuseLoading />;
		}

		return Object.entries(layouts).map(([key, Layout]) => {
			if (key === layoutStyle) {
				return (
					<React.Fragment key={key}>
						<Layout>{children}</Layout>
					</React.Fragment>
				);
			}

			return null;
		});
	}, [layouts, layoutStyle, children, currentSettings, settings]);
}

export default withSlices<FuseLayoutProps>([fuseSettingsSlice])(FuseLayout);
