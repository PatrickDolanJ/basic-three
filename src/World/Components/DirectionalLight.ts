import * as THREE from "three";

export function makeDirectionalLight() {
  const dl = new THREE.DirectionalLight(
    new THREE.Color().setHex(0xffccaa),
    0.5
  );
  dl.castShadow = true;
  dl.shadow.mapSize.width = 4096;
  dl.shadow.mapSize.height = 4096;
  dl.shadow.camera.near = 0.0;
  dl.shadow.camera.far = 200;
  dl.shadow.camera.left = -10;
  dl.shadow.camera.right = 10;
  dl.shadow.camera.top = 10;
  dl.shadow.camera.bottom = -10;
  dl.shadow.bias = -0.0004;
  dl.shadow.radius = 10;
  return dl;
}
