import { ACCESS_TOKEN, AUTH_SERVICE } from '../constants/localStore';

const getAccessToken = () => {
	return localStorage.getItem(ACCESS_TOKEN);
};

const setSession = (accessToken: string) => {
	if (accessToken) {
		localStorage.setItem(ACCESS_TOKEN, accessToken);
	}
};

const resetSession = () => {
	localStorage.removeItem(ACCESS_TOKEN);
};

type AuthServiceTypesInLocalStorage = 'jwt';

const getAuthService = () => {
	return localStorage.getItem('authService') as AuthServiceTypesInLocalStorage | null;
};

const setAuthService = (authService: AuthServiceTypesInLocalStorage) => {
	if (authService) {
		localStorage.setItem(AUTH_SERVICE, authService);
	}
};

const resetAuthService = () => {
	localStorage.removeItem(AUTH_SERVICE);
};

const utils = {
	getAccessToken,
	setSession,
	resetSession,
	getAuthService,
	setAuthService,
	resetAuthService
};

export default utils;
