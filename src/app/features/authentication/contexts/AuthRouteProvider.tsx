import * as React from 'react';
import { useSelector } from 'react-redux';

import BrowserRouter from '@root/@fuse/core/BrowserRouter';
import FuseAuthorization from '@root/@fuse/core/FuseAuthorization';
import FuseSplashScreen from '@root/@fuse/core/FuseSplashScreen/FuseSplashScreen';

import { useAppDispatch } from '@root/store/store';
import withReducer from '@root/store/withReducer';

import useJwtAuth, { JwtAuth } from '@root/app/features/authentication/hooks/useJwtAuth';
import {
	resetUser,
	selectUser,
	selectUserRole,
	setUser,
	updateUser,
	userSlice
} from '@root/app/features/user/store/userSlice';
import localStorageUtils from '@root/app/utils/localStorage';

import { AuthUser } from '../api/types/auth.types';

/**
 * Initialize Firebase
 */
export type SignInPayload = {
	email: string;
	password: string;
};

export type SignUpPayload = {
	displayName: string;
	password: string;
	email: string;
};

type AuthContext = {
	jwtService?: JwtAuth<AuthUser>;
	signOut?: () => void;
	updateUser?: (U: AuthUser) => void;
};

const AuthContext = React.createContext<AuthContext>({});

type AuthProviderProps = { children: React.ReactNode };

function AuthRoute(props: AuthProviderProps) {
	const { children } = props;
	const dispatch = useAppDispatch();

	// useFindUserQuery();
	const user = useSelector(selectUser);
	/**
	 * Get user role from store
	 */
	const userRole = useSelector(selectUserRole);
	/**
	 * Jwt auth service
	 */
	const jwtService = useJwtAuth({
		onSignedIn: (user) => {
			dispatch(setUser(user));
			localStorageUtils.setAuthService('jwt');
		},
		onSignedUp: (user) => {
			dispatch(setUser(user));
			localStorageUtils.setAuthService('jwt');
		},
		onSignedOut: () => {
			dispatch(resetUser());
			localStorageUtils.resetAuthService();
		},
		onUpdateUser: (user) => {
			dispatch(updateUser(user));
		},
		onError: (error) => {
			// eslint-disable-next-line no-console
			console.warn(error);
		}
	});

	/**
	 * Check if services is in loading state
	 */
	const isLoading = React.useMemo(() => jwtService?.isLoading, [jwtService?.isLoading]);

	/**
	 * Combine auth services
	 */
	const combinedAuth = React.useMemo<AuthContext>(
		() => ({
			jwtService,
			signOut: () => {
				const authService = localStorageUtils.getAuthService();

				if (authService === 'jwt') {
					return jwtService?.signOut();
				}

				return null;
			},
			updateUser: (userData) => {
				const authService = localStorageUtils.getAuthService();

				if (authService === 'jwt') {
					return jwtService?.updateUser(userData);
				}

				return null;
			}
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	/**
	 * Render loading screen while loading user data
	 */
	if (isLoading) {
		return <FuseSplashScreen />;
	}

	return (
		<AuthContext.Provider value={combinedAuth}>
			<BrowserRouter>
				<FuseAuthorization userRole={userRole}>{children}</FuseAuthorization>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContext {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}
	return context;
}
const AuthRouteProvider = withReducer<AuthProviderProps>('user', userSlice.reducer)(AuthRoute);

export { useAuth, AuthRouteProvider };
