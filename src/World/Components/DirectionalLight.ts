import * as THREE from "three";

class DirectionalLight extends THREE.DirectionalLight {
  constructor(color: THREE.Color, intensity: number) {
    super(color.getHex(), intensity);
    this.castShadow = true;
    this.shadow.mapSize.width = 4096;
    this.shadow.mapSize.height = 4096;
    this.shadow.camera.near = 0.0;
    this.shadow.camera.far = 200;
    this.shadow.camera.left = -10;
    this.shadow.camera.right = 10;
    this.shadow.camera.top = 10;
    this.shadow.camera.bottom = -10;
    this.shadow.bias = -0.0004;
    this.shadow.radius = 10;
  }
}

export { DirectionalLight };
