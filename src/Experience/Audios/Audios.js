import Experience from "../Experience.js";
import SubmarineAudios from "./Submarine.js";
import EnvironmentAudios from "./Environment.js";

let instance = null;

export default class Audios {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.experience = new Experience();
    this.debug = this.experience.debug;

    this.submarineAudios = new SubmarineAudios();
    this.environmentAudios = new EnvironmentAudios();

    this.audiosFolder();
  }

  audiosFolder() {
    if (this.debug.active) {
      if (!this.audioFolder) {
        this.audioFolder = this.debug.ui.addFolder("Audios");
      }

      return this.audioFolder;
    }
  }
}
