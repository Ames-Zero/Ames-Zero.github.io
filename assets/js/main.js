/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

	// Simple SPA router: show one section at a time
		function activateSection(id, push) {
			var $sections = $('.page-section');
			var $target = $(id);
			if (!$target.length) return;

			var $current = $sections.filter('.active');
			if ($current.length && $current.attr('id') !== id.replace('#','')) {
				$current.addClass('leaving');
				window.setTimeout(function(){
					$current.removeClass('active leaving').attr('aria-hidden', 'true');
				}, 220);
			}

			$target.addClass('active').attr('aria-hidden', 'false');

			$('.nav-link').removeClass('active');
			$('.nav-link[href="' + id + '"]').addClass('active');

			// Smooth scroll to top of content area
			$('html, body').stop().animate({ scrollTop: 0 }, 250, 'swing');

			if (push) {
				history.pushState({ section: id }, '', id);
			}
		}

		// Intercept nav clicks
		$('.nav-link').on('click', function(e) {
			e.preventDefault();
			var id = $(this).attr('href');
			activateSection(id, true);
		});

		// Handle back/forward
		window.addEventListener('popstate', function(ev) {
			var id = (ev.state && ev.state.section) || window.location.hash || '#education';
			activateSection(id, false);
		});

		// Initial route
		$window.on('load', function() {
			var initial = window.location.hash || '#education';
			activateSection(initial, false);
		});

	// Theme toggle functionality
		function initTheme() {
			const savedTheme = localStorage.getItem('theme') || 'light';
			const $body = $('body');
			const $themeIcon = $('.theme-icon');
			
			$body.attr('data-theme', savedTheme);
			updateThemeIcon($themeIcon, savedTheme);
		}
		
		function updateThemeIcon($icon, theme) {
			if (theme === 'dark') {
				$icon.removeClass('fa-moon').addClass('fa-sun');
			} else {
				$icon.removeClass('fa-sun').addClass('fa-moon');
			}
		}
		
		$('#theme-toggle').on('click', function() {
			const $body = $('body');
			const $themeIcon = $('.theme-icon');
			const currentTheme = $body.attr('data-theme') || 'light';
			const newTheme = currentTheme === 'light' ? 'dark' : 'light';
			
			$body.attr('data-theme', newTheme);
			localStorage.setItem('theme', newTheme);
			updateThemeIcon($themeIcon, newTheme);
		});
		
		// Initialize theme on page load
		$window.on('load', function() {
			initTheme();
		});

})(jQuery);