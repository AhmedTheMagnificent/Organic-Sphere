varying vec3 vNormal;
varying float vPerlinStrength;

void main(){
    float temp = vPerlinStrength + 0.0;
    temp *= 1.5;
    gl_FragColor = vec4(temp, temp, temp, 1.0);
}