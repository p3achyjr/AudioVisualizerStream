function onLoadFailure() {
  $("#sc-url").text(lastUrl);
}

function getStreamUrl() {
  if (scData.kind === "playlist") {
    return scData.tracks[0].stream_url + "?client_id=" + SC_CLIENT_ID;
  } else {
    return scData.stream_url + "?client_id=" + SC_CLIENT_ID;
  }
}

function playStream(stream_url) {
  audioElement.setAttribute('src', stream_url);
  audioElement.play();
  songPlaying = true;
  $("#play").attr('src', icons[songPlaying ? 0 : 1]);
}

function updateWidget() {
  var uploader = scData.user.username;
  var title;
  if (scData.kind === "playlist") {
    title = scData.tracks[0].title;
  } else {
    title = scData.title;
  }

  var songTitle = uploader + ": " + title;
  $("#sc-song-info").text(songTitle);
  console.log(songTitle);
}

function onLoadSuccess() {
  var stream_url = getStreamUrl();
  playStream(stream_url);

  updateWidget();
}

function loadFromSC(track_url) {
  SC.initialize({client_id: SC_CLIENT_ID});
  SC.get("/resolve", { url: track_url, client_id: SC_CLIENT_ID }, 
  function(sound) {
    if (sound.errors) {
      scData = null;
      onLoadFailure();
    } else {
      scData = sound;
      console.log(sound);
      onLoadSuccess();
    }
  });
}

function handleAudio() {
  var source;
  audioElement.addEventListener("canplay", function() {
    source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  });

  renderBars();
  audioElement.play();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /**
   * Your drawings need to be inside this function otherwise they will be reset when 
   * you resize the browser window and the canvas goes will be cleared.
   */
  draw();
}

function displayUrlBox() {
  $("#sc-url").stop(true, false).fadeIn("slow", function() {
    currMusicElem = "url";
  });
  $("#sc-song-info").stop(true, false).fadeOut("slow");
}

function hideUrlBox() {
  $("#sc-song-info").stop(true, false).fadeIn("slow", function() {
    currMusicElem = "song";
  });
  $("#sc-url").stop(true, false).fadeOut("slow");
}

function playBtnHandleClick() {
  if (songPlaying) {
    audioElement['pause']();
  } else {
    audioElement['play']();
  }
  songPlaying = !songPlaying;
  $("#play").attr('src', icons[songPlaying ? 0 : 1]);
}

function handleSubmitUrl() {
  console.log("submitted");
  var track_url = $("#sc-url").text();
  loadFromSC(track_url);
}


$(document).ready( function() {
  // canvas = document.getElementById('canvas');
  // canvasCtx = canvas.getContext('2d');
  // window.addEventListener('resize', resizeCanvas, false);
  // resizeCanvas();
  audioElement = document.getElementById("player");
  audioElement.crossOrigin = "anonymous";
  audioElement.volume = .75;
  $("#sc-song-info").hide();
  window.setTimeout( function() {
    $("#sc-url").fadeOut("slow");
    $("#sc-song-info").fadeIn("slow");
  }, 2500);
  $("#sc-url").hover(displayUrlBox, hideUrlBox);
  $("#sc-song-info").hover(displayUrlBox, hideUrlBox);
  document.getElementById("sc-url").addEventListener("keypress", function(e) {
    if(e.which === 13) {
      handleSubmitUrl();
      e.preventDefault();
    }
  });
  $("#play").click(playBtnHandleClick);
  threeInit();
  initRoom();
  handleAudio();
});