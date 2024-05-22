import Experience from "../Experience.js";
import Audios from "./Audios.js";

export default class SubmarineAudios {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.audios = new Audios();

    this.volume = 1;
    this.submarineAudios = [];
    this.submarineAudios.push(
      new Audio("src/static/sounds/submarine-sonar.mp3")
    );

    this.submarineAudiosController = {
      play: () => {
        this.submarineAudios.map((audio) => audio.play());
      },
      pause: () => {
        this.submarineAudios.map((audio) => audio.pause());
      },
      volume: this.volume,
    };

    /* Debug */
    if (this.debug.active) {
      this.audiosFolder = this.audios.audiosFolder();
      this.submarineAudiosFolder = this.audiosFolder.addFolder("submarine");
      this.submarineAudiosFolder.add(this.submarineAudiosController, "play");
      this.submarineAudiosFolder.add(this.submarineAudiosController, "pause");
      this.submarineAudiosFolder
        .add(this.submarineAudiosController, "volume")
        .min(0.0)
        .max(1.0)
        .step(0.1)
        .onChange((newVolume) =>
          this.submarineAudios.map((audio) => (audio.volume = newVolume))
        );
    }
  }
}
