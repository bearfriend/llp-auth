'use strict';

function transition() {

	var direction = 'forward';
	var page = location.hash.slice(1) || 'sign-in';

	var routes = ['sign-in','sign-up','forgot-pw'];
	
	if (routes.indexOf(page) > -1) {

		if (page === 'sign-in') {
			direction = 'backward';
		}
		
		$('.animating-in')
			.removeClass('animating-in animate-in-start inactive')
			.addClass('active');

		$('.animating-out')
			.removeClass('animating-out animate-out-start active')
			.addClass('inactive');
		
		
		$('.active')
			.addClass('animate-out-start animating-out '+direction)
			.one('transitionend', function(e) {

				console.log(e.target);
				
				var target = $(e.target);
				
				target
					.removeClass('animating-out animate-out-start active '+direction)
					.addClass('inactive');		
			});
		
		var $in = $('.page').filter('#'+page)
			.addClass('animate-in-start '+direction)
			.one('transitionend', function(e) {

				console.log(e.target);
				
				var target = $(e.target);
				
				target
					.removeClass('animating-in animate-in-start inactive '+direction)
					.addClass('active');

				document.body.removeAttribute('style');
				
			});

		// weird chrome bug - translate expands scrollWidth outside of document - maybe in combination with flex?
		if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
			window.scrollTo(0,0);
			document.body.style.overflow = 'hidden';
		}
		
		// give the element time to register it's transition.
		setTimeout(function() { $in.addClass('animating-in'); },50);
	}
}

$(window).on('hashchange',transition);

// don't run transition(). It causes weird issues on page load (webkit mac?) and delays usability of the page.
$('#'+(location.hash.slice(1) || 'sign-in')).addClass('active').removeClass('inactive');


document.body.addEventListener('emailChanged',function(e) {
	document.body.querySelector('pl-forgot-pw').email = e.detail.email;
});
