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

    // $.get('http://api.soundcloud.com/resolve.json?url=https://soundcloud.com/madebyporter/sets/a-story-to-tell-freeway&client_id=' + api, function (result) {
    //   console.log(result);
    // });

    SC.initialize({
      client_id: api,
      redirect_uri: redirect,
    });

    var track_objects = {};

    // SC.get('/users/' + USER + '/playlists', function(playlists) {
    SC.get('/playlists/31545797').then(function(playlists){
      console.log(playlists.title);
      var sound;
      $(playlists).each(function(index, playlist) {
        var $playlist = $('.mbp-player-tracks-list').eq(index);

        // $playlist.append($('<li class="track"></li>').html('<div class="name">' + track.title + '</div>'));
        var $tracks = $playlist.find('.mbp-player-tracks-list-names-inner');
        $(playlist.tracks).each(function(i, track) {
          $tracks.append($('<li data-id="' + track.id + '" data-name="' + track.title + '" class="track"></li>').html('<div class="name">' + track.title + '</div>'));
        });

        var $track = $tracks.find('.track');
        
        $track.on('tap',function(){
          var track_id = $(this).attr('data-id');
          var track_name = $(this).attr('data-name');
          console.log(track_id);

          SC.stream('/tracks/' + track_id).then(function(sound){
            sound.play();
            sound.on("state-change", function(state) {
              console.log(state);
            });
          });

          $tracks.removeClass('playing');
          $(this).addClass('playing');

          closeTrackList();

          $('.mbp-player-song-current-title').text(track_name);
        });

      });
    });

  },
};

doc.ready(function () {
  js.main.init();
});