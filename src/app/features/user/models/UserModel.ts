import { PartialDeep } from 'type-fest';

import _ from '@root/app/libs/@lodash';

import { AuthUser } from '../../authentication/api/types/auth.types';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<AuthUser>): AuthUser {
	data = data || {};

	return _.defaults(data, {
		uid: '',
		role: null, // guest
		data: {
			displayName: 'Guest User',
			photoURL: '',
			email: '',
			shortcuts: [],
			settings: {}
		}
	});
}

export default UserModel;
