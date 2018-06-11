var js = js || {}, body = $('body'), doc = $(document), win = $(window);

js.main = {
  init: function () {
    this.caseCarousel();
    this.linksExternal();
    this.navWaypoints();
  },

  // Keep this shit in ABC Order

  caseCarousel: function() {
	    var SETTINGS = {
	        navBarTravelling: false,
	        navBarTravelDirection: "",
	        navBarTravelDistance: 320
	    };

	    document.documentElement.classList.remove("no-js");
	    document.documentElement.classList.add("js");

	    // Out advancer buttons
	    var caseAdvancerLeft = document.getElementById("caseAdvancerLeft");
	    var caseAdvancerRight = document.getElementById("caseAdvancerRight");
	    // the indicator
	    // var pnIndicator = document.getElementById("pnIndicator");
	    var caseNav = document.getElementById("caseStudiesWrap");
	    var caseNavContents = document.getElementById("caseStudiesContents");

	    caseNav.setAttribute("data-overflowing", determineOverflow(caseNavContents, caseNav));

	        // Handle the scroll of the horizontal container
	        var last_known_scroll_position = 0;
	        var ticking = false;

	        function doSomething(scroll_pos) {
	            caseNav.setAttribute("data-overflowing", determineOverflow(caseNavContents, caseNav));
	        }

	        caseNav.addEventListener("scroll", function() {
	            last_known_scroll_position = window.scrollY;
	            if (!ticking) {
	                window.requestAnimationFrame(function() {
	                    doSomething(last_known_scroll_position);
	                    ticking = false;
	                });
	            }
	            ticking = true;
	        });


	        caseAdvancerLeft.addEventListener("click", function() {
	          // If in the middle of a move return
	            if (SETTINGS.navBarTravelling === true) {
	                return;
	            }
	            // If we have content overflowing both sides or on the left
	            if (determineOverflow(caseNavContents, caseNav) === "left" || determineOverflow(caseNavContents, caseNav) === "both") {
	                // Find how far this panel has been scrolled
	                var availableScrollLeft = caseNav.scrollLeft;
	                // If the space available is less than two lots of our desired distance, just move the whole amount
	                // otherwise, move by the amount in the settings
	                if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
	                    caseNavContents.style.transform = "translateX(" + availableScrollLeft + "px)";
	                } else {
	                    caseNavContents.style.transform = "translateX(" + SETTINGS.navBarTravelDistance + "px)";
	                }
	                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
	                caseNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
	                // Update our settings
	                SETTINGS.navBarTravelDirection = "left";
	                SETTINGS.navBarTravelling = true;
	            }
	            // Now update the attribute in the DOM
	            caseNav.setAttribute("data-overflowing", determineOverflow(caseNavContents, caseNav));
	        });

	        caseAdvancerRight.addEventListener("click", function() {
	            // If in the middle of a move return
	            if (SETTINGS.navBarTravelling === true) {
	                return;
	            }
	            // If we have content overflowing both sides or on the right
	            if (determineOverflow(caseNavContents, caseNav) === "right" || determineOverflow(caseNavContents, caseNav) === "both") {
	                // Get the right edge of the container and content
	                var navBarRightEdge = caseNavContents.getBoundingClientRect().right;
	                var navBarScrollerRightEdge = caseNav.getBoundingClientRect().right;
	                // Now we know how much space we have available to scroll
	                var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
	                // If the space available is less than two lots of our desired distance, just move the whole amount
	                // otherwise, move by the amount in the settings
	                if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
	                    caseNavContents.style.transform = "translateX(-" + availableScrollRight + "px)";
	                } else {
	                    caseNavContents.style.transform = "translateX(-" + SETTINGS.navBarTravelDistance + "px)";
	                }
	                // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
	                caseNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
	                // Update our settings
	                SETTINGS.navBarTravelDirection = "right";
	                SETTINGS.navBarTravelling = true;
	            }
	            // Now update the attribute in the DOM
	            caseNav.setAttribute("data-overflowing", determineOverflow(caseNavContents, caseNav));
	        });

	        caseNavContents.addEventListener(
	            "transitionend",
	            function() {
	                // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
	                var styleOfTransform = window.getComputedStyle(caseNavContents, null);
	                var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
	                // If there is no transition we want to default to 0 and not null
	                var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
	                caseNavContents.style.transform = "none";
	                caseNavContents.classList.add("pn-ProductNav_Contents-no-transition");
	                // Now lets set the scroll position
	                if (SETTINGS.navBarTravelDirection === "left") {
	                    caseNav.scrollLeft = caseNav.scrollLeft - amount;
	                } else {
	                    caseNav.scrollLeft = caseNav.scrollLeft + amount;
	                }
	                SETTINGS.navBarTravelling = false;
	            },
	            false
	        );

	        function determineOverflow(content, container) {
	            var containerMetrics = container.getBoundingClientRect();
	            var containerMetricsRight = Math.floor(containerMetrics.right);
	            var containerMetricsLeft = Math.floor(containerMetrics.left);
	            var contentMetrics = content.getBoundingClientRect();
	            var contentMetricsRight = Math.floor(contentMetrics.right);
	            var contentMetricsLeft = Math.floor(contentMetrics.left);
	           if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
	                return "both";
	            } else if (contentMetricsLeft < containerMetricsLeft) {
	                return "left";
	            } else if (contentMetricsRight > containerMetricsRight) {
	                return "right";
	            } else {
	                return "none";
	            }
	        }

	        /**
	         * @fileoverview dragscroll - scroll area by dragging
	         * @version 0.0.8
	         *
	         * @license MIT, see https://github.com/asvd/dragscroll
	         * @copyright 2015 asvd <heliosframework@gmail.com>
	         */


	        (function (root, factory) {
	            if (typeof define === 'function' && define.amd) {
	                define(['exports'], factory);
	            } else if (typeof exports !== 'undefined') {
	                factory(exports);
	            } else {
	                factory((root.dragscroll = {}));
	            }
	        }(this, function (exports) {
	            var _window = window;
	            var _document = document;
	            var mousemove = 'mousemove';
	            var mouseup = 'mouseup';
	            var mousedown = 'mousedown';
	            var EventListener = 'EventListener';
	            var addEventListener = 'add'+EventListener;
	            var removeEventListener = 'remove'+EventListener;
	            var newScrollX, newScrollY;

	            var dragged = [];
	            var reset = function(i, el) {
	                for (i = 0; i < dragged.length;) {
	                    el = dragged[i++];
	                    el = el.container || el;
	                    el[removeEventListener](mousedown, el.md, 0);
	                    _window[removeEventListener](mouseup, el.mu, 0);
	                    _window[removeEventListener](mousemove, el.mm, 0);
	                }

	                // cloning into array since HTMLCollection is updated dynamically
	                dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
	                for (i = 0; i < dragged.length;) {
	                    (function(el, lastClientX, lastClientY, pushed, scroller, cont){
	                        (cont = el.container || el)[addEventListener](
	                            mousedown,
	                            cont.md = function(e) {
	                                if (!el.hasAttribute('nochilddrag') ||
	                                    _document.elementFromPoint(
	                                        e.pageX, e.pageY
	                                    ) == cont
	                                ) {
	                                    pushed = 1;
	                                    lastClientX = e.clientX;
	                                    lastClientY = e.clientY;

	                                    e.preventDefault();
	                                }
	                            }, 0
	                        );

	                        _window[addEventListener](
	                            mouseup, cont.mu = function() {pushed = 0;}, 0
	                        );

	                        _window[addEventListener](
	                            mousemove,
	                            cont.mm = function(e) {
	                                if (pushed) {
	                                    (scroller = el.scroller||el).scrollLeft -=
	                                        newScrollX = (- lastClientX + (lastClientX=e.clientX));
	                                    scroller.scrollTop -=
	                                        newScrollY = (- lastClientY + (lastClientY=e.clientY));
	                                    if (el == _document.body) {
	                                        (scroller = _document.documentElement).scrollLeft -= newScrollX;
	                                        scroller.scrollTop -= newScrollY;
	                                    }
	                                }
	                            }, 0
	                        );
	                     })(dragged[i++]);
	                }
	            };


	            if (_document.readyState == 'complete') {
	                reset();
	            } else {
	                _window[addEventListener]('load', reset, 0);
	            }

	            exports.reset = reset;
	        }));
  },
  linksExternal: function () {
    $.expr[':'].external = function (a) {
        var PATTERN_FOR_EXTERNAL_URLS = /^(\w+:)?\/\//;
        var href = $(a).attr('href');
        return href !== undefined && href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1;
    };

    $.expr[':'].internal = function (a) {
        return $(a).attr('href') !== undefined && !$.expr[':'].external(a);
    };

    $('a:external').each(function() {
       var a = new RegExp('/' + window.location.host + '/');
       if(!a.test(this.href)) {
           $(this).click(function(event) {
               event.preventDefault();
               event.stopPropagation();
               window.open(this.href, '_blank');
           });
       }
    });
    $('.newWindow').click(function(){
      window.open($(this).attr('href')); return false;
    });
  },
  navWaypoints: function() {
  	// Get section or article by href
  	function getRelatedContent(el){
  	  return $($(el).attr('href'));
  	}
  	// Get link by section or article id
  	function getRelatedNavigation(el){
  	  return $('.site-nav--list a[href=#'+$(el).attr('id')+']');
  	}

  	$('.site-nav--list a').on('click',function(e){
  	  e.preventDefault();
  	  $('html,body').animate({scrollTop:getRelatedContent(this).offset().top - 20})
  	});

  	var wpDefaults={
  	  context: window,
  	  continuous: true,
  	  enabled: true,
  	  horizontal: false,
  	  offset: 0,
  	  triggerOnce: false
  	};

  	var waypoints = $('.site-block')
  		.waypoint(function(direction) {
				 getRelatedNavigation(this).toggleClass('site-nav--active', direction === 'down');
				}, {
				 offset: '100%'
				})
				.waypoint(function(direction) {
				 getRelatedNavigation(this).toggleClass('site-nav--active', direction === 'up');
				}, {
				 offset: function() {  return -$(this).height() + 100; }
			});
  },
};

doc.ready(function () {
  js.main.init();
});
