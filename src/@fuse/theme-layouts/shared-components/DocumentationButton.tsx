import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import FuseSvgIcon from '@root/@fuse/core/FuseSvgIcon';

type DocumentationButtonProps = {
	className?: string;
};

/**
 * The documentation button.
 */
function DocumentationButton(props: DocumentationButtonProps) {
	const { className = '' } = props;

	return (
		<Button
			component={Link}
			to="/documentation"
			role="button"
			className={className}
			variant="contained"
			color="primary"
			startIcon={<FuseSvgIcon size={16}>heroicons-outline:book-open</FuseSvgIcon>}
		>
			Documentation
		</Button>
	);
}

export default DocumentationButton;
