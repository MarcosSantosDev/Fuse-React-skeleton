import * as React from 'react';
import { AxiosError } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { PartialDeep } from 'type-fest';

import { queryClient } from '@root/app/libs/react-query';
import localStorageUtils from '@root/app/utils/localStorage';

import {
	useAuthRefreshTokenUserMutation,
	useAuthSignInUserMutation,
	useAuthSignUpUserMutation,
	useAuthUpdateUserMutation
} from '../api/mutations/auth.mutations';
import { useAuthUserQuery } from '../api/queries/auth.queries';
import {
	AuthSignInPayload,
	AuthSignInReturn,
	AuthSignUpPayload,
	AuthSignUpReturn,
	AuthUpdateUserPayload,
	AuthUser
} from '../api/types/auth.types';

export type JwtAuthProps<T> = {
	onSignedIn?: (U: T) => void;
	onSignedUp?: (U: T) => void;
	onSignedOut?: () => void;
	onUpdateUser?: (U: T) => void;
	onError?: (error: AxiosError) => void;
};

export type JwtAuth<User> = {
	user: User;
	isAuthenticated: boolean;
	isLoading: boolean;
	signIn: (data: AuthSignInPayload) => Promise<AxiosError<unknown, unknown> | AuthSignInReturn>;
	signOut: () => void;
	signUp: (data: AuthSignUpPayload) => Promise<AxiosError<unknown, unknown> | AuthSignUpReturn>;
	updateUser: (U: PartialDeep<User>) => void;
	refreshToken: () => void;
	setIsLoading: (isLoading: boolean) => void;
};

/**
 * useJwtAuth hook
 * Description: This hook handles the authentication flow using JWT
 */

const useJwtAuth = (props: JwtAuthProps<AuthUser>): JwtAuth<AuthUser> => {
	const { onSignedIn, onSignedOut, onSignedUp, onError, onUpdateUser } = props;

	const [user, setUser] = React.useState<AuthUser>(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	const authUserQuery = useAuthUserQuery();
	const authSignInUserMutation = useAuthSignInUserMutation();
	const authSignUpUserMutation = useAuthSignUpUserMutation();
	const authUpdateUserMutation = useAuthUpdateUserMutation();
	const authRefreshTokenUserMutation = useAuthRefreshTokenUserMutation();

	/**
	 * Check if the access token is valid
	 */
	const isTokenValid = React.useCallback((accessToken: string) => {
		if (accessToken) {
			try {
				const decoded = jwtDecode<JwtPayload>(accessToken);
				const currentTime = Date.now() / 1000;
				return decoded.exp > currentTime;
			} catch (error) {
				return false;
			}
		}
		return false;
	}, []);

	/**
	 * Sign in
	 */
	const signIn = async (credentials: AuthSignInPayload) => {
		try {
			const response = await authSignInUserMutation.mutateAsync(credentials);

			localStorageUtils.setSession(response.access_token);

			setIsAuthenticated(true);
			setUser(response.user);
			onSignedIn(response.user);

			return response;
		} catch (error) {
			const axiosError = error as AxiosError;

			localStorageUtils.resetSession();

			setIsAuthenticated(false);
			setUser(null);

			onError(axiosError);

			return axiosError;
		}
	};

	/**
	 * Sign up
	 */
	const signUp = React.useCallback(
		async (data: AuthSignUpPayload) => {
			try {
				const response = await authSignUpUserMutation.mutateAsync(data);

				localStorageUtils.setSession(response.access_token);

				setIsAuthenticated(true);
				setUser(response.user);
				onSignedUp(response.user);

				return response;
			} catch (error) {
				const axiosError = error as AxiosError;

				localStorageUtils.resetSession();

				setIsAuthenticated(false);
				setUser(null);

				onError(axiosError);

				return axiosError;
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	/**
	 * Sign out
	 */
	const signOut = () => {
		localStorageUtils.resetSession();

		setIsAuthenticated(false);
		setUser(null);

		queryClient.removeQueries();

		onSignedOut();
	};

	/**
	 * Update user
	 */
	const updateUser = async (userData: AuthUpdateUserPayload) => {
		try {
			const response = await authUpdateUserMutation.mutateAsync(userData);

			onUpdateUser(response);

			return null;
		} catch (error) {
			const axiosError = error as AxiosError;

			localStorageUtils.resetSession();

			setIsAuthenticated(false);
			setUser(null);

			onError(axiosError);

			return axiosError;
		}
	};

	/**
	 * Refresh access token
	 */
	const refreshToken = async () => {
		setIsLoading(true);
		try {
			const response = await authRefreshTokenUserMutation.mutateAsync();

			const accessToken = response?.headers?.['New-Access-Token'] as string;
			if (accessToken) {
				localStorageUtils.setSession(accessToken);
				return accessToken;
			}
			return null;
		} catch (error) {
			const axiosError = error as AxiosError;

			localStorageUtils.resetSession();

			setIsAuthenticated(false);
			setUser(null);

			onError(axiosError);

			return axiosError;
		}
	};

	/**
	 * Check if the access token exist and is valid on mount
	 * If it is, set the user and isAuthenticated states
	 * If not, clear the session
	 */
	React.useEffect(() => {
		const attemptAutoLogin = async () => {
			const accessToken = localStorageUtils.getAccessToken();
			if (isTokenValid(accessToken)) {
				try {
					setIsLoading(true);
					const { data } = await authUserQuery.refetch();

					localStorageUtils.setSession(accessToken);

					setIsAuthenticated(true);
					setUser(data);
					onSignedIn(data);

					return true;
				} catch (error) {
					const axiosError = error as AxiosError;

					localStorageUtils.resetSession();

					setIsAuthenticated(false);
					setUser(null);

					onError(axiosError);

					return false;
				}
			} else {
				localStorageUtils.resetSession();
				return false;
			}
		};

		if (!isAuthenticated) {
			attemptAutoLogin().then(() => {
				setIsLoading(false);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { user, isAuthenticated, isLoading, signIn, signUp, signOut, updateUser, refreshToken, setIsLoading };
};

export default useJwtAuth;
