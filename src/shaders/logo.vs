varying vec2 vUv;
uniform vec3 center;

void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position + center, 1.0);

    gl_Position = projectionMatrix * mvPosition;
}
