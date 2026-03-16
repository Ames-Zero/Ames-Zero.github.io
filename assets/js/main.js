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

	// ============================================
	// Lightweight Google Analytics Helper Functions
	// ============================================
	
	// Helper function to track GA events safely
	function trackGAEvent(eventName, eventParams) {
		if (typeof gtag === 'function' && localStorage.getItem('ga_consent') === 'accepted') {
			gtag('event', eventName, eventParams);
		}
	}
	
	// Initialize GA if consent already given
	function initializeGA() {
		if (localStorage.getItem('ga_consent') === 'accepted' && typeof gtag === 'function') {
			gtag('consent', 'update', {
				'analytics_storage': 'granted'
			});
			gtag('js', new Date());
			gtag('config', 'GA_MEASUREMENT_ID', {
				'anonymize_ip': true,
				'cookie_flags': 'SameSite=None;Secure'
			});
		}
	}
	
	// ============================================
	// Cookie Consent Banner Logic
	// ============================================
	
	$window.on('load', function() {
		var consent = localStorage.getItem('ga_consent');
		var $banner = $('#cookie-consent-banner');
		
		// Show banner if no consent decision has been made
		if (!consent) {
			setTimeout(function() {
				$banner.fadeIn(400);
			}, 1000); // Show after 1 second delay
		} else if (consent === 'accepted') {
			initializeGA();
		}
		
		// Accept button handler
		$('#cookie-accept').on('click', function() {
			localStorage.setItem('ga_consent', 'accepted');
			initializeGA();
			$banner.fadeOut(300);
		});
		
		// Decline button handler
		$('#cookie-decline').on('click', function() {
			localStorage.setItem('ga_consent', 'declined');
			$banner.fadeOut(300);
		});
	});

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
			var id = (ev.state && ev.state.section) || window.location.hash || '#about';
			activateSection(id, false);
		});

		// Initial route
		$window.on('load', function() {
			var initial = window.location.hash || '#about';
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

	// ============================================
	// Lightweight Event Tracking (Essential Only)
	// ============================================
	
	$window.on('load', function() {
		// Track resume downloads
		$('a[href*="resume"], a[href*=".pdf"]').on('click', function() {
			trackGAEvent('resume_download', {
				'event_category': 'Download'
			});
		});
		
		// Track LinkedIn clicks
		$('a[href*="linkedin.com"]').on('click', function() {
			trackGAEvent('linkedin_click', {
				'event_category': 'Social'
			});
		});
		
		// Track GitHub clicks
		$('a[href*="github.com"]').on('click', function() {
			trackGAEvent('github_click', {
				'event_category': 'Social'
			});
		});
		
		// Track project link clicks
		$('.project-card a').on('click', function() {
			var projectTitle = $(this).closest('.project-card').find('h3').text() || 'Project';
			trackGAEvent('project_click', {
				'event_category': 'Projects',
				'event_label': projectTitle
			});
		});
	});

})(jQuery);