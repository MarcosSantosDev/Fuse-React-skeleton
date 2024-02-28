import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import store from '@root/store/store';

import routes from '@root/app/configs/routes/routesConfig';
import AppContext from '@root/app/contexts/AppContext';
import { ErrorBoundary } from '@root/app/components/ui';
import { queryClient } from '@root/app/libs/react-query';

type ComponentProps = {
	name?: string;
};

/**
 * A Higher Order Component that provides the necessary context providers for the app.
 */
function withAppProviders(Component: React.ComponentType<ComponentProps>) {
	/**
	 * The component that wraps the provided component with the necessary context providers.
	 */
	function WithAppProviders(props: React.PropsWithChildren<ComponentProps>) {
		/**
		 * The value to pass to the AppContext provider.
		 */
		const globalValues = useMemo(
			() => ({
				routes
			}),
			[routes]
		);

		return (
			<ErrorBoundary>
				<AppContext.Provider value={globalValues}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<QueryClientProvider client={queryClient}>
							<Provider store={store}>
								<StyledEngineProvider injectFirst>
									<Component {...props} />
								</StyledEngineProvider>
							</Provider>
							<ReactQueryDevtools initialIsOpen={false} />
						</QueryClientProvider>
					</LocalizationProvider>
				</AppContext.Provider>
			</ErrorBoundary>
		);
	}

	return WithAppProviders;
}

export default withAppProviders;
