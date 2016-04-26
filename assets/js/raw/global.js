var js = js || {},
  body = $('body'),
  doc = $(document);

js.main = {
  init: function () {
    this.linksExternal();
    this.indicatorTrigger();
    this.playerTrackTrigger();
    this.mbpPlayer();
  },
  linksExternal: function () {
    $("a[href^='http://']").attr("target", "_blank");
  },
  indicatorTrigger: function () {
    var indicator = $('.mbp-player-tracks-list-indicators .indicator');
    indicator.on("tap",function(){
      $('body').addClass('overflow');
      $('.site-wrapper,.mbp-player').addClass('mbp-player-tracks-list-active');
      indicator.removeClass('tapped active');
      $(this).addClass('tapped active');
      $('.mbp-player-tracks-list-names').addClass('active');
    });
  },
  playerTrackTrigger: function () {
    
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
};

doc.ready(function () {
  js.main.init();
});