import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';

import { closeDialog, fuseDialogSlice, selectFuseDialogProps } from '@root/@fuse/core/FuseDialog/store/fuseDialogSlice';

import { useAppDispatch } from '@root/store/store';
import withSlices from '@root/store/withSlices';

/**
 * FuseDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function FuseDialog() {
	const dispatch = useAppDispatch();
	const options = useSelector(selectFuseDialogProps);

	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="fuse-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
}

export default withSlices([fuseDialogSlice])(FuseDialog);
