import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import * as dat from "dat.gui";
import { environmentMap } from "./skybox.js";

import { water1, water2, water3 } from "./textures.js";

function updateMaterials() {
  scene.traverse(child => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.metalness = 0.9;
      child.material.envMapIntensity = 5;
      child.receiveShadow = true;
      child.castShadow = true;
      gui.add(child.material, "roughness").min(0).max(10).step(0.0001);
      gui.add(child.material, "metalness").min(0).max(10).step(0.0001);
    }
  });
}

const seaAndSeagullAudio = new Audio("./src/static/sounds/sea_and_seagull.mp3");
seaAndSeagullAudio.volume = 0.2;

const submarineSonarAudio = new Audio(
  "./src/static/sounds/submarine_sonar.mp3"
);
submarineSonarAudio.volume = 0.2;

const audioController = {
  play: () => {
    seaAndSeagullAudio.play();
    submarineSonarAudio.play();
  },
  pause: () => {
    seaAndSeagullAudio.pause();
    submarineSonarAudio.pause();
  },
  seaAndSeagullAudioVolume: seaAndSeagullAudio.volume,
  submarineSonarAudioVolume: submarineSonarAudio.volume
};

const mouse = new THREE.Vector2();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
scene.background = environmentMap;
scene.environment = environmentMap;
//scene.fog = new THREE.Fog("#7c7c7c", 3, 15);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    metalness: 0.9,
    roughness: 0,
    map: water3
  })
);
plane.rotation.x = -Math.PI / 2;
plane.castShadow = true;
plane.receiveShadow = true;

scene.add(plane);

const gltfLoader = new GLTFLoader();
gltfLoader.load("./src/static/models/ohio-class_submarine_ssbn.glb", gltf => {
  gltf.scene.children[0].scale.set(0.1, 0.1, 0.1);
  //gltf.scene.children[0].rotation.z = 90;
  scene.add(gltf.scene);

  updateMaterials();
});

const ambientLight = new THREE.AmbientLight("#ffffff", 1);

const directionalLight = new THREE.DirectionalLight("#ffffff", 5);
directionalLight.position.set(1, 3, 1);
directionalLight.castShadow = true;
//directionalLight.shadow.normalBias = 0.05;

directionalLight.shadow.mapSize.set(1024, 1024);

directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;

// const directionalLightHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(directionalLightHelper);

scene.add(ambientLight, directionalLight);

const gui = new dat.GUI({ closed: true });

const audioGUIController = gui.addFolder("Sounds");
audioGUIController.add(audioController, "play").name("Play Sound");
audioGUIController.add(audioController, "pause").name("Pause Sound");
audioGUIController
  .add(audioController, "seaAndSeagullAudioVolume")
  .min(0)
  .max(1)
  .name("Sea sound");
audioGUIController
  .add(audioController, "submarineSonarAudioVolume")
  .min(0)
  .max(1)
  .name("Submarine sound");

const sceneGUI = gui.addFolder("Scene");
sceneGUI
  .add(ambientLight, "intensity")
  .min(0)
  .max(10)
  .step(0.001)
  .name("ambientLight");
sceneGUI
  .add(directionalLight, "intensity")
  .min(0)
  .max(100)
  .step(0.001)
  .name("directionalLight");

sceneGUI
  .add(directionalLight.position, "x")
  .min(0)
  .max(5)
  .step(0.001)
  .name("x");
sceneGUI
  .add(directionalLight.position, "y")
  .min(0)
  .max(5)
  .step(0.001)
  .name("y");
sceneGUI
  .add(directionalLight.position, "z")
  .min(0)
  .max(5)
  .step(0.001)
  .name("z");

// Camera //
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  325
);
camera.position.set(0, 5, 15);
camera.lookAt(scene.children[0]);
scene.add(camera);

// Controls //
const controls = new OrbitControls(camera, canvas);
controls.maxDistance = 60;
controls.enableDamping = true;

// Renderer //
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;
/*
///////////////////////////////
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  1.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2;
bloomPass.radius = 0;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(sizes.width, sizes.height);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const sun = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 15),
  new THREE.MeshBasicMaterial({ color: "#fdb813" })
);
sun.position.set(0, 0, 0);
sun.layers.set(1);

scene.add(sun);
*/
const clock = new THREE.Clock();

// Animation loop //
function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("mousemove", event => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -((event.clientY / sizes.height) * 2 - 1);
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

seaAndSeagullAudio.addEventListener("ended", () => {
  seaAndSeagullAudio.play();
});

submarineSonarAudio.addEventListener("ended", () => {
  submarineSonarAudio.play();
});
