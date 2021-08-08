<?php
/*
Plugin Name: Archive Retrieval
Version: 1.0
Description: Allows the user to select a date from a calendar GUI and retrieves the link to the appropriate issue for that date.
Author: Jorie Sieck
Author URI: http://joriesieck.com
License: GPL2
*/

/* create a shortcode to be placed in any WP page or post -- shortcode is 'archive-retrieval-widget' */
add_shortcode('archive-retrieval-widget', 'archive_retrieval_setup');
function archive_retrieval_setup() {
	/* enqueue scripts */
	// my script
	wp_enqueue_script(
		'app-js',
		plugins_url('app.js',__FILE__),
		time(),
		true
	);

	// calendar scripts
	wp_enqueue_script(
		'jsuites',
		'https://jsuites.net/v4/jsuites.js',
		time(),
		true
	);
	wp_enqueue_script(
		'jsuites-webcomponents',
		'https://jsuites.net/v4/jsuites.webcomponents.js',
		time(),
		true
	);

	/* enqueue stylesheets */
	// calendar styling
	wp_enqueue_style(
		'jsuites-css',
		'https://jsuites.net/v4/jsuites.css',
		[],
		time(),
		'all'
	);
	// my styling
	wp_enqueue_style(
		'styles-css',
		plugins_url('styles.css',__FILE__),
		[],
		time(),
		'all'
	);
}

?>