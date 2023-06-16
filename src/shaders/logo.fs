uniform sampler2D logo;
varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(logo, vUv);
}
