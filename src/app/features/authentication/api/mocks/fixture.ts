import type { AuthUserReturn, AuthUserWithPassword } from '../types/auth.types';

export const user: AuthUserReturn = {
	uid: 'XgbuVEXBU5gtSKdbQRP1Zbbby1i1',
	role: 'admin',
	data: {
		displayName: 'Jon Doe',
		photoURL: 'assets/images/avatars/brian-hughes.jpg',
		email: 'admin@fusetheme.com',
		settings: {
			layout: {},
			theme: {}
		},
		shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts']
	}
};

export const userWithPassword: AuthUserWithPassword = {
	...user,
	password: 'admin'
};
