import * as THREE from "three";

import { BasicCamera } from "./System/PerspectiveCamera";
import { Renderer } from "./System/Renderer";
import { BasicScene } from "./System/Scene";
import { Loop } from "./System/Loop";
import { OrbitController } from "./System/OrbitController";
import { Resizer } from "./System/Resizer";
import { StarterCube } from "./Components/StarterCube";
import { Duck } from "./Components/Duck";
import { TextureSphere } from "./Components/TexureSphere";
import { DirectionalLight } from "./Components/DirectionalLight";

//----------------------Settings---------------------

class World {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: Renderer;
  loop: Loop;
  orbitController?: OrbitController;
  resizer: Resizer;

  constructor(container: HTMLElement) {
    //Setup core
    this.scene = new BasicScene();
    this.camera = new BasicCamera(container);
    this.renderer = new Renderer(container, this.scene, this.camera);

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.orbitController = new OrbitController(this.camera, container);
    this.resizer = new Resizer(container, this.camera, this.renderer);

    //Basic Mesh with custom shader
    const starterCube = new StarterCube(5, 5, 5, 10, 10, 10);
    starterCube.position.set(0, 0, 0);
    starterCube.castShadow = true;
    starterCube.receiveShadow = true;
    this.loop.addUpdateable(starterCube);
    this.scene.add(starterCube);

    //Custom Mesh
    const duck = new Duck();
    this.loop.addUpdateable(duck);
    duck.position.set(7, 0, -7);
    this.scene.add(duck);

    //Textured Sphere
    const sphere = new TextureSphere();
    sphere.position.set(-7, 0, 7);
    this.loop.addUpdateable(sphere);
    this.scene.add(sphere);

    //Lights
    const ambientLight = new THREE.AmbientLight(
      new THREE.Color().setHex(0xffccaa),
      0.5
    );
    const dl = new DirectionalLight(new THREE.Color().setHex(0xffccaa), 3.0);
    dl.position.set(0, 10, 0);

    this.scene.add(ambientLight);
    this.scene.add(dl);

    //Helpers
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    this.scene.add(dlHelper);

    //Ground Plane
    const groundPlane = new THREE.Mesh(
      new THREE.BoxGeometry(20, 0.2, 20),
      new THREE.MeshPhongMaterial()
    );
    groundPlane.position.set(0, -5, 0);
    groundPlane.receiveShadow = true;
    this.scene.add(groundPlane);
  }

  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}
export { World };
