export type Image = {
  position: [number, number, number];
  url: string;
};

const albumImageUrl = (idx: number) => `/albumImages/${idx}.jpg`;

export const images: Image[] = [
  {
    position: [0, 0, 0],
    url: albumImageUrl(1),
  },
  {
    position: [-3, 4, 0],
    url: albumImageUrl(2),
  },
  {
    position: [3, 4, 0],
    url: albumImageUrl(3),
  },
  {
    position: [-9, 4, 0],
    url: albumImageUrl(4),
  },
  {
    position: [-6, 0, 0],
    url: albumImageUrl(5),
  },
  {
    position: [6, 0, 0],
    url: albumImageUrl(6),
  },
  {
    position: [9, 4, 0],
    url: albumImageUrl(7),
  },
  {
    position: [3, -4, 0],
    url: albumImageUrl(8),
  },
  {
    position: [-3, -4, 0],
    url: albumImageUrl(9),
  },
  {
    position: [-9, -4, 0],
    url: albumImageUrl(10),
  },
  {
    position: [9, -4, 0],
    url: albumImageUrl(11),
  },
];
