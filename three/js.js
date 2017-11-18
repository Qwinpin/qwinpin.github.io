function rend(){
	console.log(grim)
	var scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x22252c );
	var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	var spotLight = new THREE.SpotLight( 0xdfdfdf );
	spotLight.position.set( 0, -50, 50 );
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 1000;  // default
	spotLight.shadow.mapSize.height = 1000; // default
	spotLight.shadow.camera.near = 1;       // default
	spotLight.shadow.camera.far = 1000;
	scene.add(spotLight)
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( {} );
	var group = new THREE.Group();
	for (var i = -50; i < 50; i++){
		for (var j = -37; j < 37; j++){
			var cube = new THREE.Mesh( geometry, material );
			cube.castShadow = true;
			cube.receiveShadow = false;
			scene.add( cube );
			cube.position.x = i;
			cube.position.y = j;
			var obj = String(j+50) + "," + String(i+75)
			if (grim.indexOf(obj) != -1){
				group.add(cube);
			}
		}
	}
	scene.add(group);
	group.position.z += 1;
	var x_cam = 0;
	var y_cam = -80;
	var z_cam = 100;
	var up = true;
	camera.position.set(x_cam, y_cam, z_cam);
	camera.lookAt( scene.position );
	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		//tupl.rotation.y += 0.1;
	}
	animate();
}