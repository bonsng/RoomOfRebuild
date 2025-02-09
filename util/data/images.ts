export type Image = {
  position: [number, number, number];
  url: string;
};

const albumImageUrl = (idx: number) => `/albumImages/${idx}.jpeg`;

export const images: Image[] = [
  {
    position: [0, 0, 0],
    url: albumImageUrl(1),
  },
  {
    position: [-3, 4, 0],
    url: albumImageUrl(1),
  },
  {
    position: [3, 4, 0],
    url: albumImageUrl(1),
  },
  {
    position: [-9, 4, 0],
    url: albumImageUrl(1),
  },
  {
    position: [-6, 0, 0],
    url: albumImageUrl(1),
  },
  {
    position: [6, 0, 0],
    url: albumImageUrl(1),
  },
  {
    position: [9, 4, 0],
    url: albumImageUrl(1),
  },
  {
    position: [3, -4, 0],
    url: albumImageUrl(1),
  },
  {
    position: [-3, -4, 0],
    url: albumImageUrl(1),
  },
  {
    position: [-9, -4, 0],
    url: albumImageUrl(1),
  },
  {
    position: [9, -4, 0],
    url: albumImageUrl(1),
  },
];
