import { dropRight, times } from "lodash";

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
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from "@wordpress/block-editor";

import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from "@wordpress/blocks";

import { Fragment } from "@wordpress/element";

import {
	PanelBody,
	RangeControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import { withDispatch, useSelect } from "@wordpress/data";

import styled from "styled-components";
// import { getBlock } from "@wordpress/block-editor";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
// export default function Edit(props) {
function EditBase(props) {
	const { updateNumber, attributes, setAttributes, clientId } = props;
	const { blockId, sizeItem } = attributes;
	if (!blockId) {
		setAttributes({ blockId: clientId });
	}

	const cellWidth = { small: 45, medium: 35, large: 25 };

	const ALLOWED_BLOCKS = ["fourmi-e/image"];
	const BASE_TEMPLATE = [
		["fourmi-e/image", {}],
		["fourmi-e/image", {}],
	];

	const { count } = useSelect(
		(select) => {
			return {
				count: select(blockEditorStore).getBlockCount(clientId),
			};
		},
		[clientId]
	);

	const innerBlocksProps = useInnerBlocksProps({
		allowedBlocks: ALLOWED_BLOCKS,
		template: BASE_TEMPLATE,
		orientation: "horizontal",
		renderAppender: false,
	});

	/*const constructStyle = (count) => {
		const classN = ".galerie-wrap";
		const subClassN = ".block-editor-block-list__layout";

		return `
		#${blockId} ${classN} {
				width: calc(${count * props.attributes.sizeItem * 75}vw + ${
			(count - 1) * 20
		}px )
		}
		#${blockId} ${classN}>${subClassN} {
			grid-template-columns: repeat(auto-fit, ${75 * props.attributes.sizeItem}vw);
		}
		@media (min-width: 768px) {
			#${blockId} ${classN} {
				width: calc(${count * props.attributes.sizeItem * 45}vw + ${
			(count - 1) * 20
		}px )
			}
			#${blockId} ${classN}>${subClassN} {
			grid-template-columns: repeat(auto-fit, ${45 * props.attributes.sizeItem}vw);
		}
		}
		@media (min-width: 1200px) {
			#${blockId} ${classN} {
				width: calc(${count * props.attributes.sizeItem * 35}vw + ${
			(count - 1) * 20
		}px )
			}
			#${blockId} ${classN}>${subClassN} {
			grid-template-columns: repeat(auto-fit, ${35 * props.attributes.sizeItem}vw);
		}
		}
		}`;
	};*/
	const styleGalerieWap = (id, count) => {
		// console.log("coucoou");
		// console.log({ ...useBlockProps() });
		// console.log(props);

		const classN = ".galerie-wrap";
		const subClassN = ".block-editor-block-list__layout";

		let rules = "";
		for (let i = 1; i <= 2; i++) {
			rules = `
			${rules}
			#${id} ${classN}.size-item-${i}>${subClassN}{
				grid-template-columns: repeat(auto-fit, ${cellWidth.small * i}vw);
			}

			@media (min-width: 768px){
				#${id} ${classN}.size-item-${i}>${subClassN}{
					grid-template-columns: repeat(auto-fit, ${cellWidth.medium * i}vw);
				}
			}
			@media (min-width: 1200px){
				#${id} ${classN}.size-item-${i}>${subClassN}{
					grid-template-columns: repeat(auto-fit, ${cellWidth.large * i}vw);
				}
			}
			`;
		}
		return rules;

		// return `
		// 	#${id} ${classN}>${subClassN} {
		// 		grid-template-columns: repeat(auto-fit, ${33 * sizeItem}vw);
		// 	}

		// 	`;
	};

	const changeSizeItem = (value) => {
		props.setAttributes({
			sizeItem: value,
		});
	};

	const GalerieWrap = styled.div`
		width: calc(
			${count * sizeItem * cellWidth.small}vw + ${(count - 1) * 20}px
		);
		@media (min-width: 768px) {
			width: calc(
				${count * sizeItem * cellWidth.medium}vw + ${(count - 1) * 20}px
			);
		}
		@media (min-width: 1200px) {
			width: calc(
				${count * sizeItem * cellWidth.large}vw + ${(count - 1) * 20}px
			);
		} ;
	`;
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody>
					{/* <RangeControl
						label={__("Nombre d'images")}
						value={count}
						onChange={(value) => updateNumber(count, value)}
						min={1}
						max={Math.max(6, count)}
					/> */}
					<NumberControl
						label={__("Nombre d'images")}
						isShiftStepEnabled={true}
						onChange={(value) => updateNumber(count, parseInt(value))}
						shiftStep={1}
						value={count}
						min={1}
					/>
					<RangeControl
						label={__("Facteur de largeur des images")}
						value={props.attributes.sizeItem}
						onChange={(value) => changeSizeItem(value)}
						min={1}
						max={2}
					/>
				</PanelBody>
			</InspectorControls>
			<Fragment>
				<style
					dangerouslySetInnerHTML={{
						__html: styleGalerieWap(blockId, count),
					}}
				></style>
				<div {...useBlockProps()} id={blockId}>
					{/* <div
						className={`galerie-wrap size-item-${sizeItem}`}
						style={{
							width: ` calc(${count * sizeItem * 18}vw + ${
								(count - 1) * 20
							}px )`,
						}}
					> */}
					<GalerieWrap className={`galerie-wrap size-item-${sizeItem}`}>
						<div {...innerBlocksProps}></div>
						{/* <InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={BASE_TEMPLATE}
					/> */}
					</GalerieWrap>
					{/* </div> */}
				</div>
			</Fragment>
		</Fragment>
	);
}
const Edit = withDispatch((dispatch, ownProps, registry) => ({
	updateNumber(prevImgs, newImgs) {
		console.log(
			"🚀 ~ file: edit.js ~ line 243 ~ updateNumber ~ newImgs",
			newImgs
		);
		// return console.log(prevImgs, newImgs);

		const {
			clientId,
			attributes: { blockId },
		} = ownProps;
		const { replaceInnerBlocks } = dispatch(blockEditorStore);
		const { getBlocks } = registry.select(blockEditorStore);

		let innerBlocks = getBlocks(clientId);

		const isAddingImg = newImgs > prevImgs;
		// console.log("🚀 ~ file: edit.js ~ line 129 ~ updateNumber ~ isAddingImg", isAddingImg)

		if (isAddingImg) {
			innerBlocks = [
				...innerBlocks,
				...times(newImgs - prevImgs, () => {
					return createBlock("fourmi-e/image");
				}),
			];
			const conteneur = document.getElementById(blockId);
			const galerie = conteneur.getElementsByClassName("galerie-wrap");
			// console.log("🚀 ~ file: edit.js ~ line 263 ~ updateNumber ~ conteneur", conteneur)
			// console.log("🚀 ~ file: edit.js ~ line 264 ~ updateNumber ~ galerie", galerie)
			setTimeout(() => {
				// conteneur.scrollTo(galerie[0].clientWidth, 0)
				conteneur.scrollTo({
					top: 0,
					left: galerie[0].clientWidth,
					behavior: "smooth",
				});
			}, 500);
			// conteneur.scrollTo({
			// 	left: conteneur.clientWidth,
			// 	top: 0,
			// 	behavior: 'smooth'
			// })
		} else {
			innerBlocks = dropRight(innerBlocks, prevImgs - newImgs);
		}
		ownProps.setAttributes({ nbItem: newImgs });
		replaceInnerBlocks(clientId, innerBlocks);
		// const { clientId } = ownProps;
		// const { getBlockOrder } = registry.select( 'core/block-editor' );
		// const { getBlocks } = registry.select( blockEditorStore );
		// let innerBlocks = getBlocks( clientId );
		// // console.log("🚀 ~ file: edit.js ~ line 71 ~ updateNumber ~ innerBlocks", innerBlocks)
		// return(innerBlocks)
	},
}))(EditBase);
export default Edit;
