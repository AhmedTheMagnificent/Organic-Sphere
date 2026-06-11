import { Pane } from "tweakpane";

export default class Debug {
    constructor(material) {
        this.pane = new Pane();
        const u = material.uniforms;

        const folder = this.pane.addFolder({ title: 'Sphere' });

        folder.addBinding(u.uDisplacementFrequency, 'value', { label: 'Displacement Freq', min: 0, max: 10.0, step: 0.001 });
        folder.addBinding(u.uDisplacementStrength, 'value', { label: 'Displacement Str', min: 0.0, max: 10.0, step: 0.05 });
        folder.addBinding(u.uDistortionFrequency, 'value', { label: 'Distortion Freq', min: 0, max: 10, step: 0.001 });
        folder.addBinding(u.uDistortionStrength, 'value', { label: 'Distortion Str', min: 0.0, max: 10.0, step: 0.001 });
        folder.addBinding(u.timeFrequency, 'value', { label: 'Time Frequency', min: 0.0, max: 0.1, step: 0.000001 });
        folder.addBinding(u.uFresnelOffset, 'value', {
            label: 'Fresnel Offset',
            min: -5.0,
            max: 5.0,
            step: 0.001
        });

        folder.addBinding(u.uFresnelMultiplier, 'value', {
            label: 'Fresnel Multiplier',
            min: 0.0,
            max: 10.0,
            step: 0.001
        });

        folder.addBinding(u.uFresnelPower, 'value', {
            label: 'Fresnel Power',
            min: 0.1,
            max: 10.0,
            step: 0.001
        });

        // Light A folder
        const lightAFolder = this.pane.addFolder({ title: 'Light A' });

        // Create intermediate color object for Light A
        const lightAColorObj = { color: '#ff3e00' };
        const lightAColorBinding = lightAFolder.addBinding(lightAColorObj, 'color', { label: 'Color' });
        lightAColorBinding.on('change', (ev) => {
            u.uLightAColor.value.setStyle(ev.value);
        });

        lightAFolder.addBinding(u.uLightAIntensity, 'value', { label: 'Intensity', min: 0.0, max: 5.0, step: 0.1 });

        // Spherical coordinates for Light A
        const lightASphericalObj = { radius: 3.0, theta: 0.9, phi: 0.5 };
        const lightASphericalFolder = lightAFolder.addFolder({ title: 'Position (Spherical)' });

        // Update Light A position when spherical coordinates change
        const updateLightAPosition = () => {
            const r = lightASphericalObj.radius;
            const theta = lightASphericalObj.theta;
            const phi = lightASphericalObj.phi;
            u.uLightAPosition.value.x = r * Math.sin(theta) * Math.cos(phi);
            u.uLightAPosition.value.y = r * Math.cos(theta);
            u.uLightAPosition.value.z = r * Math.sin(theta) * Math.sin(phi);
        };

        lightASphericalFolder.addBinding(lightASphericalObj, 'radius', { label: 'Radius', min: 0.1, max: 10.0, step: 0.1 }).on('change', updateLightAPosition);
        lightASphericalFolder.addBinding(lightASphericalObj, 'theta', { label: 'Theta (π)', min: 0, max: Math.PI, step: 0.01 }).on('change', updateLightAPosition);
        lightASphericalFolder.addBinding(lightASphericalObj, 'phi', { label: 'Phi', min: 0, max: Math.PI * 2, step: 0.01 }).on('change', updateLightAPosition);

        updateLightAPosition(); // Initialize position

        // Light B folder
        const lightBFolder = this.pane.addFolder({ title: 'Light B' });

        // Create intermediate color object for Light B
        const lightBColorObj = { color: '#0063ff' };
        const lightBColorBinding = lightBFolder.addBinding(lightBColorObj, 'color', { label: 'Color' });
        lightBColorBinding.on('change', (ev) => {
            u.uLightBColor.value.setStyle(ev.value);
        });

        lightBFolder.addBinding(u.uLightBIntensity, 'value', { label: 'Intensity', min: 0.0, max: 5.0, step: 0.1 });

        // Spherical coordinates for Light B
        const lightBSphericalObj = { radius: 3.0, theta: 2.2, phi: 3.8 };

        const lightBSphericalFolder = lightBFolder.addFolder({ title: 'Position (Spherical)' });

        // Update Light B position when spherical coordinates change
        const updateLightBPosition = () => {
            const r = lightBSphericalObj.radius;
            const theta = lightBSphericalObj.theta;
            const phi = lightBSphericalObj.phi;
            u.uLightBPosition.value.x = r * Math.sin(theta) * Math.cos(phi);
            u.uLightBPosition.value.y = r * Math.cos(theta);
            u.uLightBPosition.value.z = r * Math.sin(theta) * Math.sin(phi);
        };

        lightBSphericalFolder.addBinding(lightBSphericalObj, 'radius', { label: 'Radius', min: 0.1, max: 10.0, step: 0.1 }).on('change', updateLightBPosition);
        lightBSphericalFolder.addBinding(lightBSphericalObj, 'theta', { label: 'Theta (π)', min: 0, max: Math.PI, step: 0.01 }).on('change', updateLightBPosition);
        lightBSphericalFolder.addBinding(lightBSphericalObj, 'phi', { label: 'Phi', min: 0, max: Math.PI * 2, step: 0.01 }).on('change', updateLightBPosition);

        updateLightBPosition(); // Initialize position
    }
}