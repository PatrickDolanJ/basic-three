import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import basicVertShader from "./basicVertex.glsl";
import basicFragShader from "./basicFragment.glsl";

export class UpdatableMeshPhongMaterial extends THREE.MeshPhongMaterial {
  uniforms = { uTime: { value: 0.0 } };
  constructor() {
    super();
  }
}

export function createBasicMat() {
  return new CustomShaderMaterial<typeof UpdatableMeshPhongMaterial>({
    baseMaterial: UpdatableMeshPhongMaterial,
    vertexShader: basicVertShader,
    fragmentShader: basicFragShader,
    uniforms: {
      uTime: { value: 0.0 },
    },
  });
}
