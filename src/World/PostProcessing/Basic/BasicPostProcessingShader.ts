import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import basicFragment from "./basicFragment.glsl";
import basicVertex from "./basicVertex.glsl";

export function makeBasicShaderPass() {
  return new ShaderPass(
    {
      fragmentShader: basicFragment,
      vertexShader: basicVertex,
      name: "BasicShader",
      uniforms: {
        uTime: { value: 0.0 },
      },
    },
    "tDiffuse"
  );
}
