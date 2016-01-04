function draw() {
  requestAnimationFrame(draw);
  var w = canvas.width;
  var h = canvas.height;
  var n = analyser.frequencyBinCount;
  // Get the new frequency data
  analyser.getByteFrequencyData(freqArr);

  // Update the visualisation
  canvasCtx.clearRect(0, 0, w, h);

  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, w, h);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(200, 60, 70)';

  canvasCtx.beginPath();
  var sliceWidth = (w * 5.0)/n;
  var x = 0;
  var y;
  var prevY = 0

  for(var i = 0; i < n/5; i++) {
    y = h - (((freqArr[i]*1.0)/255.0) * h);

    if(i === 0 || (prevY === h && y === h)) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
    prevY = y;
  }
  canvasCtx.stroke();
}

function handleAudio() {
  var audioElement = document.getElementById("player");
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


$(document).ready( function() {
  // canvas = document.getElementById('canvas');
  // canvasCtx = canvas.getContext('2d');
  // window.addEventListener('resize', resizeCanvas, false);
  // resizeCanvas();
  threeInit();
  initRoom();
  handleAudio();
});