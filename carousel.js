// ------------------------------------
//
// Theme
//
// ------------------------------------

(function($) { // eslint-disable-line no-unused-vars

	if (typeof window.Theme == 'undefined') window.Theme = {};

	Theme = {

		settings: {},

		/*
		 * Theme init
		 */

		init: function() {

			this.browserClasses();
			this.swiper();
			this.teaserHovers();
			this.selectricInit();
			this.featureOnChange();
			this.onIntrestFilterClick();
			this.postHeight();
			this.onFacetLoad();
			this.timeTable();
			this.siteDropdownMenu();
			// this.eventClasses();
			this.searchForm();
			this.instafeed();
			this.mobileMenu();
			this.newsletterPopup();
			this.vh();
			this.faq();
			this.exhibitors();
			console.log('Theme initilised');

		},

		browserClasses: function() {
			var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			function msieversion() {

			    var ua = window.navigator.userAgent;
			    var msie = ua.indexOf("MSIE ");

			    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
			    {
			        $('body, html').addClass('msie');
			    }

			    return false;
			}

			msieversion();

			if (/Edge/.test(navigator.userAgent)) {
			    $('body').addClass('edge');
			}

			function isWindows() {
				return navigator.platform.indexOf('Win') > -1
			}

			var isPC = isWindows();

			if(isPC == true) {
				$('body').addClass('windows');
			}

			if(iOS == true) {
				$('body').addClass('iOS');
			}
		},

		swiper: function() {

			var headerCarousel = new Swiper ('.block-header-carousel .swiper-container', {
				loop: true,
				slidesPerView: 1,
				pagination: {
					el: '.block-header-carousel .swiper-pagination',
					type: 'bullets',
					clickable: true,
				}
			});

			var partners = new Swiper ('.block-partners__swiper.swiper-container', {
				loop: true,
				slidesPerView: 6,
				spaceBetween: 16,
			    autoplay: {
				    delay: 3000,
				},
				navigation: {
					nextEl: '.block-partners .swiper-next',
					prevEl: '.block-partners .swiper-prev',
				},
				breakpoints: {
					800: {
						slidesPerView: 3,
					},
				}
			});
		},

		teaserHovers: function() {
			// $('.teaser__image').mouseenter(function() {
			// 	$(this).closest('.teaser').addClass('hovered');
			// )};

			$('.teaser__image, .teaser__title').mouseenter(function() {
				$(this).closest('.teaser').addClass('hovered');
			});

			$('.teaser__image, .teaser__title').mouseleave(function() {
				$(this).closest('.teaser').removeClass('hovered');
			});

			$('.teaser-post__image, .teaser-post__title').mouseenter(function() {
				$(this).closest('.teaser-post').addClass('hovered');
			});

			$('.teaser-post__image, .teaser-post__title').mouseleave(function() {
				$(this).closest('.teaser-post').removeClass('hovered');
			});
		},

		// State of the filter
		filterState: {
			activeFilters: [],
			currentFeature: ''
		},

		selectricInit: function() {
			$('select').selectric();

			$(document).on('facetwp-loaded', function() {
			   $('select').selectric();
			   Theme.postHeight();
			});
		},

		addRemoveFeature: function(feature) {

		},

		featureOnChange: function() {
			var currentValue = $(".feature-filter option:selected").data('feature');
			Theme.filterState.currentFeature = currentValue;

			$('.feature-filter').on('selectric-change', function(event, element, selectric) {
			    var currentValue = $(".feature-filter option:selected").data('feature');
			    Theme.filterState.currentFeature = currentValue;

				$('.interest-filter').removeClass('is-active');
				Theme.filterState.activeFilters = [];
			    Theme.eventClasses();
				Theme.noResults();
			});
		},

		onIntrestFilterClick: function() {
			// on filter button click
			$('.interest-filter').click(function(e) {
				e.preventDefault();

				// get data-interest of clicked filter
				var thisInterest = $(this).data('interest');

				// if data-interest of this button is not in the active filter array
				if(!Theme.filterState.activeFilters.includes(thisInterest)) {
					// add active class
					$(this).addClass('is-active');

					// push value to activeFilters in filter state
					Theme.filterState.activeFilters.push(thisInterest);
				} else {
					// remove active class
					$(this).removeClass('is-active');

					// remove from activeFilters in filter state
					var index = Theme.filterState.activeFilters.indexOf(thisInterest)
				    if (index > -1) {
				       Theme.filterState.activeFilters.splice(index, 1);
				    }
				}
				Theme.eventClasses();
				Theme.noResults();

				// if(!$('.interest-filter').hasClass('is-active')) {
				// 	console.log('fired');
				// 	$('.event--filtered').removeClass('hidden-interest').removeClass('hidden-feature');
				// }
				console.log(Theme.filterState.activeFilters);
			});
		},

		eventClasses: function() {
			console.log(Theme.filterState.currentFeature);
			$('.timetable__day-item').each(function() {
				var interests = $(this).data('interest');
				var feature = $(this).data('feature');
				var thisEvent = $(this);

				interests = interests.split(' ');
				interests.splice(-1, 1);

				if(!Theme.filterState.activeFilters.length == 0) {

					$.each(interests, function(index, value){
					    if(!Theme.filterState.activeFilters.includes(value)) {
							thisEvent.addClass('hidden-interest');
						} else {
							thisEvent.removeClass('hidden-interest');
						}
					});
				} else {
					$('.timetable__day-item').removeClass('hidden-interest');
				}


				if(feature == Theme.filterState.currentFeature) {
					thisEvent.removeClass('hidden-feature');
					console.log('yes');
				} else if(Theme.filterState.currentFeature == 'all') {
					thisEvent.removeClass('hidden-feature');
					console.log('else');
				} else {
					thisEvent.addClass('hidden-feature');
				}
			});

			if(Theme.filterState.currentFeature == 'all') {
				$('.selectric').removeClass('is-active');
			} else {
				$('.selectric').addClass('is-active');
			}
		},

		noResults: function() {
			$('.template-plan-your-day .timetable__day').each(function() {
				var totalCount = $(this).find('.timetable__day-item').length;
				var hiddenItems = 0;

				$(this).find('.timetable__day-item').each(function() {
					if($(this).hasClass('hidden-interest') || $(this).hasClass('hidden-feature')) {
						hiddenItems++
					}
				});

				console.log('totalCount', totalCount);
				console.log('hiddenItems', hiddenItems);

				if(totalCount == hiddenItems) {
					console.log('true');
					$(this).find('.no-result').addClass('is-active');
				} else {
					console.log('false');
					$(this).find('.no-result').removeClass('is-active');
				}
			});
		},

		postHeight: function() {
			if($('.template-blog').length || $('.block-teasers__items').length) {
				var elementHeight = 0;
				if($(window).outerWidth() > 736) {
					if($('.template-blog').length) {
						$('.template-blog .teaser-post').each(function() {
							if($(this).outerHeight() > elementHeight) {
								elementHeight = $(this).outerHeight();
								elementHeight = elementHeight + 5;
							}
							// $('.template-blog .teaser-post:lt(3)').wrap('<div />');
						});

						$('.template-blog .teaser-post').css('min-height', elementHeight + 'px');
					}

					if($('.block-teasers__items').length) {
						$('.block-teasers__items .teaser').each(function() {
							if($(this).outerHeight() > elementHeight) {
								elementHeight = $(this).outerHeight();
								elementHeight = elementHeight + 5;
							}
						});

						$('.block-teasers__items .teaser').css('min-height', elementHeight + 'px');
					}
				}
			}

			$(window).on('load resize', function() {
				if($(window).outerWidth() > 736) {
					if($('.single-event').length) {
						var height = $('.single-event .box--large').outerHeight();
						console.log('fired');
						$('.single-event .box--small').css('min-height', height+'px');
					}
				}
			});

		},

		onFacetLoad: function() {
			$(document).on('facetwp-loaded', function() {
			   Theme.postHeight();
			});
		},

		timeTable: function() {
			$('.timetable__tab').click(function() {
				var thisCount = $(this).data('count');
				$(this).addClass('is-active');
				$('.timetable__tab').not(this).removeClass('is-active');

				$('.timetable__day').each(function() {
					if($(this).data('count') == thisCount) {
						$(this).addClass('is-active');
					} else {
						$(this).removeClass('is-active');
					}
				});
			});
		},

		siteDropdownMenu: function() {
			$('.site-navigation__current-item').click(function(e) {
				if(!$(this).hasClass('is-active')) {
					e.preventDefault();
				}
				$(this).toggleClass('is-active');
				$('.site-navigation__list').toggleClass('is-active');
			});
		},

		searchForm: function() {
			// $('.search-submit').click(function(e) {
			// 	if(!$('.search-form').hasClass('is-active')) {
			// 		e.preventDefault();
			// 		$('.search-form').addClass('is-active');
			// 	} else {
			//
			// 	}
			// });

			$('.search-field').bind('focus blur', function() {
				if(!$('.search-form').hasClass('is-active')) {
					$('.search-form').addClass('is-active');
				} else {
					$('.search-form').removeClass('is-active');
				}
			});
		},

		instafeed: function() {
			if($('.block-instagram-feed').length > 0) {
				if($(window).outerWidth() > 736) {
					var limit = 20;
				} else {
					var limit = 6;
				}
				var userFeed = new Instafeed({
					get: 'user',
					userId: 364523819,
					resolution: 'standard_resolution',
					accessToken: '364523819.1677ed0.f16c166a17e348e393154b6c6db73e3e',
					template: '<div class="block-instagram-feed__item swiper-slide" style="background-image:url({{image}})"></div>',
					limit: limit,
					after: function() {
						if($(window).outerWidth() > 736) {
							var instagramFeed = new Swiper ('.block-instagram-feed__swiper.swiper-container', {
								loop: true,
								slidesPerView: 6,
								spaceBetween: 16,
								navigation: {
									nextEl: '.block-instagram-feed .swiper-next',
									prevEl: '.block-instagram-feed .swiper-prev',
								},
							});
						}
					}
				});
				userFeed.run();
			} else {
				if($(window).outerWidth() > 736) {
					var instagramFeed = new Swiper ('.block-instagram-feed__swiper.swiper-container', {
						loop: true,
						slidesPerView: 6,
						spaceBetween: 16,
						navigation: {
							nextEl: '.block-instagram-feed .swiper-next',
							prevEl: '.block-instagram-feed .swiper-prev',
						},
					});
				}
			}
		},

		mobileMenu: function() {
			$('#hamburger').click(function(e) {
				e.preventDefault();
				$(this).toggleClass('is-active');
				$('.mobile-menu').toggleClass('is-active');
				$('html').toggleClass('menu-active');
			});
		},

		newsletterPopup: function() {
			$('.block-newsletter-popup__close, .block-newsletter-popup__overlay').click(function(e) {
				e.preventDefault();
				$('.block-newsletter-popup').removeClass('is-active');
			});

			$('.block-newsletter-signup__button a, .toggle-newsletter').click(function(e) {
				console.log('click');
				e.preventDefault();
				$('.block-newsletter-popup').addClass('is-active');
			});

			$('.text-input input').bind('focus blur', function() {
				if(!$(this).val().length) {
					if(!$(this).prev().hasClass('hidden')) {
						$(this).prev().addClass('hidden');
					} else {
						$(this).prev().removeClass('hidden');
					}
				}
			});
		},

		vh: function() {
			jQuery(window).on('resize load', function() {
			    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
			    const vh = window.innerHeight * 0.01;
			    // Then we set the value in the --vh custom property to the root of the document
			    document.documentElement.style.setProperty('--vh', vh+'px');
			});
		},

		faq: function() {
			$('.teaser-faq__heading').click(function() {
				var $thisContent = $(this).siblings('.teaser-faq__content');
				$thisContent.slideToggle();
				$('.teaser-faq__content').not($thisContent).slideUp();
				$('.teaser-faq__heading').not(this).removeClass('is-active');
				$(this).toggleClass('is-active');
			});
		},

		exhibitors: function() {
			function getUrlParam(name) {
			    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
			    return (results && results[1]) || undefined;
			}

			$(document).on('facetwp-loaded', function() {
				var exhibitionCategories = getUrlParam('_exhibition_categories');
				var alphabetical = getUrlParam('_sort');

				if (exhibitionCategories > "") {
				    $('.facetwp-facet-exhibition_categories .selectric').addClass('is-active');
				} else {
					$('.facetwp-facet-exhibition_categories .selectric').removeClass('is-active');
				}

				if (alphabetical > "") {
				    $('.facetwp-sort .selectric').addClass('is-active');
				} else {
					$('.facetwp-sort .selectric').removeClass('is-active');
				}
			});
		}
	};

	module.exports = Theme;

})(jQuery);
