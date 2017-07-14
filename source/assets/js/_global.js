var js = js || {},
  body = $('body'),
  doc = $(document),
  win = $(window);

js.main = {
  init: function () {
    this.linkDelay();
    this.fadeInScroll();
    this.codeHighlight();
    this.customCheckbox();
    this.formSubmit();
    this.gaTimeout();
    // this.mbpPlayer();
    this.ig();
    this.crumbsDD();
    this.linksExternal();
    this.soundLibrary();
  },

  // Keep this shit in ABC Order

  ajaxForm: function () {
    // Get the form.
    var form = $('#contactForm');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Get the form content
    var formContent = $('.form-content');

    // Get form top
    var offset = form.offset();

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
      // Stop the browser from submitting the form.
      event.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      function scrollTop(){
        // Scroll to top to see error
        $('html, body').animate({
          scrollTop: form.offset().top - 150
        }, 500);
      }

      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      }).done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Set the message text.
        $(formMessages).text(response);

        // Scroll to top to see completion
        scrollTop();

        // Hide Form
        $(formContent).addClass('form-sent');

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
        $('#subscribe').val('');
        $('.form-field-checkbox').val('');

        setTimeout(function() {
          // Show Form
          $(formContent).removeClass('form-sent');
          $(formMessages).removeClass('success').empty();
        }, 3000);

      }).fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Scroll to top to see error
        scrollTop();

        // Set the message text.
        if (data.responseText !== '') {
            $(formMessages).html("<div class='form-message-content'>" + data.responseText + "</div>");
        } else {
            $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
      });
    });
  },
  codeHighlight: function() {
    $('pre code').each(function(i, block) {
      hljs.configure({
        languages: 'css'
      });
    });
  },
  crumbsDD: function () {
    var dd = $('.crumbs-dd');

    dd.on('click', function(){
      $(this).toggleClass('active');
    });
  },
  customCheckbox: function () {
    var $checkBox = $('.form-field-checkbox');
    var $ele = $('.section-content-checklist-ele');
    $checkBox.each(function(){
      $(this).wrap( "<div class='custom-checkbox'></div>" );
    });
    $(doc).on('click', '.section-content-checklist-ele', function(){
      event.stopPropagation();
      if ($(this).find($checkBox).is(':checked')) {
        $(this).find('.custom-checkbox').addClass('checked');
      } else {
        $(this).find('.custom-checkbox').removeClass('checked');
      }
    });
  },
  fadeInScroll: function () {
    setTimeout(function(){$('.showmeonload').addClass('showme'); },2500);

    $(window).scroll( function(){
      /* Check the location of each desired element */
      $('.hideme').each( function(i){  
        // var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_object = $(this).offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        
        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){
          // setTimeout(function(){
            $(this).addClass('showme');
          // }, 200);
        }  
      }); 
    });
  },
  formSubmit: function () {
    $('#contactForm').one('submit',function(){
      var idType = "entry.141953512";
      var inputType = encodeURIComponent($('#type').val());
      var idFname = "entry.84634872";
      var inputFname = encodeURIComponent($('#fname').val());
      var idLname = "entry.228472619";
      var inputLname = encodeURIComponent($('#lname').val());
      var idEmail = "entry.2042919330";
      var inputEmail = encodeURIComponent($('#email').val());
      var idMessage = "entry.797106235";
      var inputMessage = encodeURIComponent($('#message').val());
      var baseURL = 'https://docs.google.com/a/madebyporter.com/forms/d/e/1FAIpQLSerG3d7wwjIHr7LL6LfcKj2XyDGbEG1T3TS_9r2LmvtHajeAw/formResponse?';
      var submitRef = '&submit=Submit';
      var submitURL = (
                        baseURL +
                        idType + "=" + inputType + "&" +
                        idFname + "=" + inputFname + "&" +
                        idLname + "=" + inputLname + "&" +
                        idEmail + "=" + inputEmail + "&" +
                        idMessage + "=" + inputMessage +
                        submitRef);
      console.log(submitURL);
      $(this)[0].action=submitURL;
      $('#form-messages').addClass('success').text('Thanks for your submission. I will get back to you within 24 hours!');
    });
  },
  gaTimeout: function () {
    setTimeout(function(){
      _gaq.push(['_trackEvent', 'Control', 'Bounce Rate', '']);
    },60000);
  },
  ig: function () {
    var gal = $(".photo-gallery"),
        token = '1641373830.59f90b2.8291f13bf0ec4dd086efaffdf6f6377a', // learn how to obtain it below
        userid = 1641373830, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
        hashtag='madebyporterphotos',
        x = x,
        num_photos = 7; // how much photos do you want to get
     
    $.ajax({
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: token, count: num_photos},
      success: function(data){
        // console.log(data);
        for( x in data.data ){
          gal.append('<li class="photo-gallery-ele"><a href="'+data.data[x].link+'" target="_blank"><img src="'+data.data[x].images.standard_resolution.url+'"></a></li>'); 
          // data.data[x].images.low_resolution.url - URL of image, 306х306
          // data.data[x].images.thumbnail.url - URL of image 150х150
          // data.data[x].images.standard_resolution.url - URL of image 612х612
          // data.data[x].link - Instagram post URL 
        }
      },
      error: function(data){
        console.log(data); 
      }
    });
  },
  linkDelay: function () {
    $.expr[':'].external = function (a) {
        var PATTERN_FOR_EXTERNAL_URLS = /^(\w+:)?\/\//;
        var href = $(a).attr('href');
        return href !== undefined && href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1;
    };

    $.expr[':'].internal = function (a) {
        return $(a).attr('href') !== undefined && !$.expr[':'].external(a);
    };

    $('a:internal').click(function (e) {
      e.preventDefault();                   // prevent default anchor behavior
      var goTo = this.getAttribute("href"); // store anchor href

        $('body').addClass('page-leave');

        setTimeout(function(){
        window.location = goTo;
      }, 1000);       
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
  mbpPlayer: function () {

    var audio;
    var playlist;
    var tracks;
    var current;

    if ($('body').hasClass('sounds_index')){
      init();
    }
    
    function init(){
      current = 0;
      audio = $('audio');
      playlist = $('.sound-list');
      tracks = playlist.find('li');
      len = tracks.length - 1;
      audio[0].volume = 1;

      // audio[0].play();
      playlist.find('.sound-title').click(function(e){
          e.preventDefault();
          link = $(this);
          current = link.parent().index();
          run(link, audio[0]);
      });
      audio[0].addEventListener('ended',function(e){
          current++;
          if(current == len){
              current = 0;
              audio[0].pause();
              link = playlist.find('.sound-title')[0];
          }else{
              link = playlist.find('.sound-title')[current];    
          }
          run($(link),audio[0]);
      });
      $(document).on('click', '#play', function(){
        audio[0].play();
        $(this).replaceWith('<div class="mbp-player-button mbp-player-button-pause" id="pause"></div>');
      });

      $(document).on('click', '#pause', function(){
        audio[0].pause();
        $(this).replaceWith('<div class="mbp-player-button mbp-player-button-play" id="play"></div>');
      });
    }
    function run(link, player){
      var name = link.closest('.sound-set').attr('data-name');
      var url = link.closest('.sound-set').attr('data-url');

      player.src = url;
      $('.mbp-player-current .title').html(name);
      $('.mbp-player-download').find('a').attr("href", url);
      $('.sound-control-download').attr("onclick", "ga('send', 'event', { eventCategory: 'download', eventAction: 'music', eventLabel: '"+name+"'});");
      par = link.closest('.sound-set');
      par.addClass('active').siblings().removeClass('active');
      audio[0].load();
      audio[0].play();

      $('.mbp-player-button').replaceWith('<div class="mbp-player-button mbp-player-button-pause" id="pause"></div>');
      $('.sounds_index').addClass('mbp-player-active');
    }

    $(document).on('click', '#play', function(){
      audio[0].play();
      $(this).replaceWith('<div class="mbp-player-button mbp-player-button-pause" id="pause"></div>');
    });

    $(document).on('click', '#pause', function(){
      audio[0].pause();
      $(this).replaceWith('<div class="mbp-player-button mbp-player-button-play" id="play"></div>');
    });
  },
  soundLibrary: function () {
    var dbx = new Dropbox({ accessToken: 'N-g23ovvhLQAAAAAAACYx1-nxB2mgRwZmNQ-nLLuouH4mtTlwzmZw9DSjES0ImmM' });
    dbx.filesListFolder({path: '/Public/music/mbp'})
      .then(function(response) {
        // console.log(response);
        var files = response.entries;
        var list = document.getElementById('list');
        var ol = document.createElement('ol');
        
        files.forEach( function(files) {
          var li = document.createElement('li');
          var div = document.createElement('div');
          var a = document.createElement('a');
          var song = files.name;
          div.innerHTML = song;
          div.className += "sound-title";
          li.appendChild(div);
          li.className += "sound-set";
          list.appendChild(li);
        });
        $('.sound-title').each(function() {
          var $this = $(this);
          $this.html($this.text().replace(/\b.mp3\b/g, ''));
        });
        mbpPlayer();
      })
      .catch(function(error) {
        console.log(error);
      });
    function mbpPlayer(){
      var audio;
      var playlist;
      var tracks;
      var current;
      var volume;
      init();
      function init(){
        current = 0;
        audio = $('audio');
        playlist = $('.sound-list');
        tracks = playlist.find('li');
        len = tracks.length - 1;
        audio[0].volume = 1;

        play = $('#play');
        pause = $('#pause');
        mute = $('#mute');
        muted = $('#muted');

        playlist.find('.sound-title').click(function(e){
            e.preventDefault();
            link = $(this);
            current = link.parent().index();
            run(link, audio[0]);
        });
        audio[0].addEventListener('ended',function(e){
            current++;
            if(current == len){
                current = 0;
                // audio[0].pause();
                link = playlist.find('.sound-title')[0];
            }else{
                link = playlist.find('.sound-title')[current];    
            }
            run($(link),audio[0]);
        });
      }
      function run(link, player){
        // var name = link.closest('.sound-set').attr('data-name');
        var src = 'https://dl.dropboxusercontent.com/u/80054631/music/mbp/';
        var title = link.html();
        var url = src + title + '.mp3';
        player.src = url;
        // $('.mbp-player-current .title').html(name);
        // $('.mbp-player-download').find('a').attr("href", url);
        par = link.closest('.sound-set');
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();

        $('#play').replaceWith('<div id="pause" class="button-pause">Pause</div>');
        $('.controls').addClass('active');
      }
      $(document).on('click', '#play', function(){
        audio[0].play();
        $(this).replaceWith('<div id="pause" class="button-pause">Pause</div>');
      });

      $(document).on('click', '#pause', function(){
        audio[0].pause();
        $(this).replaceWith('<div id="play" class="button-play">Play</div>');
      });
    }
  },
  wpContact: function() {
    function wpInit(){
      var waypoint = new Waypoint({
        element: document.getElementById('site-contact'),
        handler: function(direction) {
          var form = document.getElementById('mbp_form');
          var form_width = form.offsetWidth;
          if(direction==='down'){
            form.classList.add('fixed');
            form.style.width = '100%';
            if (window.matchMedia('(min-width: 992px)').matches) {
              form.style.width = form_width + 'px';
            }
            form.style.top = "20px";
          } else if(direction==='up'){
            form.classList.remove('fixed');
            form.style.top = "auto";
          }
        },
        offset: 20
      });
    }
    function wpFooter(){   
      var waypoint = new Waypoint({
        element: document.getElementById('footer'),
        handler: function(direction) {
          function offset(el) {
            var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
          }

          var footer = document.getElementById('footer');
          var footer_offset = offset(footer);
          var footer_height = footer.offsetHeight;
          var form = document.getElementById('mbp_form');
          var form_height = form.offsetHeight;

          if(direction==='down'){
            form.classList.remove('fixed');
            form.classList.add('bottom');
            var top_pos = footer_offset.top - footer_height - 266;
            form.style.top = top_pos + "px";
          } else if(direction==='up'){
            // form.style.top = 'auto';
            form.classList.remove('bottom');
            form.classList.add('fixed');
            form.style.top = "20px";
          }
        },
        offset: 600
      });
    }

    if ($('body').hasClass('contact')){
      wpInit(); wpFooter();
    }
    win.resize(function () {
      js.main.wpContact();
    });
  },
};

doc.ready(function () {
  js.main.init();
});

