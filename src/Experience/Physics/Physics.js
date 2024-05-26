import * as THREE from "three";
export const constants = {
    G: 9.8, 
};

export default class Physics {
 
constructor(){
  
    
}
weightForce(mass){
    this.weight=    mass*constants.G;
    return THREE.Vector3(0,this.weight,0) ; 
}
buoyancyForce(Ro,mass,V){
   this.buoyancy= Ro*constants.G*V
   return THREE.Vector3(0,this.buoyancy,0);
}
thrustForce()
{

}
dragForce(Cd,Ro,velocity,A){
    this.drag= 0.5*Cd*Ro*velocity*velocity*A;
    return  THREE.Vector3(this.drag,0,0);
}

}