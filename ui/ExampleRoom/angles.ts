export type Point = {
  x: number;
  y: number;
  z: number;
};

export type Angle = {
  position: Point;
  target: Point;
};

export const angles: Angle[] = [
  // left
  {
    position: { x: 0, y: 11.5, z: 10 },
    target: { x: -10, y: 11.5, z: 10 },
  },
  // front
  {
    position: { x: 0, y: 11, z: 25 },
    target: { x: 0, y: 11, z: -10 },
  },
  // right
  {
    position: { x: 0, y: 11.5, z: 10 },
    target: { x: 10, y: 11.5, z: 10 },
  },
];
