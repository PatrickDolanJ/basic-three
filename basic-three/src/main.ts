import "./style.css";
import { World } from "./World/World";

addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#canvasContainer") as HTMLElement;
  if (container != null) {
    const world = new World(container);
    world.start();
  }
});
