import { lazy, memo, ReactNode, Suspense, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import FuseMessage from '@root/@fuse/core/FuseMessage';
import {
	fuseSettingsSlice,
	selectFuseCurrentLayoutConfig
} from '@root/@fuse/core/FuseSettings/store/fuseSettingsSlice';
import FuseSuspense from '@root/@fuse/core/FuseSuspense';
import Configurator from '@root/@fuse/theme-layouts/shared-components/configurator/Configurator';

import withSlices from '@root/store/withSlices';

import AppContext from '@root/app/contexts/AppContext';

import NavbarWrapperLayout1 from './components/NavbarWrapperLayout1';
import ToolbarLayout1 from './components/ToolbarLayout1';
import { Layout1ConfigDefaultsType } from './Layout1Config';

const FuseDialog = lazy(() => import('@root/@fuse/core/FuseDialog/FuseDialog'));

const Root = styled('div')(({ config }: { config: Layout1ConfigDefaultsType }) => ({
	...(config.mode === 'boxed' && {
		clipPath: 'inset(0)',
		maxWidth: `${config.containerWidth}px`,
		margin: '0 auto',
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
	}),
	...(config.mode === 'container' && {
		'& .container': {
			maxWidth: `${config.containerWidth}px`,
			width: '100%',
			margin: '0 auto'
		}
	})
}));

type Layout1Props = {
	children?: ReactNode;
};

/**
 * The layout 1.
 */
function Layout1(props: Layout1Props) {
	const { children } = props;
	const config = useSelector(selectFuseCurrentLayoutConfig) as Layout1ConfigDefaultsType;
	const appContext = useContext(AppContext);
	const { routes } = appContext;

	return (
		<Root
			id="fuse-layout"
			config={config}
			className="flex w-full"
		>
			<div className="flex min-w-0 flex-auto">
				{/* menu lateral de navegaçao */}
				{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout1 />}
				<main
					id="fuse-main"
					className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
				>
					{/* menu topo de navegaçao */}
					{config.toolbar.display && (
						<ToolbarLayout1 className={config.toolbar.style === 'fixed' ? 'sticky top-0' : ''} />
					)}

					<div className="sticky top-0 z-99">
						<Configurator />
					</div>

					<div className="relative z-10 flex min-h-0 flex-auto flex-col">
						<FuseSuspense>{useRoutes(routes)}</FuseSuspense>

						<Suspense>
							<FuseDialog />
						</Suspense>
						{children}
					</div>
				</main>
			</div>
			<FuseMessage />
		</Root>
	);
}

export default withSlices<Layout1Props>([fuseSettingsSlice])(memo(Layout1));