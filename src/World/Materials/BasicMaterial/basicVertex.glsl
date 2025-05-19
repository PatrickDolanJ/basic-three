varying vec2 vUv;
uniform float uTime;
void main() {
    vUv = uv;
    csm_Position.y += sin(csm_Position.x + csm_Position.z + uTime * 1.5) * 0.4;
}
