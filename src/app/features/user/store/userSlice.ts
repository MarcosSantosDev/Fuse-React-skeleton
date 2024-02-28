/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStateType } from '@root/store/types';

import settingsConfig from '@root/app/configs/settingsConfig';
import _ from '@root/app/libs/@lodash';

import { AuthUser } from '../../authentication/api/types/auth.types';
import userModel from '../models/UserModel';

type AppRootStateType = RootStateType<userSliceType>;

function updateRedirectUrl(user: AuthUser) {
	/*
	  You can redirect the logged-in user to a specific route depending on his role
	  */
	if (user?.data?.loginRedirectUrl && user.data.loginRedirectUrl !== '') {
		settingsConfig.loginRedirectUrl = user.data.loginRedirectUrl; // for example 'apps/academy'
	}
}

/**
 * Sets the user object in the Redux store.
 */
export const setUser = createAsyncThunk<AuthUser, AuthUser>('user/setUser', async (user) => {
	updateRedirectUrl(user);

	return user;
});

/**
 * Reset the user state.
 */
export const resetUser = createAsyncThunk('user/resetUser', async () => {
	return true;
});

/**
 * The initial state of the user slice.
 */
const initialState: AuthUser = userModel({});

/**
 * The User slice
 */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		/**
		 * Updates the user's settings
		 */
		setUserShortcuts: (state, action) => {
			const oldState = _.cloneDeep(state);
			const newUser = _.setIn(oldState, 'data.shortcuts', action.payload) as AuthUser;

			if (_.isEqual(oldState, newUser)) {
				return undefined;
			}
			return newUser;
		},
		/**
		 * Updates the user's settings
		 */
		setUserSettings: (state, action) => {
			const oldState = _.cloneDeep(state);
			const newUser = _.setIn(oldState, 'data.settings', action.payload) as AuthUser;

			if (_.isEqual(oldState, newUser)) {
				return undefined;
			}
			return newUser;
		},
		/**
		 * Updates the user object in the Redux store.
		 */
		updateUser: (state, action) => {
			const oldState = _.cloneDeep(state);
			const user = action.payload as AuthUser;
			const newUser = _.merge({}, oldState, user);

			if (_.isEqual(oldState, newUser)) {
				return undefined;
			}
			return newUser;
		},
		userSignOut: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(setUser.fulfilled, (state, action) => {
			const user = action.payload;
			const newUser = _.defaults(user, state);

			if (_.isEqual(state, newUser)) {
				return undefined;
			}
			return action.payload;
		});
		builder.addCase(resetUser.fulfilled, (state) => {
			if (!_.isEqual(state, initialState)) {
				return initialState;
			}
			return undefined;
		});
	}
});

export const { userSignOut, updateUser, setUserShortcuts, setUserSettings } = userSlice.actions;

export const selectUser = (state: AppRootStateType) => state?.user;

export const selectUserRole = (state: AppRootStateType) => state?.user?.role;

export const selectIsUserGuest = (state: AppRootStateType) => {
	const userRole = state?.user?.role;

	return !userRole || userRole?.length === 0;
};

export const selectUserShortcuts = (state: AppRootStateType) => state.user?.data?.shortcuts;

export const selectUserSettings = (state: AppRootStateType) => state.user?.data?.settings;

export type userSliceType = typeof userSlice;

export default userSlice.reducer;
