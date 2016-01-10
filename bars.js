function initBars() {
  var geometry = new THREE.BoxGeometry( 6.5, .01, 6.5 );
  var material = new THREE.MeshPhongMaterial( { color: 0x000000, 
                                                specular: 0x000000, 
                                                shininess: 50});

  var bar;
  var x = -95;
  var offset = 195 / (analyser.frequencyBinCount/5);
  for(var i = 0; i < analyser.frequencyBinCount/5; i++) {
    bar = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial( { color: 0x000000, 
                                                specular: 0x000000, 
                                                shininess: 50}));
    bar.position.set(x, 0, 0);
    scene.add(bar);
    bars.push(bar);
    x += offset;
  }
}

function initRoom() {
  var planeGeo = new THREE.PlaneBufferGeometry(500, 1000);
  groundMirror = new THREE.Mirror(renderer, camera, {clipBias: 0.003, 
                                                     textureWidth: WIDTH, 
                                                     textureHeight: HEIGHT, 
                                                     color: 0x777777 });
  var mirrorMesh = new THREE.Mesh(planeGeo, groundMirror.material);
  mirrorMesh.add(groundMirror);
  mirrorMesh.rotateX(-Math.PI/2);
  scene.add(mirrorMesh);

  // walls
  // var planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
  // planeTop.position.y = 100;
  // planeTop.rotateX( Math.PI / 2 );
  // scene.add( planeTop );

  var planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
  planeBack.position.z = -150;
  planeBack.position.y = 50;
  scene.add( planeBack );

  var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x252525 } ) );
  planeFront.position.z = 150;
  planeFront.position.y = 50;
  planeFront.rotateY( Math.PI );
  scene.add( planeFront );

  var planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
  planeRight.position.x = 150;
  planeRight.position.y = 50;
  planeRight.rotateY( - Math.PI / 2 );
  scene.add( planeRight );

  var planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
  planeLeft.position.x = -150;
  planeLeft.position.y = 50;
  planeLeft.rotateY( Math.PI / 2 );
  scene.add( planeLeft );

  // lights
  var frontLight = new THREE.PointLight( 0x000099, 1, 500 );
  frontLight.position.y = 60;
  frontLight.position.z = 50;
  scene.add( frontLight );

  var cornerLight = new THREE.PointLight( 0x990000, 1, 300);
  cornerLight.position.set(-100, 60, 50);
  scene.add( cornerLight );

  cornerLight = new THREE.PointLight( 0x990000, 1, 300);
  cornerLight.position.set(100, 60, 50);
  scene.add( cornerLight );

  // var backLight = new THREE.PointLight( 0xcccccc, 1, 250 );
  // backLight.position.y = 60;
  // backLight.position.z = -50;
  // scene.add( backLight );

  var turqLight = new THREE.PointLight( 0x008855, .5, 500 );
  turqLight.position.set( -80, 60, 10 );
  scene.add( turqLight );

  turqLight = new THREE.PointLight( 0x008855, .5, 500 );
  turqLight.position.set( 80, 60, 10 );
  scene.add( turqLight );

  // var blueLight = new THREE.PointLight( 0x7f7fff, 0.25, 1000 );
  // blueLight.position.set( 0, 50, 550 );
  // scene.add( blueLight );
  initBars();
}

function updateBars() {
  analyser.getByteFrequencyData(freqArr);
  // console.log(freqArr);
  var scale, hex, fftVal;

  for(var i = 0; i < bars.length; i++) {
    fftVal = freqArr[i];
    scale = (fftVal * 1.0 / 255) * 12000;
    // console.log(scale);
    hex = (fftVal << 16) + (fftVal << 8) + fftVal;

    bars[i].scale.y = scale < .01 ? .01 : scale;
    bars[i].material.color.setHex(hex);
    bars[i].material.specular.setHex(hex);
  }
}

function rotateCamera() {
  var x = camera.position.x,
      y = camera.position.y,
      z = camera.position.z;

  camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);

  camera.lookAt(scene.position);
}

function renderBars() {
  requestAnimationFrame(renderBars);

  groundMirror.render();
  controls.update();

  updateBars();

  rotateCamera();

  renderer.render(scene, camera);
}





















