import { env } from '@root/env';
import jwtDecode from 'jwt-decode';
import { http, HttpResponse } from 'msw';

import FuseUtils from '@root/@fuse/utils';

import UserModel from '@root/app/features/user/models/UserModel';
import _ from '@root/app/libs/@lodash';

import {
	AuthSignInPayload,
	AuthSignInReturn,
	AuthSignUpPayload,
	AuthSignUpReturn,
	AuthUpdateUserReturn,
	AuthUserReturn,
	AuthUserWithPassword
} from '../types/auth.types';

import { user, userWithPassword } from './fixture';
import { generateAccessToken, generateJWTToken } from './functions';

const authMockServices = {
	authUser: http.get(`${env.VITE_API_URL}/auth/user`, async ({ request }) => {
		if (request.headers.has('Authorization')) {
			const authHeader = request.headers.get('Authorization');

			const newTokenResponse = generateAccessToken({ authHeader });

			if (newTokenResponse) {
				return HttpResponse.json(user, {
					status: 200,
					headers: {
						'New-Access-Token': newTokenResponse.accessToken
					}
				});
			}
		}

		const error = 'Invalid access token detected or user not found';

		return new HttpResponse(error, { status: 401 });
	}),
	authUpdateUser: http.put<never, AuthUserReturn>(`${env.VITE_API_URL}/auth/user`, async ({ request }) => {
		const accessToken = request.headers.get('Authorization');
		const userData = jwtDecode(accessToken);
		const uid = (userData as { [key: string]: string }).id;

		if (user.uid === uid) {
			const newUserData = await request.json();

			const updatedUser: AuthUpdateUserReturn = _.assign({}, user, newUserData);

			return HttpResponse.json(updatedUser, {
				status: 200
			});
		}

		return new HttpResponse(null, {
			status: 401
		});
	}),
	authSingIn: http.post<never, AuthSignInPayload>(`${env.VITE_API_URL}/auth/sign-in`, async ({ request }) => {
		const { email, password } = await request.json();

		const errors = [];

		if (email !== userWithPassword.data?.email) {
			errors.push({
				type: 'email',
				message: 'Check your email address'
			});
		}
		if (password !== userWithPassword.password) {
			errors.push({
				type: 'password',
				message: 'Check your password'
			});
		}

		if (errors.length > 0) {
			return HttpResponse.json(errors, { status: 401 });
		}

		const accessToken = generateJWTToken({ id: userWithPassword.uid });

		const data: AuthSignInReturn = { user, access_token: accessToken };

		return HttpResponse.json(data, {
			status: 200
		});
	}),
	authSingUp: http.post<never, AuthSignUpPayload>(`${env.VITE_API_URL}/auth/sign-up`, async ({ request }) => {
		const { email, password, displayName } = await request.json();

		const errors = [];

		const isEmailExists = user.data.email === email;

		if (isEmailExists) {
			errors.push({
				type: 'email',
				message: 'The email address is already in use'
			});
		}

		if (errors.length > 0) {
			return HttpResponse.json(errors, { status: 401 });
		}

		const newUser = UserModel({
			role: ['admin'],
			data: {
				displayName,
				photoURL: 'assets/images/avatars/Abbott.jpg',
				email,
				shortcuts: [],
				settings: {}
			}
		}) as AuthUserWithPassword;

		newUser.uid = FuseUtils.generateGUID();
		newUser.password = password;

		const accessToken = generateJWTToken({ id: newUser.uid });
		const data: AuthSignUpReturn = { user: newUser, access_token: accessToken };

		return HttpResponse.json(data, {
			status: 200
		});
	}),
	authRefresh: http.post(`${env.VITE_API_URL}/auth/refresh`, async ({ request }) => {
		if (request.headers.has('Authorization')) {
			const authHeader = request.headers.get('Authorization');

			const newTokenResponse = generateAccessToken({ authHeader });

			if (newTokenResponse) {
				return new HttpResponse(null, {
					status: 200,
					headers: {
						'New-Access-Token': newTokenResponse.accessToken
					}
				});
			}
		}

		const error = 'Invalid access token detected or user not found';
		return HttpResponse.json({ data: error }, { status: 401 });
	})
};

export const authMockServicesHandlers = [
	authMockServices.authUser,
	authMockServices.authUpdateUser,
	authMockServices.authSingIn,
	authMockServices.authSingUp,
	authMockServices.authRefresh
];
