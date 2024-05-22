import Experience from "../Experience.js";
import Audios from "./Audios.js";

export default class environmentAudios {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.audios = new Audios();

    this.volume = 1;
    this.environmentAudios = [];
    this.environmentAudios.push(
      new Audio("src/static/sounds/sea-and-seagull.mp3")
    );

    this.environmentAudiosController = {
      play: () => {
        this.environmentAudios.map((audio) => audio.play());
      },
      pause: () => {
        this.environmentAudios.map((audio) => audio.pause());
      },
      volume: this.volume,
    };

    /* Debug */
    if (this.debug.active) {
      this.audiosFolder = this.audios.audiosFolder();
      this.environmentAudiosFolder = this.audiosFolder.addFolder("environment");
      this.environmentAudiosFolder.add(
        this.environmentAudiosController,
        "play"
      );
      this.environmentAudiosFolder.add(
        this.environmentAudiosController,
        "pause"
      );
      this.environmentAudiosFolder
        .add(this.environmentAudiosController, "volume")
        .min(0.0)
        .max(1.0)
        .step(0.1)
        .onChange((newVolume) =>
          this.environmentAudios.map((audio) => (audio.volume = newVolume))
        );
    }
  }
}
