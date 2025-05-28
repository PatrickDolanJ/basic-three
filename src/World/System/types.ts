import * as THREE from "three";

export interface UniqueObject {
  uuid: string;
}

export interface Updateable extends UniqueObject {
  update(delta?: number): void;
}
export interface Hoverable extends UniqueObject {
  onHover(data: HoverData): void;
}
export interface Clickable extends UniqueObject {
  onClick(data: ClickData): void;
}

export type ClickData = Omit<THREE.Intersection, "object">;

export enum HoverEvent {
  ENTER = "ENTER",
  DURING = "DURING",
  EXIT = "EXIT",
}
export type HoverData = Omit<THREE.Intersection, "object"> & {
  event: HoverEvent;
};

export interface HoverStorage {
  hoverable: Hoverable;
  hoverData: HoverData;
}
