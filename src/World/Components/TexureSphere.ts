import * as THREE from "three";
import { Updateable } from "../System/Loop";

class TextureSphere extends THREE.Mesh implements Updateable {
  mat: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
    shininess: 600,
  });
  constructor() {
    const loader = new THREE.TextureLoader();
    loader.load("paint.jpg", (texture) => {
      this.mat.map = texture;
      this.material = this.mat;
    });
    super(new THREE.SphereGeometry(3));
    this.castShadow = true;
  }

  update() {
    this.rotateY(0.01);
  }
}

export { TextureSphere };
