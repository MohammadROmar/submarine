import * as dat from "dat.gui";
import { constants } from "../Physics/constants";
export default class Debug {
  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new dat.GUI();
      // this.debugFolder= this.ui.addFolder('Physics')
      // this.constants= constants
      // this.experience = experience
      // if(this.experience.world){
      //   this.model= this.experience.world
      //   console.log(this.model)
      // }
       
      
      
    //  this.setDebug(this.constants)
    }
  }
  
  
  
}
