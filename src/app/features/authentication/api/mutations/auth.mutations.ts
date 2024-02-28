import { useMutation } from '@tanstack/react-query';

import {
	AUTH_REFRESH_TOKEN_USER_MUTATION_KEY,
	AUTH_SIGNIN_USER_MUTATION_KEY,
	AUTH_SIGNUP_USER_MUTATION_KEY,
	AUTH_UPDATE_USER_MUTATION_KEY
} from '../queryKeys/auth.keys';
import auth from '../services/auth.services';

export const useAuthUpdateUserQuery = () => {
	return useMutation({
		mutationKey: [AUTH_UPDATE_USER_MUTATION_KEY],
		mutationFn: auth.authUpdateUser
	});
};

export const useAuthSignInUserQuery = () => {
	return useMutation({
		mutationKey: [AUTH_SIGNIN_USER_MUTATION_KEY],
		mutationFn: auth.authSingIn
	});
};

export const useAuthSignUpUserQuery = () => {
	return useMutation({
		mutationKey: [AUTH_SIGNUP_USER_MUTATION_KEY],
		mutationFn: auth.authSingUp
	});
};

export const useAuthRefreshTokenUserQuery = () => {
	return useMutation({
		mutationKey: [AUTH_REFRESH_TOKEN_USER_MUTATION_KEY],
		mutationFn: auth.authRefresh
	});
};
