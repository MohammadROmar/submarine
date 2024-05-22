import * as THREE from "three";

import Experience from "../Experience.js";

export default class WaterSurface {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(20, 20);
  }

  setTexture() {
    this.textures = {};

    this.textures.color = this.resources.items.waterSurfaceTexture;
    this.textures.color.encoding = THREE.sRGBEncoding;
    // this.textures.color.repeat.set(1.5, 1.5);
    // this.textures.color.wrapS = THREE.RepeatWrapping;
    // this.textures.color.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      metalness: 0.9,
      roughness: 0.2,
      map: this.textures.color
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
