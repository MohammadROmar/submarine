import * as THREE from "three";

import Experience from "../Experience.js";

import Time from "../Utils/Time.js";
import Physics from "../Physics/Physics.js";
import { constants } from "../Physics/constants.js";
import { abs } from "three/examples/jsm/nodes/Nodes.js";

export default class Submarine {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.physics = new Physics();
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
    // this.model.position.set(0,-10,0)
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
        .add(constants, "Diving")
        .onChange((value) => {
          if(value)
          { 
            constants.Diving = value;
        }
         else 
         {
          constants.Diving = false
         }
        });
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
        this.debugFolder
        .add(constants, "mass")
        .min(10)
        .max(constants.mass)
        .step(10).onChange((value) => {
          constants.mass = value;
        });
      this.debugFolder
        .add(constants, "V")
        .min(10)
        .max(constants.V)
        .step(10).onChange((value) => {
          
          constants.V = value;
        });
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
  state() {
    var result = this.physics.weightForce().y - this.physics.buoyancyForce().y;
   result=constants.mass/2;
    var acceleration=result/constants.mass;
    acceleration=0.0005;
    var speed1=constants.speed
    speed1+=acceleration;
    console.log(result)
   console.log(speed1);
    //console.log(result);
    if (result > 0) {
    this.model.position.y-=speed1
    console.log(this.model.position.y)
    } else if (result < 0  ) {  
      this.model.position.y+=speed1
      // if(this.model.position.y)
      // console.log(this.model.position.y )
    } else {
      this.model.position.y = 0;
    }
  }
  update() {
    if(constants.Diving){
      // if(mass < 1500000)
      // constants.mass += 100000 
      // if(V< 20000){
      //   constants.V +=1000
      // }
      this.state();
    }
    
  }
}
