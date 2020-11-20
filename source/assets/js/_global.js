var js = js || {}, body = $('body'), doc = $(document), win = $(window);

js.main = {
  init: function () {
    this.linksExternal();
    this.mobileMenu();
    this.clipboard();
    this.prism();
    this.jsFeatures();
    // this.waypointsNav();
  },

  // Keep this shit in ABC Order
  clipboard: function () {
    (function(){
      if (typeof self === 'undefined' || !self.Prism || !self.document) {
        return;
      }
    
      if (!Prism.plugins.toolbar) {
        console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.');
    
        return;
      }
    
      var ClipboardJS = window.ClipboardJS || undefined;
    
      if (!ClipboardJS && typeof require === 'function') {
        ClipboardJS = require('clipboard');
      }
    
      var callbacks = [];
    
      if (!ClipboardJS) {
        var script = document.createElement('script');
        var head = document.querySelector('head');
    
        script.onload = function() {
          ClipboardJS = window.ClipboardJS;
    
          if (ClipboardJS) {
            while (callbacks.length) {
              callbacks.pop()();
            }
          }
        };
    
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js';
        head.appendChild(script);
      }
    
      Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
        var linkCopy = document.createElement('button');
        linkCopy.textContent = 'Copy';
        linkCopy.setAttribute('type', 'button');
    
        var element = env.element;
    
        if (!ClipboardJS) {
          callbacks.push(registerClipboard);
        } else {
          registerClipboard();
        }
    
        return linkCopy;
    
        function registerClipboard() {
          var clip = new ClipboardJS(linkCopy, {
            'text': function () {
              return element.textContent;
            }
          });
    
          clip.on('success', function() {
            linkCopy.classList.add('copied');
            linkCopy.textContent = 'Copied!';
            resetText();
          });
          clip.on('error', function () {
            linkCopy.classList.add('copied');
            linkCopy.textContent = 'Press Ctrl+C to copy';
            resetText();
          });
        }
    
        function resetText() {
          setTimeout(function () {
            linkCopy.textContent = 'Copy';
            linkCopy.classList.remove('copied');
          }, 5000);
        }
      });
    })();    
  },
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