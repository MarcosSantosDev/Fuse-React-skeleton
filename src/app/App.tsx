import { useSelector } from 'react-redux';
import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import rtlPlugin from 'stylis-plugin-rtl';

import FuseLayout from '@root/@fuse/core/FuseLayout';
import { selectMainTheme } from '@root/@fuse/core/FuseSettings/store/fuseSettingsSlice';
import FuseTheme from '@root/@fuse/core/FuseTheme';
import themeLayouts from '@root/@fuse/theme-layouts/themeLayouts';

import { selectCurrentLanguageDirection } from '@root/store/i18nSlice';

import { AuthRouteProvider } from '@root/app/features/authentication/contexts/AuthRouteProvider';
import withAppProviders from '@root/app/HOC/withAppProviders';

const emotionCacheOptions = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		insertionPoint: document.getElementById('emotion-insertion-point')
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		insertionPoint: document.getElementById('emotion-insertion-point')
	}
};

/**
 * The main App component.
 */
function App() {
	/**
	 * The language direction from the Redux store.
	 */
	const langDirection = useSelector(selectCurrentLanguageDirection);

	/**
	 * The main theme from the Redux store.
	 */
	const mainTheme = useSelector(selectMainTheme);

	return (
		<CacheProvider value={createCache(emotionCacheOptions[langDirection] as Options)}>
			<FuseTheme
				theme={mainTheme}
				direction={langDirection}
			>
				<AuthRouteProvider>
					<SnackbarProvider
						maxSnack={5}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						classes={{
							containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
						}}
					>
						<FuseLayout layouts={themeLayouts} />
					</SnackbarProvider>
				</AuthRouteProvider>
			</FuseTheme>
		</CacheProvider>
	);
}

export default withAppProviders(App);
