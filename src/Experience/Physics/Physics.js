import * as THREE from "three";
import { constants } from "./constants";

export default class Physics {
  constructor() {}
  weightForce() {
    this.weight = constants.mass * constants.G;

    return new THREE.Vector3(0, this.weight, 0);
  }
  buoyancyForce() {
    this.buoyancy = constants.Ro * constants.G * constants.V;
    return new THREE.Vector3(0, this.buoyancy, 0);
  }
  thrustForce(Ro, n, pitch, D4) {
    this.thrust = Ro * n * pitch * D4;
    return new THREE.Vector3(this.thrust, 0, 0);
  }
  dragForce(Cd, Ro, velocity, A) {
    this.drag = 0.5 * Cd * Ro * velocity * velocity * A;
    return new THREE.Vector3(this.drag, 0, 0);
  }
}
