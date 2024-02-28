import { useDispatch } from 'react-redux';
import {
	asyncThunkCreator,
	buildCreateSlice,
	combineSlices,
	configureStore,
	Middleware,
	ReducersMapObject,
	Store
} from '@reduxjs/toolkit';
import { createDynamicMiddleware } from '@reduxjs/toolkit/react';
import { createLogger } from 'redux-logger';

import i18n from '@root/store/i18nSlice';
import { AppDispatchType } from '@root/store/types';

/**
 * The dynamic middleware instance.
 */
const dynamicInstance = createDynamicMiddleware();

export const { middleware: dynamicMiddleware } = dynamicInstance;

export const addAppMiddleware = dynamicInstance.addMiddleware.withTypes<Config>();

const middlewares: Middleware[] = [dynamicMiddleware];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({ collapsed: (getState, action, logEntry) => (logEntry ? !logEntry.error : true) });
	middlewares.push(logger);
}

/**
 * The type definition for the lazy loaded slices.
 */
export interface LazyLoadedSlices { }

/**
 * The static reducers.
 */
const staticReducers: ReducersMapObject = {
	i18n
};

/**
 * The root reducer.
 */
export const rootReducer = combineSlices(staticReducers).withLazyLoadedSlices<LazyLoadedSlices>();

/**
 * The type definition for the root state.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Configures the app store.
 */
export function configureAppStore(initialState?: RootState) {
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
	}) as Store<RootState>;

	return store;
}

/**
 * The type definition for the app store.
 */
export type AppStore = typeof store;

/**
 * The type definition for the app dispatch.
 */
export type AppDispatch = AppStore['dispatch'];

/**
 * Typed hook to get the dispatch function from the Redux store.
 */
export const useAppDispatch: () => AppDispatchType = useDispatch;

/**
 * Shortage for the root state selector.
 */
export const appSelector = rootReducer.selector;

/**
 * createAppSlice is a wrapper around createSlice that adds support for asyncThunkCreator.
 */
export const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator }
});

/**
 * The type definition for the config object passed to `withAppMiddleware`.
 */
type Config = {
	state: RootState;
	dispatch: AppDispatch;
};

export const withAppMiddleware = dynamicInstance.withMiddleware.withTypes<Config>();

const store = configureAppStore();

export default store;
