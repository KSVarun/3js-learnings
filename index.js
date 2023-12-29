import * as THREE from 'three';
// import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#webgl');
const sizes = { width: window.innerWidth, height: window.innerHeight };
const mouse = {
  x: 0,
  y: 0,
};
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX / sizes.width - 0.5;
  mouse.y = -(e.clientY / sizes.height - 0.5);
});
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
window.addEventListener('dblclick', () => {
  const fullScreen =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullScreen) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
      return;
    }
    if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
      return;
    }
    return;
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
    return;
  }
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    return;
  }
});

//scene
const scene = new THREE.Scene();

//object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//   color: '#fff',
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0.7, -0.6, 1);
// scene.add(mesh);

//group
// const group = new THREE.Group();
const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: '#fff' })
);
const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: '#fffaaa' })
);
mesh1.position.set(0, 0, 0);
mesh2.position.set(0.75, 0, 1);
// group.add(mesh1);
// group.add(mesh2);
scene.add(mesh1);
// scene.add(mesh2);

//AxesHelper adds three co-ordinate lines to the origin of the scene
// const axisHelper = new THREE.AxesHelper();
// scene.add(axisHelper);

//scale
// mesh.scale.set(2, 1, 1);

//rotation
//reorder will set the order in which rotation should be applied to the mesh, even if the order in which
//code is written is different the reorder will take priority, reorder should be specified at the beginning
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = 2;
// mesh.rotation.y = Math.PI / 2;
// mesh.rotation.z = 2.5;

//camera
//greater the value of fov (first paramerter) the larger is the vertical field of view of the camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

//lookAt will point the camera to point to different position of the scene
// camera.lookAt(new THREE.Vector3(0, 0, 0));

//distance between origin and the object
// console.log(mesh.position.length());

//distance between the camera and the object
// console.log(mesh.position.distanceTo(camera.position));

//set the distance between origin and the object to 1 or close to 1, for ex - 0.9999999999999999
// mesh.position.normalize();

//renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// console.log(gsap);
// gsap.to(mesh1.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh1.position, { duration: 1, delay: 2, x: 0 });

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//since the frame rate is different for different computers we need to normalise it
// let time = Date.now();
// const clock = new THREE.Clock();
//animation
(function tick() {
  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;
  //   mesh1.rotation.y += 0.002 * deltaTime;
  //   const elapsedTime = clock.getElapsedTime();
  //to get one full rotation
  //   mesh1.rotation.y = elapsedTime * Math.PI * 2;
  //   mesh1.rotation.y = elapsedTime;
  //   mesh1.position.x = Math.sin(elapsedTime);
  //   mesh1.position.y = Math.cos(elapsedTime);
  //   camera.position.x = mouse.x * 10;
  //   camera.position.y = mouse.y * 10;

  //to see back of the camera
  //   camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(mouse.x * Math.PI * 2) * 3;
  //when camera is rotating and we use lookat it does not cause any difference when there is only on object
  camera.lookAt(mesh1.position);

  //update controls
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
})();
