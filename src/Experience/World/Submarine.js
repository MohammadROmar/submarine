import * as THREE from "three";

import Experience from "../Experience.js";

export default class Submarine {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    /* Debug */
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("submarine");
    }

    /* Setup */
    this.resources = this.resources.items.submarineModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resources.scene;
    this.model.scale.set(0.1, 0.1, 0.1);
    this.scene.add(this.model);

    this.model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }
}
