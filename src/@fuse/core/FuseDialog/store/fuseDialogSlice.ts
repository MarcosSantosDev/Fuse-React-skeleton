import { ReactElement } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { appSelector } from '@root/store/store';
import { RootStateType } from '@root/store/types';

type AppRootStateType = RootStateType<dialogSliceType>;

type InitialStateProps = {
	open: boolean;
	children: ReactElement | string;
};

/**
 * The initial state of the dialog slice.
 */
const initialState: InitialStateProps = {
	open: false,
	children: ''
};

/**
 * The Fuse Dialog slice
 */
export const fuseDialogSlice = createSlice({
	name: 'fuseDialog',
	initialState,
	reducers: {
		openDialog: (state, action: PayloadAction<{ children: InitialStateProps['children'] }>) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	}
});

export const { closeDialog, openDialog } = fuseDialogSlice.actions;

export const selectFuseDialogState = appSelector((state: AppRootStateType) => state.fuseDialog.open);

export const selectFuseDialogProps = appSelector((state: AppRootStateType) => state.fuseDialog);

export type dialogSliceType = typeof fuseDialogSlice;

export default fuseDialogSlice.reducer;
