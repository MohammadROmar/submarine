import * as THREE from "three";

import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    /* Debug */
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.left = -10;
    this.sunLight.shadow.camera.right = 10;
    this.sunLight.shadow.camera.top = 10;
    this.sunLight.shadow.camera.bottom = -10;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 25;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-5, 2, -1);

    this.sunLightHelper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    this.sunLightHelper.visible = false;

    this.scene.add(this.sunLight, this.sunLightHelper);

    /* Debug */
    if (this.debug.active) {
      this.sunLightFolder = this.debugFolder.addFolder("sun light");

      this.sunLightFolder
        .add(this.sunLight, "intensity")
        .min(0)
        .max(100)
        .step(0.001);
      this.sunLightFolder
        .add(this.sunLight.position, "x")
        .min(-10)
        .max(10)
        .step(0.001);
      this.sunLightFolder
        .add(this.sunLight.position, "y")
        .min(0)
        .max(10)
        .step(0.001);
      this.sunLightFolder
        .add(this.sunLight.position, "z")
        .min(-10)
        .max(10)
        .step(0.001);
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;
    this.scene.background = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse(child => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();

    /* Debug */
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .min(0)
        .max(5)
        .step(0.001)
        .name("envMapIntensity")
        .onChange(this.environmentMap.updateMaterials);
    }
  }

  setFog() {
    this.scene.fog = new THREE.Fog("#7c7c7c", 3, 15);
  }
}
