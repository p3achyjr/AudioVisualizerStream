// THREEJS
var scene, camera, renderer, controls;
var clock;
var groundMirror;
var rotSpeed = .0003;

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var ASPECT = WIDTH/HEIGHT;
var VIEW_ANGLE = 45;

// WEB AUDIO API
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
analyser.smoothingTimeConstant = 0.75;
var freqArr = new Uint8Array(analyser.frequencyBinCount);
var audioElement;
var nodeBound = false;

var canvas;
var canvasCtx;

// VISUALIZATION
var bars = [];

// FRONTEND
var SC_CLIENT_ID = "57752f80398a70ff5cacb186de7e75d4";
var SC_CLIENT_SECRET = "3e7ff1760f5c9493e85652bae9c81993";
var lastUrl = "";
var songPlaying = true;
var icons = ["img/pause-icon.png", "img/play-icon.png"];

var scData = null;
var updateTime = true;