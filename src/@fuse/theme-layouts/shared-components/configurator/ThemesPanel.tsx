import { forwardRef } from 'react';
import { SwipeableHandlers } from 'react-swipeable';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import FuseScrollbars from '@root/@fuse/core/FuseScrollbars';
import { changeFuseTheme } from '@root/@fuse/core/FuseSettings/store/fuseSettingsSlice';
import FuseSvgIcon from '@root/@fuse/core/FuseSvgIcon';
import FuseThemeSelector from '@root/@fuse/core/FuseThemeSelector/FuseThemeSelector';

import { useAppDispatch } from '@root/store/store';

import themeOptions from '@root/app/configs/theme/themeOptions';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

type TransitionProps = {
	children?: React.ReactElement;
};

const Transition = forwardRef((props: TransitionProps, ref) => {
	const { children, ...other } = props;

	const theme = useTheme();

	if (!children) {
		return null;
	}

	return (
		<Slide
			direction={theme.direction === 'ltr' ? 'left' : 'right'}
			ref={ref}
			{...other}
		>
			{children}
		</Slide>
	);
});

type ThemesPanelProps = {
	schemesHandlers: SwipeableHandlers;
	onClose: () => void;
	open: boolean;
};

function ThemesPanel(props: ThemesPanelProps) {
	const { schemesHandlers, onClose, open } = props;

	const dispatch = useAppDispatch();

	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="schemes-panel"
			aria-describedby="schemes"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg'
			}}
			{...schemesHandlers}
		>
			<FuseScrollbars className="p-16 sm:p-32">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
				</IconButton>

				<Typography
					className="mb-32"
					variant="h6"
				>
					Theme Color Options
				</Typography>

				<Typography
					className="mb-24 text-justify text-12 italic"
					color="text.secondary"
				>
					* Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also
					create your own theme options and color schemes.
				</Typography>

				<FuseThemeSelector
					options={themeOptions}
					onSelect={(_theme) => {
						dispatch(changeFuseTheme(_theme.section));
					}}
				/>
			</FuseScrollbars>
		</StyledDialog>
	);
}

export default ThemesPanel;
