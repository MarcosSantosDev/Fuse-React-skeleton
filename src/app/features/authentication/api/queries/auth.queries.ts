import { queryOptions, useQuery } from '@tanstack/react-query';

import { AUTH_USER_QUERY_KEY } from '../queryKeys/auth.keys';
import authService from '../services/auth.services';
import type { AuthUserReturn } from '../types/auth.types';

const initialData: AuthUserReturn = {
	uid: '',
	role: null,
	data: {
		displayName: 'Guest User',
		photoURL: '',
		email: '',
		shortcuts: [],
		settings: {}
	}
};

export const useAuthUserQuery = () => {
	return useQuery(
		queryOptions({
			queryKey: [AUTH_USER_QUERY_KEY],
			queryFn: authService.authUser,
			staleTime: Infinity,
			enabled: false,
			initialData
		})
	);
};
