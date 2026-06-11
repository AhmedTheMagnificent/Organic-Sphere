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
        this.geometry.computeVertexNormals();
        this.geometry.computeTangents();
        // this.computeTangents();
    }

    computeTangents() {
        const geometry = this.geometry;
        const positions = geometry.getAttribute('position');
        const normals = geometry.getAttribute('normal');
        const indices = geometry.getIndex();

        const tangents = new Float32Array(positions.count * 4);

        const tan1 = [], tan2 = [];
        for (let i = 0; i < positions.count; i++) {
            tan1[i] = new THREE.Vector3();
            tan2[i] = new THREE.Vector3();
        }

        const v1 = new THREE.Vector3(), v2 = new THREE.Vector3(), v3 = new THREE.Vector3();
        const w1 = new THREE.Vector2(), w2 = new THREE.Vector2(), w3 = new THREE.Vector2();
        const sdir = new THREE.Vector3(), tdir = new THREE.Vector3();

        if (indices) {
            const indexArray = indices.array;
            for (let i = 0; i < indexArray.length; i += 3) {
                const i1 = indexArray[i];
                const i2 = indexArray[i + 1];
                const i3 = indexArray[i + 2];

                v1.fromBufferAttribute(positions, i1);
                v2.fromBufferAttribute(positions, i2);
                v3.fromBufferAttribute(positions, i3);

                w1.set(0, 0);
                w2.set(1, 0);
                w3.set(1, 1);

                const x1 = v2.x - v1.x, x2 = v3.x - v1.x;
                const y1 = v2.y - v1.y, y2 = v3.y - v1.y;
                const z1 = v2.z - v1.z, z2 = v3.z - v1.z;

                const s1 = w2.x - w1.x, s2 = w3.x - w1.x;
                const t1 = w2.y - w1.y, t2 = w3.y - w1.y;

                const r = 1.0 / (s1 * t2 - s2 * t1);

                sdir.set((t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
                tdir.set((s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);

                tan1[i1].add(sdir);
                tan1[i2].add(sdir);
                tan1[i3].add(sdir);

                tan2[i1].add(tdir);
                tan2[i2].add(tdir);
                tan2[i3].add(tdir);
            }
        }

        const n = new THREE.Vector3(), t = new THREE.Vector3();

        for (let i = 0; i < positions.count; i++) {
            n.fromBufferAttribute(normals, i);
            t.copy(tan1[i]);

            const nDotT = n.dot(t);
            t.sub(n.clone().multiplyScalar(nDotT)).normalize();

            tangents[i * 4] = t.x;
            tangents[i * 4 + 1] = t.y;
            tangents[i * 4 + 2] = t.z;
            tangents[i * 4 + 3] = n.cross(tan1[i]).dot(tan2[i]) < 0.0 ? -1.0 : 1.0;
        }

        geometry.setAttribute('tangent', new THREE.BufferAttribute(tangents, 4));
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uLightAColor: { value: new THREE.Color('#ff3e00') },
                uLightAPosition: { value: new THREE.Vector3(2.0, 2.0, 1.0) },   // upper-right
                uLightAIntensity: { value: 1.0 },
                uLightBColor: { value: new THREE.Color('#0063ff') },
                uLightBPosition: { value: new THREE.Vector3(-2.0, -2.0, -1.0) }, // lower-left
                uLightBIntensity: { value: 1.0 },
                uTime: { value: 0.0 },
                uDisplacementFrequency: { value: 2.0 },
                uDisplacementStrength: { value: 0.152 },
                uDistortionFrequency: { value: 2.0 },
                uDistortionStrength: { value: 0.65 },
                timeFrequency: { value: 0.0005 },
                uSubdivision: { value: new THREE.Vector2(this.geometry.parameters.widthSegments, this.geometry.parameters.heightSegments) },
                uFresnelOffset: { value: -1.609 },
                uFresnelMultiplier: { value: 3.587 },
                uFresnelPower: { value: 1.793 },
            },
            defines:
            {
                USE_TANGENT: ''
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide
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