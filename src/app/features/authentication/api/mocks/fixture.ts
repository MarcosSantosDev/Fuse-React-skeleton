import type { AuthUser, AuthUserWithPassword } from '../types/auth.types';

export const user: AuthUser = {
	uid: 'XgbuVEXBU5gtSKdbQRP1Zbbby1i1',
	role: 'admin',
	data: {
		displayName: 'Jon Doe',
		photoURL: 'assets/images/avatars/brian-hughes.jpg',
		email: 'admin@fusetheme.com',
		settings: {
			layout: {}
		},
		shortcuts: []
	}
};

export const userWithPassword: AuthUserWithPassword = {
	...user,
	password: 'admin'
};
