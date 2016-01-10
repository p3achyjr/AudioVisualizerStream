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
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.rotateSpeed = .1;
  controls.zoomSpeed = .4;
  controls.keyPanSpeed = 5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.3;
}