import * as THREE from "three"
import Experience from "./Experience";
import Sphere from "./Sphere";

export default class World{
    constructor(_options){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // this.resources.on("groupEnd", (_group) => {
        //     if(_group.name === 'base') this.setSphere();
        // })

        this.setSphere();
    }

    setSphere(){
        this.sphere = new Sphere();
    }

    update(){
        if(this.sphere) this.sphere.update();
    }
}