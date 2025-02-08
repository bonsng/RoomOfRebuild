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
  // initial
  {
    position: { x: 0, y: 11, z: 150 },
    target: { x: 0, y: 11, z: -10 },
  },
  // GuestBook
  {
    position: { x: 10, y: 13.3, z: 10 },
    target: { x: 20, y: 13.3, z: 10 },
  },
];

// { x: 20, y: 15, z: 50 },
