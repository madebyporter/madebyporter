var js = js || {}, body = $('body'), doc = $(document), win = $(window);

js.main = {
  init: function () {
    // this.lazyLoad();
    this.linksExternal();
    // this.navWaypoints();
    this.mobileMenu();
    // this.smoothScroll();
    // this.slick();
    // this.aos();
  },

  // Keep this shit in ABC Order
  aos: function () {
    AOS.init({
      offset: 50,
      duration: 400,
      easing: 'ease-in-out-quad',
      delay: 300,
    });
  },
  lazyLoad: function () {
    document.addEventListener("DOMContentLoaded", function() {
      yall({
        observeChanges: true
      });
    });
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
  mobileMenu: function() {
    $('#functionMenuTrigger').on("click", function(){
      console.log('hello');
      if($('body').hasClass('menuOpen')){
        $('body').removeClass('menuOpen');
      } else {
        $('body').addClass('menuOpen');
      }
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
  	  // e.preventDefault();
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
  slick: function() {
    function createSlick(){
      $(".case-studies--contents").not('.slick-initialized').slick({
      infinite: true,
      arrows: true,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      prevArrow: '<div class="case-studies--advancer case-studies--advancer-left"><i class="far fa-angle-left"></div>',
      nextArrow: '<div class="case-studies--advancer case-studies--advancer-right"><i class="far fa-angle-right"></div>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
      ]
    });
    }
    createSlick();
    win.on('resize', createSlick);
  },
  smoothScroll: function() {
    // Vanilla JavaScript Scroll to Anchor
    // @ https://perishablepress.com/vanilla-javascript-scroll-anchor/

    (function() {
      scrollTo();
    })();

    function scrollTo() {
      var links = document.getElementsByTagName('a');
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if ((link.href && link.href.indexOf('#') != -1) && ((link.pathname == location.pathname) || ('/' + link.pathname == location.pathname)) && (link.search == location.search)) {
          link.onclick = scrollAnchors;
        }
      }
    }

    function scrollAnchors(e, respond = null) {
      const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
      e.preventDefault();
      var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
      const targetAnchor = document.querySelector(targetID);
      if (!targetAnchor) return;
      const originalTop = distanceToTop(targetAnchor);
      window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
      const checkIfDone = setInterval(function() {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
          targetAnchor.tabIndex = '-1';
          targetAnchor.focus();
          window.history.pushState('', '', targetID);
          clearInterval(checkIfDone);
        }
      }, 100);
    }
  }
};

doc.ready(function () {
  js.main.init();
});
