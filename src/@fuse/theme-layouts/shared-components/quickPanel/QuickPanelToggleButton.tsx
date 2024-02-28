import IconButton from '@mui/material/IconButton';

import FuseSvgIcon from '@root/@fuse/core/FuseSvgIcon';

import { useAppDispatch } from '@root/store/store';

import { toggleQuickPanel } from './store/stateSlice';

type QuickPanelToggleButtonProps = {
	children?: React.ReactNode;
};

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props: QuickPanelToggleButtonProps) {
	const { children = <FuseSvgIcon>heroicons-outline:bookmark</FuseSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleQuickPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
