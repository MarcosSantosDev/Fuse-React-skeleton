import { createSlice } from '@reduxjs/toolkit';

import { appSelector } from '@root/store/store';
import { RootStateType } from '@root/store/types';

type AppRootStateType = RootStateType<stateSliceType>;

/**
 * State slice for the quick panel.
 */
export const stateSlice = createSlice({
	name: 'quickPanel/state',
	initialState: false,
	reducers: {
		toggleQuickPanel: (state) => !state,
		openQuickPanel: () => true,
		closeQuickPanel: () => false
	}
});

export const { toggleQuickPanel, openQuickPanel, closeQuickPanel } = stateSlice.actions;

export const selectQuickPanelState = appSelector((state: AppRootStateType) => state.quickPanel.state);

export type stateSliceType = typeof stateSlice;

export default stateSlice.reducer;
