import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PartialDeep } from 'type-fest';

import BrowserRouter from '@root/@fuse/core/BrowserRouter';
import FuseAuthorization from '@root/@fuse/core/FuseAuthorization';
import FuseSplashScreen from '@root/@fuse/core/FuseSplashScreen/FuseSplashScreen';

import { useAppDispatch } from '@root/store/store';
import withReducer from '@root/store/withReducer';

import useJwtAuth, { JwtAuth } from '@root/app/features/authentication/hooks/useJwtAuth';
import { User } from '@root/app/features/user';
import {
	resetUser,
	selectUser,
	selectUserRole,
	setUser,
	updateUser,
	userSlice
} from '@root/app/features/user/store/userSlice';

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
	jwtService?: JwtAuth<User, SignInPayload, SignUpPayload>;
	signOut?: () => void;
	updateUser?: (U: PartialDeep<User>) => void;
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContext>({
	isAuthenticated: false
});

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
		config: {
			tokenStorageKey: 'jwt_access_token',
			signInUrl: '/auth/sign-in',
			signUpUrl: '/auth/sign-up',
			tokenRefreshUrl: '/auth/refresh',
			getUserUrl: '/auth/user',
			updateUserUrl: '/auth/user',
			updateTokenFromHeader: true
		},
		onSignedIn: (user: User) => {
			dispatch(setUser(user));
			setAuthService('jwt');
		},
		onSignedUp: (user: User) => {
			dispatch(setUser(user));
			setAuthService('jwt');
		},
		onSignedOut: () => {
			dispatch(resetUser());
			resetAuthService();
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
	const isLoading = useMemo(() => jwtService?.isLoading, [jwtService?.isLoading]);

	/**
	 * Check if user is authenticated
	 */
	const isAuthenticated = useMemo(() => jwtService?.isAuthenticated, [jwtService?.isAuthenticated]);

	/**
	 * Combine auth services
	 */
	const combinedAuth = useMemo<AuthContext>(
		() => ({
			jwtService,
			signOut: () => {
				const authService = getAuthService();

				if (authService === 'jwt') {
					return jwtService?.signOut();
				}

				return null;
			},
			updateUser: (userData) => {
				const authService = getAuthService();

				if (authService === 'jwt') {
					return jwtService?.updateUser(userData);
				}

				return null;
			},
			isAuthenticated
		}),
		[isAuthenticated, user]
	);

	/**
	 * Get auth service
	 */
	const getAuthService = useCallback(() => {
		return localStorage.getItem('authService');
	}, []);

	/**
	 * Set auth service
	 */
	const setAuthService = useCallback((authService: string) => {
		if (authService) {
			localStorage.setItem('authService', authService);
		}
	}, []);

	/**
	 * Reset auth service
	 */
	const resetAuthService = useCallback(() => {
		localStorage.removeItem('authService');
	}, []);

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
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}
	return context;
}
const AuthRouteProvider = withReducer<AuthProviderProps>('user', userSlice.reducer)(AuthRoute);

export { useAuth, AuthRouteProvider };