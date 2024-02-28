import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { PartialDeep } from 'type-fest';

import FuseNavItemModel from '@root/@fuse/core/FuseNavigation/models/FuseNavItemModel';
import { FuseFlatNavItemType, FuseNavItemType } from '@root/@fuse/core/FuseNavigation/types/FuseNavItemType';
import FuseUtils from '@root/@fuse/utils';
import FuseNavigationHelper from '@root/@fuse/utils/FuseNavigationHelper';

import { selectCurrentLanguageId } from '@root/store/i18nSlice';
import { AppThunk, RootStateType } from '@root/store/types';

import navigationConfig from '@root/app/configs/navigation/navigationConfig';
import { selectUserRole, userSliceType } from '@root/app/features/user/store/userSlice';

type AppRootStateType = RootStateType<[navigationSliceType, userSliceType]>;

const navigationAdapter = createEntityAdapter<FuseFlatNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState([]);

const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	FuseNavigationHelper.flattenNavigation(navigationConfig)
);

/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem =
	(item: FuseNavItemType, parentId?: string | null): AppThunk =>
		async (dispatch, getState) => {
			const AppState = getState() as AppRootStateType;
			const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

			dispatch(setNavigation(FuseNavigationHelper.appendNavItem(navigation, FuseNavItemModel(item), parentId)));

			return Promise.resolve();
		};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: FuseNavItemType, parentId?: string | null): AppThunk =>
		async (dispatch, getState) => {
			const AppState = getState() as AppRootStateType;
			const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

			dispatch(setNavigation(FuseNavigationHelper.prependNavItem(navigation, FuseNavItemModel(item), parentId)));

			return Promise.resolve();
		};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<FuseNavItemType>): AppThunk =>
		async (dispatch, getState) => {
			const AppState = getState() as AppRootStateType;
			const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

			dispatch(setNavigation(FuseNavigationHelper.updateNavItem(navigation, id, item)));

			return Promise.resolve();
		};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunk =>
		async (dispatch, getState) => {
			const AppState = getState() as AppRootStateType;
			const navigation = FuseNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

			dispatch(setNavigation(FuseNavigationHelper.removeNavItem(navigation, id)));

			return Promise.resolve();
		};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state: AppRootStateType) => state.navigation);

/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action: PayloadAction<FuseNavItemType[]>) {
			return navigationAdapter.setAll(state, FuseNavigationHelper.flattenNavigation(action.payload));
		},
		resetNavigation: () => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export const selectNavigation = createSelector(
	[selectNavigationAll, selectUserRole, selectCurrentLanguageId],
	(navigationSimple, userRole) => {
		const navigation = FuseNavigationHelper.unflattenNavigation(navigationSimple);

		function setAdditionalData(data: FuseNavItemType[]): FuseNavItemType[] {
			return data?.map((item) => ({
				hasPermission: Boolean(FuseUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18next.t(`navigation:${item?.translate}`) } : {}),
				...(item?.children ? { children: setAdditionalData(item?.children) } : {})
			}));
		}

		const translatedValues = setAdditionalData(navigation);

		return translatedValues;
	}
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) => {
	return FuseNavigationHelper.flattenNavigation(navigation);
});

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;
