import * as THREE from "three";
import { clamp } from "three/src/math/MathUtils.js";
import { Renderer } from "./Renderer";
import {
  Clickable,
  Hoverable,
  HoverData,
  HoverEvent,
  HoverStorage,
  Updateable,
} from "./types";

function isHoverable(obj: unknown): obj is Hoverable {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "onHover" in obj &&
    typeof obj.onHover === "function"
  );
}

function isClickable(obj: unknown): obj is Clickable {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "onClick" in obj &&
    typeof obj.onClick === "function"
  );
}

function mapIntersection<T>(
  intersection: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>
) {
  const { object, ...rest } = intersection;
  return { object: object as T, data: rest };
}

export class Loop {
  private updatables: Updateable[] = [];
  private hoverStorage: HoverStorage[] = [];
  camera: THREE.Camera;
  renderer: Renderer;
  scene: THREE.Scene;
  maxInterval: number;
  fixedTimeInterval: number;
  isFixedTimeInterval: boolean;
  clock = new THREE.Clock();
  mouse = new THREE.Vector2(1, 1);
  hoverRaycaster: THREE.Raycaster = new THREE.Raycaster();
  clickRaycaster: THREE.Raycaster = new THREE.Raycaster();

  constructor(
    camera: THREE.PerspectiveCamera | THREE.Camera,
    scene: THREE.Scene,
    renderer: Renderer,
    maxInterval: number = 0.01,
    fixedTimeInterval: number = 0.01,
    isFixedTimeInterval: boolean = false
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.maxInterval = maxInterval;
    this.fixedTimeInterval = fixedTimeInterval;
    this.isFixedTimeInterval = isFixedTimeInterval;

    document.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });
    document.addEventListener("click", () => {
      this.onClick();
    });
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.update();
      this.renderer.renderPostProcess();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  addUpdateable(obj: Updateable) {
    this.updatables.push(obj);
  }

  removeUpdateable(obj: Updateable) {
    this.updatables = this.updatables.filter((item) => item.uuid != obj.uuid);
  }

  private update() {
    const clockDelta = this.clock.getDelta();
    let delta = clamp(clockDelta, 0, this.maxInterval);
    if (this.isFixedTimeInterval) {
      delta = this.fixedTimeInterval;
    }

    for (const object of this.updatables) {
      object.update(delta);
    }
    this.onHover();
  }

  private onMouseMove(event: MouseEvent) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onHover() {
    this.hoverRaycaster.setFromCamera(this.mouse, this.camera);

    const intersections = this.hoverRaycaster.intersectObjects(
      this.scene.children
    );
    if (intersections.length === 0 && this.hoverStorage.length === 0) {
      return;
    }

    this.processNewHover(intersections);
    this.processExitHovers(intersections);
  }

  private onClick() {
    this.clickRaycaster.setFromCamera(this.mouse, this.camera);
    const intersection = this.clickRaycaster.intersectObjects(
      this.scene.children
    );
    if (intersection.length == 0 || !isClickable(intersection[0]?.object)) {
      return;
    } else {
      const clickable = mapIntersection<Clickable>(intersection[0]);
      clickable.object.onClick(clickable.data);
    }
  }

  private processNewHover(intersections: THREE.Intersection[]) {
    if (intersections.length > 0 && isHoverable(intersections[0].object)) {
      const curHover = mapIntersection<Hoverable>(intersections[0]);
      let event: HoverEvent = HoverEvent.ENTER;

      if (
        this.hoverStorage.some(
          (obj) => obj.hoverable.uuid === curHover.object.uuid
        )
      ) {
        event = HoverEvent.EXIT;
      }
      const data: HoverData = { ...curHover.data, event: event };

      if (
        !this.hoverStorage.some(
          (obj) => obj.hoverable.uuid === curHover.object.uuid
        )
      ) {
        this.hoverStorage.push({
          hoverable: curHover.object,
          hoverData: { ...data },
        });
      }
      curHover.object.onHover(data);
    }
  }
  private processExitHovers(intersections: THREE.Intersection[]) {
    this.hoverStorage.forEach((item) => {
      if (
        isHoverable(intersections[0].object) ||
        intersections[0].object.uuid !== item.hoverable.uuid
      ) {
        item.hoverData.event = HoverEvent.EXIT;
        item.hoverable.onHover(item.hoverData);
        this.hoverStorage = this.hoverStorage.filter(
          (obj) => obj.hoverable.uuid !== item.hoverable.uuid
        );
      }
    });
  }
}
