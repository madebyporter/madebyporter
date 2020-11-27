var js = js || {}, body = $('body'), doc = $(document), win = $(window);

js.main = {
  init: function () {
    this.linksExternal();
    this.mobileMenu();
    this.jsFeatures();
  },

  // Keep this shit in ABC Order
  jsFeatures: function () {
    var target = $('.js-features img');
    $('.js-features-list li').on('click', function(){
      var c = $(this).attr('class');
      console.log(c);
      target.removeClass('js-features-show');
      $('img.'+c).addClass('js-features-show');
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
  waypointsNav: function() {
    var sticky = new Waypoint.Sticky({
      element: $('.site-nav-subnav-container')[0]
    }, {
      offset: '2rem'
    })
  }
};

doc.ready(function () {
  js.main.init();
});