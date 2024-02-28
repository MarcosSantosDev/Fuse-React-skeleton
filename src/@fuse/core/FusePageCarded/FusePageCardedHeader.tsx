import { ReactNode } from 'react';
import clsx from 'clsx';

/**
 * Props for the FusePageCardedHeader component.
 */
type FusePageCardedHeaderProps = {
	header?: ReactNode;
};

/**
 * The FusePageCardedHeader component is a header for the FusePageCarded component.
 */
function FusePageCardedHeader(props: FusePageCardedHeaderProps) {
	const { header = null } = props;

	return <div className={clsx('FusePageCarded-header', 'container')}>{header}</div>;
}

export default FusePageCardedHeader;
