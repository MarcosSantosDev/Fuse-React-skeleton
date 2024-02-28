import { ReactNode } from 'react';

import FuseScrollbars from '@root/@fuse/core/FuseScrollbars';

/**
 * Props for the FusePageCardedSidebarContent component.
 */
type FusePageCardedSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The FusePageCardedSidebarContent component is a content container for the FusePageCardedSidebar component.
 */
function FusePageCardedSidebarContent(props: FusePageCardedSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<FuseScrollbars enable={innerScroll}>
			<div className="FusePageCarded-sidebarContent">{children}</div>
		</FuseScrollbars>
	);
}

export default FusePageCardedSidebarContent;
