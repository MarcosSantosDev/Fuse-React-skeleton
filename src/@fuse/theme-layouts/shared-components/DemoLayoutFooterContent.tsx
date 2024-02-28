import DocumentationButton from './DocumentationButton';
import PoweredByLinks from './PoweredByLinks';
import PurchaseButton from './PurchaseButton';

/**
 * The demo layout footer content.
 */
function DemoLayoutFooterContent() {
	return (
		<>
			<div className="flex shrink-0 grow">
				<PurchaseButton className="mx-4" />
				<DocumentationButton className="mx-4" />
			</div>

			<div className="flex shrink-0 grow justify-end px-12">
				<PoweredByLinks />
			</div>
		</>
	);
}

export default DemoLayoutFooterContent;
