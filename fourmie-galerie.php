<?php
/**
 * Plugin Name:       Fourmie Galerie
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       fourmie-galerie
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */

function assestsCallback($attributes, $content )
{
    if (!is_admin() && file_exists(plugin_dir_path(__FILE__) . 'front-galerie.js')) {

        wp_enqueue_script(
            'intitJsAsset',
            plugins_url('./front-galerie.js', __FILE__),
            // file_get_contents( __DIR__ . '/build/index.asset.php' ) ,
            array_merge([

                'jquery',
            ]),
            '1',
            true
        );
        // wp_localize_script('intitJsAsset', 'attributes', [ preg_replace('/-/', '_', $attributes['blockId']) => $attributes]);

        wp_localize_script('intitJsAsset', 'block_' . preg_replace('/-/', '_', $attributes['blockId']), $attributes);
    }
	return $content;
}
function create_block_fourmie_galerie_block_init()
{
    register_block_type(__DIR__, array(
        'render_callback' => 'assestsCallback',
    ));

}
add_action('init', 'create_block_fourmie_galerie_block_init');
