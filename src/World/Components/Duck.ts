import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { Updateable } from "../System/types";

export class Duck extends THREE.Group implements Updateable {
  constructor() {
    super();
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    mtlLoader.load("/duck.mtl", (mtl) => {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load("/duck.obj", (root) => {
        root.children.forEach((item) => {
          const box = new THREE.Box3().setFromObject(item);
          const dim = new THREE.Vector3();
          box.getSize(dim);
          item.position.set(
            item.position.x,
            item.position.y - dim.y / 2,
            item.position.z
          );
          item.castShadow = true;
          item.rotateX(THREE.MathUtils.degToRad(-90));
          this.add(item);
        });
      });
    });
    this.scale.set(0.11, 0.11, 0.11);
  }
  update() {
    this.position.y = Math.sin(performance.now() / 250);
    this.rotation.y =
      Math.sin(THREE.MathUtils.degToRad(performance.now() / 10)) + Math.PI / 4;
  }
}
