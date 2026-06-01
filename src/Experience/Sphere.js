import * as THREE from "three";
import Experience from "./Experience";
import vertexShader from "./shaders/sphere/vertex.glsl?raw";
import fragmentShader from "./shaders/sphere/fragment.glsl?raw";
import Debug from "./Utils/Debug";

export default class Sphere {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.setGeometry();
        this.setMaterial();
        this.setMesh();
        this.debug = true;

        if (this.debug) {
            this.debugger = new Debug(this.material);
        }
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(1, 512, 512);
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime                   : { value: 0.0 },
                uDisplacementFrequency  : { value: 2.0 },
                uDisplacementStrength   : { value: 0.3 },
                uDistortionFrequency    : { value: 2.0 },
                uDistortionStrength     : { value: 1.0 },
                timeFrequency           : { value: 0.001 }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    update() {
        this.material.uniforms.uTime.value += this.time.delta * this.material.uniforms.timeFrequency.value;
    }

}