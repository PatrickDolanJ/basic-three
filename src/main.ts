import "./style.css";
import { World } from "./World/World";

addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLElement>("#canvasContainer");
  if (container) {
    const world = new World(container);
    world.start();
  } else {
    throw new Error("Failed to start three");
  }
});
