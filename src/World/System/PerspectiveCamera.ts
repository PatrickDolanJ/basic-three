import * as THREE from "three";
export class BasicCamera extends THREE.PerspectiveCamera {
  constructor(container: HTMLElement) {
    const fov = 35; // Field of View
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1; // near clipping plane
    const far = 1000; // far clipping plane

    super(fov, aspect, near, far);

    // move the camera back so we can view the scene
    this.position.set(40, 30, 40);
  }
}
