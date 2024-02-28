import { Navigate } from 'react-router-dom';

import FuseLoading from '@root/@fuse/core/FuseLoading';
import FuseUtils from '@root/@fuse/utils';
import { FuseRouteConfigsType, FuseRoutesType } from '@root/@fuse/utils/FuseUtils';

import settingsConfig from '@root/app/configs/settingsConfig';
import Error404Page from '@root/app/pages/404/Error404Page';
import ExampleConfig from '@root/app/pages/example/ExampleConfig';
import SignInConfig from '@root/app/pages/sign-in/SignInConfig';
import SignOutConfig from '@root/app/pages/sign-out/SignOutConfig';
import SignUpConfig from '@root/app/pages/sign-up/SignUpConfig';

const routeConfigs: FuseRouteConfigsType = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/example" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
