// console.log("hello world");

$(document).ready(() => {
	const galeries = $(".wp-block-fourmi-e-galerie");

	galeries.each(function () {
		galerie($(this)[0]);
	});
});

const galerie = (block) => {
	const thisBlock = $(block.firstChild);
	const wrapPresentation = $(block).find(".wrap-presentation");
	const variable = window[`block_${thisBlock.attr("id").replace(/-/g, "_")}`];
	// console.log(
	// 	"🚀 ~ file: test2.js ~ line 19 ~ galerie ~ wrapPresentation",
	// 	wrapPresentation
	// );
	let wrapInstance = wrapPresentation.find(".content")
				.overlayScrollbars({
					className: "os-theme-fourmi-e",
					scrollbars: { visibility: "visible" },
				})
	// console.log("🚀 ~ file: test2.js ~ line 17 ~ galerie ~ thisBlock", thisBlock);
	// console.log("🚀 ~ file: test2.js ~ line 18 ~ galerie ~ variable", variable);
	thisBlock.find(".wp-block-fourmi-e-image ").each(function () {
		$(this).on("click", function () {
			// console.log(
			// 	"🚀 ~ file: test2.js ~ line 25 ~ $(this).innerHtml",
			// 	$(this).html()
			// );
			// console.log("coucoucou");
			wrapPresentation.addClass("ouvert");
			wrapPresentation.append(
				'<div class="content"><figure >' + $(this).html() + "</figure></div>"
			);

			wrapInstance = wrapPresentation.find(".content")
			.overlayScrollbars({
				className: "os-theme-fourmi-e",
				scrollbars: { visibility: "visible" },
			}).overlayScrollbars();
            // console.log("🚀 ~ file: test2.js ~ line 44 ~ wrapInstance", wrapInstance)
		});
	});
	wrapPresentation.on('click', function(){
		wrapInstance.destroy()
		$(this).empty()
		$(this).removeClass('ouvert')
	})
};

const createPresentation = (wrap, fig) => {};
