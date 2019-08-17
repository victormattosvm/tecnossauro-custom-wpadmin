<?php


/**
 * Plugin Name: Tecnossauro Custom Wp-admin
 * Plugin URI: https://tecnossauro.com.br
 * Description: Tema customizado para o wp-admin
 * Version: 1.0
 * Author: Tecnossauro
 * Author URI: https://tecnossauro.com.br
 */


add_action( 'admin_enqueue_scripts', 'enqueue_files' );
add_action( 'login_enqueue_scripts', 'enqueue_files' );

function enqueue_files() {
  wp_enqueue_style( 'clik-admin-theme', plugins_url('css/admin.min.css', __FILE__), array(), '1.1.8' );
}

add_filter('admin_footer_text', 'clik_admin_footer_text_output');

function clik_admin_footer_text_output($text) {
	$text = 'Desenvolvido em Wordpress pelo <a href="https://www.tecnossauro.com.br/" target="_blank">Tecnossauro</a>.';
  return $text;
}


?>
