import * as THREE from "three";
import World from "./World";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Time from "./Utils/Time";

export default class Experience{
    static instance;
    constructor(_options = {}){
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = document.querySelector("canvas.webgl");
        this.setScene();
        this.setCamera();
        this.setRenderer();
        this.setControls();

        this.world = new World();
        this.setLoop();
        this.time = new Time();
    }

    setScene(){
        this.scene = new THREE.Scene();
    }

    setCamera(){
        this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.scene.add(this.camera);
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // ✅ Key for sharpness on high-DPI screens

    }

    setControls(){
        this.controls = new OrbitControls(this.camera, this.canvas);
    }

    setLoop(){
        const tick = () => {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            // this.world.sphere.mesh.rotation.x += 0.01
            // this.world.sphere.mesh.rotation.y += 0.01
            // this.world.sphere.mesh.rotation.z += 0.01
            requestAnimationFrame(tick);
        }
        tick();
    }
}