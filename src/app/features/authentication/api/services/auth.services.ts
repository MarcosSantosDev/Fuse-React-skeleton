import { apiClient } from '@root/app/libs/axios';

import type {
	AuthSignInPayload,
	AuthSignInReturn,
	AuthSignUpPayload,
	AuthSignUpReturn,
	AuthUpdateUserPayload,
	AuthUpdateUserReturn,
	AuthUserReturn
} from '../types/auth.types';

const authService = {
	authUser: async () => {
		const response = await apiClient.get<AuthUserReturn>('/auth/user');
		return response.data;
	},
	authUpdateUser: async (data: AuthUpdateUserPayload) => {
		const response = await apiClient.put<AuthUpdateUserReturn>('/auth/user', data);
		return response.data;
	},
	authSingIn: async (data: AuthSignInPayload) => {
		const response = await apiClient.post<AuthSignInReturn>('/auth/sign-in', data);
		return response.data;
	},
	authSingUp: async (data: AuthSignUpPayload) => {
		const response = await apiClient.post<AuthSignUpReturn>('/auth/sign-up', data);
		return response.data;
	},
	authRefresh: async () => {
		return apiClient.post<void>('/auth/refresh');
	}
};

export default authService;
