function threeInit() {
  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( WIDTH, HEIGHT );
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, .1, 1000);
  camera.position.set( 0, 40, 250 );

  // controls
  controls = new THREE.TrackballControls( camera );
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 0.2;
  // controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
}