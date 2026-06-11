import { Pane } from "tweakpane";

export default class Debug {
    constructor(material, experience) {
        this.pane = new Pane();
        const u = material.uniforms;

        const sphere = this.pane.addFolder({ title: 'Sphere' });

        sphere.addBinding(u.uDisplacementFrequency, 'value', { label: 'Displacement Freq', min: 0, max: 10.0, step: 0.001 });
        sphere.addBinding(u.uDisplacementStrength, 'value', { label: 'Displacement Str', min: 0.0, max: 10.0, step: 0.05 });
        sphere.addBinding(u.uDistortionFrequency, 'value', { label: 'Distortion Freq', min: 0, max: 10, step: 0.001 });
        sphere.addBinding(u.uDistortionStrength, 'value', { label: 'Distortion Str', min: 0.0, max: 10.0, step: 0.001 });
        sphere.addBinding(u.timeFrequency, 'value', { label: 'Time Frequency', min: 0.0, max: 0.1, step: 0.000001 });
        sphere.addBinding(u.uFresnelOffset, 'value', { label: 'Fresnel Offset', min: -5.0, max: 5.0, step: 0.001 });
        sphere.addBinding(u.uFresnelMultiplier, 'value', { label: 'Fresnel Multiplier', min: 0.0, max: 10.0, step: 0.001 });
        sphere.addBinding(u.uFresnelPower, 'value', { label: 'Fresnel Power', min: 0.1, max: 10.0, step: 0.001 });

        // Bloom
        if (experience && experience.bloomPass) {
            const bloomFolder = sphere.addFolder({ title: 'Bloom & Rendering' });
            bloomFolder.addBinding(experience.bloomPass, 'strength', { label: 'Bloom Strength', min: 0, max: 3, step: 0.01 });
            bloomFolder.addBinding(experience.bloomPass, 'radius', { label: 'Bloom Radius', min: 0, max: 2, step: 0.01 });
            bloomFolder.addBinding(experience.bloomPass, 'threshold', { label: 'Bloom Threshold', min: 0, max: 1, step: 0.01 });
            bloomFolder.addBinding(experience.renderer, 'toneMappingExposure', { label: 'Exposure', min: 0, max: 5, step: 0.01 });
        }

        // Light A
        const lightAFolder = sphere.addFolder({ title: 'Light A' });

        const lightAColorObj = { color: '#ff3e00' };
        lightAFolder.addBinding(lightAColorObj, 'color', { label: 'Color' }).on('change', (ev) => {
            u.uLightAColor.value.setStyle(ev.value);
        });
        lightAFolder.addBinding(u.uLightAIntensity, 'value', { label: 'Intensity', min: 0.0, max: 5.0, step: 0.1 });

        const lightASphericalObj = { radius: 3.0, theta: 0.9, phi: 0.5 };
        const lightASphericalFolder = lightAFolder.addFolder({ title: 'Position (Spherical)' });

        const updateLightAPosition = () => {
            const { radius: r, theta, phi } = lightASphericalObj;
            u.uLightAPosition.value.x = r * Math.sin(theta) * Math.cos(phi);
            u.uLightAPosition.value.y = r * Math.cos(theta);
            u.uLightAPosition.value.z = r * Math.sin(theta) * Math.sin(phi);
        };

        lightASphericalFolder.addBinding(lightASphericalObj, 'radius', { label: 'Radius', min: 0.1, max: 10.0, step: 0.1 }).on('change', updateLightAPosition);
        lightASphericalFolder.addBinding(lightASphericalObj, 'theta', { label: 'Theta (π)', min: 0, max: Math.PI, step: 0.01 }).on('change', updateLightAPosition);
        lightASphericalFolder.addBinding(lightASphericalObj, 'phi', { label: 'Phi', min: 0, max: Math.PI * 2, step: 0.01 }).on('change', updateLightAPosition);
        updateLightAPosition();

        // Light B
        const lightBFolder = sphere.addFolder({ title: 'Light B' });

        const lightBColorObj = { color: '#0063ff' };
        lightBFolder.addBinding(lightBColorObj, 'color', { label: 'Color' }).on('change', (ev) => {
            u.uLightBColor.value.setStyle(ev.value);
        });
        lightBFolder.addBinding(u.uLightBIntensity, 'value', { label: 'Intensity', min: 0.0, max: 5.0, step: 0.1 });

        const lightBSphericalObj = { radius: 3.0, theta: 2.2, phi: 3.8 };
        const lightBSphericalFolder = lightBFolder.addFolder({ title: 'Position (Spherical)' });

        const updateLightBPosition = () => {
            const { radius: r, theta, phi } = lightBSphericalObj;
            u.uLightBPosition.value.x = r * Math.sin(theta) * Math.cos(phi);
            u.uLightBPosition.value.y = r * Math.cos(theta);
            u.uLightBPosition.value.z = r * Math.sin(theta) * Math.sin(phi);
        };

        lightBSphericalFolder.addBinding(lightBSphericalObj, 'radius', { label: 'Radius', min: 0.1, max: 10.0, step: 0.1 }).on('change', updateLightBPosition);
        lightBSphericalFolder.addBinding(lightBSphericalObj, 'theta', { label: 'Theta (π)', min: 0, max: Math.PI, step: 0.01 }).on('change', updateLightBPosition);
        lightBSphericalFolder.addBinding(lightBSphericalObj, 'phi', { label: 'Phi', min: 0, max: Math.PI * 2, step: 0.01 }).on('change', updateLightBPosition);
        updateLightBPosition();
    }
}