import { queryOptions, useQuery } from '@tanstack/react-query';

import { AUTH_USER_QUERY_KEY } from '../queryKeys/auth.keys';
import UserService from '../services/auth.services';
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

type UseAuthUserQueryParams = {
	options?: {
		enabled: boolean;
	};
};

export const useAuthUserQuery = ({ options }: UseAuthUserQueryParams = {}) => {
	return useQuery(
		queryOptions({
			queryKey: [AUTH_USER_QUERY_KEY],
			queryFn: UserService.authUser,
			staleTime: Infinity,
			enabled: options?.enabled ?? false,
			initialData
		})
	);
};
