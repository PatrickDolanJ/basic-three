import * as THREE from "three";
import { Renderer } from "./Renderer";

export class Resizer {
  width: number = 0;
  height: number = 0;

  setSize = (
    container: HTMLElement,
    camera: THREE.PerspectiveCamera | THREE.Camera,
    renderer: Renderer
  ) => {
    if (camera instanceof THREE.PerspectiveCamera) {
      this.width = container.clientWidth;
      this.height = container.clientHeight;
      camera.aspect = this.width / this.height;
      camera.updateProjectionMatrix();
    }
    renderer.setSize(this.width, this.height);
    renderer.composer.setSize(this.width, this.height);
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  constructor(
    container: HTMLElement,
    camera: THREE.Camera,
    renderer: Renderer
  ) {
    this.setSize(container, camera, renderer);
    window.addEventListener("resize", () => {
      this.setSize(container, camera, renderer);
    });
  }
}
