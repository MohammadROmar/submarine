import Experience from "../Experience.js";
import Audios from "./Audios.js";

export default class SubmarineAudios {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.audios = new Audios();

    this.submarineAudiosController = {
      play: () => {},
      pause: () => {},
      volume: undefined
    };

    if (this.debug.active) {
      this.audiosFolder = this.audios.audiosFolder();
      this.submarineAudiosFolder = this.audiosFolder.addFolder("submarine");
    }
  }
}
