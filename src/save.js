/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const {
		attributes: { nbItem, sizeItem, blockId },
	} = props;

	return (
		<>
			<div {...useBlockProps.save()}>
				<div id={blockId}>
					<div className="scroll-wrap">
						<div
							className={`galerie-wrap `}
							style={{
								width: "max-content",
								minWidth: `calc(${nbItem} * 250px + ${(nbItem - 1) * 20}px)`,
								maxWidth: `calc(${nbItem} * 30vw + ${(nbItem - 1) * 20}px) `,
							}}
						>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
				<div className="wrap-presentation"></div>
			</div>
		</>
	);
}
