import Experience from "../Experience.js";
import Environment from "./Environment.js";
import WaterSurface from "./WaterSurface.js";
import Submarine from "./Submarine.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    /* Waiting for resources to load */
    this.resources.on("ready", () => {
      /* Setup */
      this.waterSurface = new WaterSurface();
      this.submarine = new Submarine();
      this.environment = new Environment();
    });
  }
}
