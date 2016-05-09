var js = js || {},
  body = $('body'),
  doc = $(document);

js.main = {
  init: function () {
    this.linksExternal();
    // this.mbpPlayer();
    this.customCheckbox();
    this.ajaxForm();
    this.gaTimeout();
    this.fadeInScroll();
    this.playSound();
  },
  playSound: function () {
    var sound = $('.sound-control-play');
    $(sound).on('click', function(){
      var url = $(this).attr("data-url");
      var name = $(this).attr("data-name");

      var audio = soundManager.createSound({
        id: name,
        url: url,
        autoLoad: true,
        autoPlay: false,
        // onload: function() {
        //   alert('The sound '+ name +' loaded!');
        // },
        volume: 50
      });
      if (audio.playState == 0) {
        soundManager.play(name);
      } else {
        soundManager.togglePause(name);
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
              $(this).addClass('showme');      
          }  
      }); 
    });
  },
  gaTimeout: function () {
    setTimeout(function(){_gaq.push(['_trackEvent', 'Control', 'Bounce Rate', ''])},60000);
  },
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
  linksExternal: function () {
    $("a[href^='http://']").attr("target", "_blank");
  },
  mbpPlayer: function () {
    function closeTrackList(event){
      var track = $('.mbp-player-tracks-list-names .track');
      $('body').removeClass('overflow');
      $('.site-wrapper,.mbp-player').removeClass('mbp-player-tracks-list-active');
      $('.mbp-player-tracks-list-names').removeClass('active');
    }

    var api = '71a3575c851dae984aa4222250977ad1';
    var redirect = 'http://localhost:8888/mbp/madebyporter/_build/music-higher.html';

    SC.initialize({
      client_id: api,
      redirect_uri: redirect,
    });

    var track_objects = {};
    SC.get('/playlists/31545797').then(function(playlists){
      console.log(playlists.title);
      $(playlists).each(function(index, playlist) {
        var $playlist = $('.mbp-player-tracks-list').eq(index);
        var $tracks = $playlist.find('.mbp-player-tracks-list-names-inner');
        $(playlist.tracks).each(function(i, track) {
          $tracks.append($('<li data-id="' + track.id + '" data-name="' + track.title + '" class="track"></li>').html('<div class="name">' + track.title + '</div><div class="controls"><div class="controls-ele controls-seek">Seek</div><div class="controls-ele controls-state"><div class="controls-state-playing">Playing</div><div class="controls-state-paused">Paused</div></div>'));
        });

        var $track = $tracks.find('.track');
        var sound;
        $track.on('tap',function(){
          var track_id = $(this).attr('data-id');
          var track_name = $(this).attr('data-name');
          console.log(track_id);
          currentSound = sound;
          if( sound ) {
            if(is_playing) {
                currentSound.pause();
                is_playing = false;
                $('.controls-state div').removeClass('active');
                $('.controls-state-paused').addClass('active');
                $(this).removeClass('playing').addClass('paused');
            } else {
                currentSound.play();
                is_playing = true;
                $('.controls-state div').removeClass('active');
                $('.controls-state-playing').addClass('active');
                $(this).removeClass('paused').addClass('playing');
            }
          } else {
            SC.stream('/tracks/' + track_id).then(function(obj){
                sound = obj;
                obj.play();
                is_playing = true;
                $('.controls-state div').removeClass('active');
                $('.controls-state-playing').addClass('active');
                return false;
            });
          }
          $track.removeClass('playing');
          $(this).addClass('playing');
          
        });
      });
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
  }
};

doc.ready(function () {
  js.main.init();
});