import { dropRight, times } from "lodash";

import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { Button, ToolbarGroup, ToolbarButton } from "@wordpress/components";
import {
	BlockControls,
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

import "./editor.scss";

export default function Edit(props) {
	const { clientId, attributes, setAttributes } = props;
	const { nbItem, blockId } = attributes;
	const { replaceInnerBlocks } = useDispatch("core/block-editor");
	const ALLOWED_BLOCKS = ["fourmi-e/image"];
	const BASE_TEMPLATE = [
		["fourmi-e/image", { style: { backgroundColor: "blue" } }],
		["fourmi-e/image", {}],
	];
	const variation = {
		name: "my-variation",
		title: __("My variation"),
		innerBlocks: [["fourmi-e/image", {}]],
	};
	const { getBlocks } = useSelect("core/block-editor");

	const updateNumber = (value) => {
		console.log(value);
		let innerBlocks = getBlocks(clientId);
		if (!blockId) {
			setAttributes({ blockId: clientId });
		}
		if (value !== innerBlocks.length) {
			if (value - innerBlocks.length > 0) {
				console.log(innerBlocks);
				console.log(createBlocksFromInnerBlocksTemplate(variation.innerBlocks));

				let queryBlock = times(value - innerBlocks.length, () => {
					return variation.innerBlocks[0];
				});

				let addResult = [
					...innerBlocks,
					...createBlocksFromInnerBlocksTemplate(queryBlock),
				];
				console.log(addResult);
				replaceInnerBlocks(clientId, addResult);

				const conteneur = document.getElementById(clientId);
				const galerie = conteneur.getElementsByClassName("galerie-wrap");
				setTimeout(() => {
					// conteneur.scrollTo(galerie[0].clientWidth, 0)
					conteneur.scrollTo({
						top: 0,
						left: galerie[0].clientWidth,
						behavior: "smooth",
					});
				}, 500);
			} else if (value - innerBlocks.length < 0) {
				let subresult = dropRight(innerBlocks, innerBlocks.length - value);
				replaceInnerBlocks(clientId, subresult);
			}
		}
	};
	useEffect(() => {
		updateNumber(nbItem);
	}, [nbItem]);

	// const blockProps = useBlockProps({});
	// const innerBlocksProps = null;
	const innerBlocksProps = useInnerBlocksProps({
		allowedBlocks: ALLOWED_BLOCKS,
		template: BASE_TEMPLATE,
		templateLoc: "insert",
	});
	setAttributes({ blockId: clientId });
	return (
		<>
			<InspectorControls>
				<NumberControl
					label={__("Nombre d'images")}
					isShiftStepEnabled={true}
					onChange={(value) => setAttributes({ nbItem: parseInt(value) })}
					shiftStep={1}
					value={nbItem}
					min={1}
				/>
			</InspectorControls>

			<div {...useBlockProps()} id={clientId}>
				<div
					{...innerBlocksProps}
					className={`${innerBlocksProps.className} galerie-wrap`}
					style={{
						width: "max-content",
						minWidth: `calc(${nbItem} * 250px + ${(nbItem - 1) * 20}px)`,
						maxWidth: `calc(${nbItem} * 30vw + ${(nbItem - 1) * 20}px) `,
					}}
				/>
				{/* <InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={BASE_TEMPLATE}
						templateLock="all"
						style={{
							width: "max-content",
							minWidth: `calc(${nbItem} * 250px + ${(nbItem - 1) * 20}px)`,
							maxWidth: `calc(${nbItem} * 30vw + ${(nbItem - 1) * 20}px) `,
						}}
					/> */}
			</div>
		</>
	);
}
