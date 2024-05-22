import * as THREE from "three";

import World from "./World/World.js";

import Audios from "./Audios/Audios.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import Debug from "./Utils/Debug.js";

import sources from "./sources.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    /* Global Access */
    window.experience = this;

    /* Options */
    this.canvas = canvas;

    /* Setup */
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.world = new World();

    this.audios = new Audios();

    /* Resize Event */
    this.sizes.on("resize", () => {
      this.resize();
    });

    /* Updating Time */
    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("update");

    /* Traverse the whole scene */
    this.scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.dispose();
    }
  }
}
