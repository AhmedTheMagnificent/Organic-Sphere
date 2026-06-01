import { Pane } from "tweakpane";

export default class Debug {
    constructor(material) {
        this.pane = new Pane();
        const u = material.uniforms;

        const folder = this.pane.addFolder({ title: 'Sphere' });

        folder.addBinding(u.uDisplacementFrequency, 'value', { label: 'Displacement Freq', min: 0, max: 10.0, step: 0.001 });
        folder.addBinding(u.uDisplacementStrength,  'value', { label: 'Displacement Str',  min: 0.0, max: 10.0, step: 0.05 });
        folder.addBinding(u.uDistortionFrequency,   'value', { label: 'Distortion Freq',   min: 0, max: 10, step: 0.001 });
        folder.addBinding(u.uDistortionStrength,    'value', { label: 'Distortion Str',    min: 0.0, max: 10.0, step: 0.001 });
        folder.addBinding(u.timeFrequency,          'value', { label: 'Time Frequency',    min: 0.0, max: 0.1, step: 0.000001 });
    }
}