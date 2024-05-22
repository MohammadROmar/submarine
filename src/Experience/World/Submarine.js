import * as THREE from "three";

import Experience from "../Experience.js";

import Time from "../Utils/Time.js";

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
    this.clock = new THREE.Clock();

    this.setModel();
    this.submarineMovements();
  }

  setModel() {
    this.model = this.resources.scene;
    this.model.scale.set(0.1, 0.1, 0.1);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    /* Debug */
    if (this.debug.active) {
      this.debugFolder
        .add(this.model.position, "x")
        .min(-10)
        .max(10)
        .step(0.01);
      this.debugFolder
        .add(this.model.position, "y")
        .min(-10)
        .max(10)
        .step(0.01);
      this.debugFolder
        .add(this.model.position, "z")
        .min(-10)
        .max(10)
        .step(0.01);
    }
  }

  submarineMovements() {
    document.addEventListener("keydown", (event) => {
      this.elapsedTime = this.clock.getElapsedTime();

      console.log(this.elapsedTime);

      if (event.key === "w" || event.key === "W") {
        this.model.position.z -= 0.1;
      } else if (event.key === "a" || event.key === "A") {
        this.model.rotation.y += 0.005;
        this.model.position.x -= 0.005;
      } else if (event.key === "s" || event.key === "S") {
        this.model.position.z += 0.1;
      } else if (event.key === "d" || event.key === "D") {
        this.model.rotation.y -= 0.005;
        this.model.position.x += 0.005;
      }
    });
  }
}
