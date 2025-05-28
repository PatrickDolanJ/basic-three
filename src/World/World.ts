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
import { makeDirectionalLight } from "./Components/DirectionalLight";

//----------------------Settings---------------------

export class World {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: Renderer;
  loop: Loop;
  orbitController: OrbitController;
  resizer: Resizer;

  constructor(container: HTMLElement) {
    //Setup core
    this.scene = new BasicScene();
    this.camera = new BasicCamera(container);
    this.renderer = new Renderer(container, this.scene, this.camera);

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.orbitController = new OrbitController(this.camera, container);
    this.resizer = new Resizer(container, this.camera, this.renderer);

    const starterCube = this.setupStarterCube();
    this.loop.addUpdateable(starterCube);
    this.scene.add(starterCube);

    const duck = this.setupDuck();
    this.scene.add(duck);

    const sphere = this.setupSphere();
    this.loop.addUpdateable(sphere);
    this.scene.add(sphere);

    const ambientLight = this.setupAmbientLight();
    this.scene.add(ambientLight);

    const dl = this.setupDirectionalLight();
    this.scene.add(dl);

    //Helpers
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    this.scene.add(dlHelper);

    //Ground Plane
    const groundPlane = this.setupGroundPlane();
    this.scene.add(groundPlane);
  }

  private setupStarterCube() {
    const starterCube = new StarterCube(5, 5, 5, 10, 10, 10);
    starterCube.position.set(0, 0, 0);
    starterCube.castShadow = true;
    starterCube.receiveShadow = true;
    return starterCube;
  }

  private setupDuck() {
    const duck = new Duck();
    this.loop.addUpdateable(duck);
    duck.position.set(7, 0, -7);
    return duck;
  }

  private setupSphere() {
    const sphere = new TextureSphere();
    sphere.position.set(-7, 0, 7);
    return sphere;
  }

  private setupDirectionalLight(): THREE.DirectionalLight {
    const dl = makeDirectionalLight();
    dl.position.set(0, 10, 0);
    return dl;
  }

  private setupAmbientLight() {
    return new THREE.AmbientLight(new THREE.Color().setHex(0xffccaa), 3.0);
  }

  private setupGroundPlane() {
    const groundPlane = new THREE.Mesh(
      new THREE.BoxGeometry(20, 0.2, 20),
      new THREE.MeshPhongMaterial()
    );
    groundPlane.position.set(0, -5, 0);
    groundPlane.receiveShadow = true;
    return groundPlane;
  }

  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}
