var scene, camera, renderer, controls;
var clock;
var groundMirror;
var rotSpeed = .001;

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var ASPECT = WIDTH/HEIGHT;
var VIEW_ANGLE = 45;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
var freqArr = new Uint8Array(analyser.frequencyBinCount);

var canvas;
var canvasCtx;

var bars = [];
