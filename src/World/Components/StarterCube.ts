import * as THREE from "three";
import gsap from "gsap";
import { createBasicMat } from "../Materials/BasicMaterial/BasicMaterial";
import {
  Clickable,
  Hoverable,
  ClickData,
  HoverData,
  Updateable,
  HoverEvent,
} from "../System/types";

export class StarterCube
  extends THREE.Mesh
  implements Hoverable, Clickable, Updateable
{
  material = createBasicMat();
  constructor(
    width: number = 5,
    height: number = 5,
    depth: number = 5,
    widthSegments: number = 1,
    heightSegments: number = 1,
    depthSegments: number = 1
  ) {
    super(
      new THREE.BoxGeometry(
        width,
        height,
        depth,
        widthSegments,
        heightSegments,
        depthSegments
      )
    );
  }

  onHover(data: HoverData) {
    const tl = gsap.timeline();
    if (data.event === HoverEvent.ENTER) {
      tl.to(this.scale, {
        x: 1.07,
        y: 1.07,
        z: 1.07,
        duration: 0.1,
      });
    } else if (data.event === HoverEvent.EXIT) {
      tl.to(this.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.1,
      }).then(() => tl.kill());
    }
  }

  onClick(data: ClickData) {
    console.log("Distance to Startercube (CLICK): " + data.distance);
  }
  update() {
    const uTime = performance.now() * 0.002;
    this.material.uniforms.uTime.value = uTime;
  }
}
