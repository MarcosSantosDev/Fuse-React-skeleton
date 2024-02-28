import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@root/app/libs/react-query';

import {
	AUTH_REFRESH_TOKEN_USER_MUTATION_KEY,
	AUTH_SIGNIN_USER_MUTATION_KEY,
	AUTH_SIGNUP_USER_MUTATION_KEY,
	AUTH_UPDATE_USER_MUTATION_KEY,
	AUTH_USER_QUERY_KEY
} from '../queryKeys/auth.keys';
import authService from '../services/auth.services';
import { AuthUserReturn } from '../types/auth.types';

export const useAuthUpdateUserMutation = () => {
	return useMutation({
		mutationKey: [AUTH_UPDATE_USER_MUTATION_KEY],
		mutationFn: authService.authUpdateUser,
		onSuccess: async (newAuthUserData) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: [AUTH_USER_QUERY_KEY] });

			// Snapshot the previous value
			const previousAuthUser = queryClient.getQueryData([AUTH_USER_QUERY_KEY]);

			// Optimistically update to the new value
			queryClient.setQueryData([AUTH_USER_QUERY_KEY], (oldAuthUserData: AuthUserReturn) => {
				return {
					...oldAuthUserData,
					...newAuthUserData,
					data: {
						...oldAuthUserData.data,
						...newAuthUserData.data
					}
				};
			});

			// Return a context object with the snapshotted value
			return { previousAuthUser };
		}
	});
};

export const useAuthSignInUserMutation = () => {
	return useMutation({
		mutationKey: [AUTH_SIGNIN_USER_MUTATION_KEY],
		mutationFn: authService.authSingIn,
		onSuccess: async (newAuthUserData) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: [AUTH_USER_QUERY_KEY] });

			// Snapshot the previous value
			const previousAuthUser = queryClient.getQueryData([AUTH_USER_QUERY_KEY]);

			// Optimistically update to the new value
			queryClient.setQueryData([AUTH_USER_QUERY_KEY], (oldAuthUserData: AuthUserReturn) => {
				return {
					...oldAuthUserData,
					...newAuthUserData.user,
					data: {
						...oldAuthUserData.data,
						...newAuthUserData.user.data
					}
				};
			});

			// Return a context object with the snapshotted value
			return { previousAuthUser };
		}
	});
};

export const useAuthSignUpUserMutation = () => {
	return useMutation({
		mutationKey: [AUTH_SIGNUP_USER_MUTATION_KEY],
		mutationFn: authService.authSingUp
	});
};

export const useAuthRefreshTokenUserMutation = () => {
	return useMutation({
		mutationKey: [AUTH_REFRESH_TOKEN_USER_MUTATION_KEY],
		mutationFn: authService.authRefresh
	});
};
