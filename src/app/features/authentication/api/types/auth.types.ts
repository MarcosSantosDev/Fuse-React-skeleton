import { FuseSettingsConfigType } from '@root/@fuse/core/FuseSettings/FuseSettings';

export type AuthUser = {
	uid: string;
	role: string | null;
	data: {
		displayName?: string;
		photoURL: string;
		email?: string;
		shortcuts: string[];
		settings?: Partial<FuseSettingsConfigType>;
		loginRedirectUrl?: string;
	};
};

export type AuthUserReturn = AuthUser;

export type AuthUserWithPassword = AuthUser & {
	password: string;
};

export type AuthUpdateUserReturn = AuthUser;

export type AuthSignInPayload = {
	email: string;
	password: string;
};

export type AuthSignInReturn = {
	user: AuthUser;
	access_token: string;
};

export type AuthSignUpPayload = {
	email: string;
	password: string;
	displayName: string;
};

export type AuthSignUpReturn = {
	user: AuthUser;
	access_token: string;
};

export type AuthUpdateUserPayload = AuthUser;
