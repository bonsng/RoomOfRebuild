export type CarouselItem = {
  id?: number;
  text: string;
  subText?: string;
  img: string;
};

export const carouselItems: CarouselItem[] = [
  {
    id: 0,
    text: "Welcome to RoomOf",
    subText: "A space to meet person you miss",
    img: "imgurl",
  },
  {
    id: 1,
    text: "RoomOf 에 오신걸 환영합니다",
    subText: "그리운 사람을 만날 수 있는 공간",
    img: "imgurl",
  },
  {
    id: 2,
    text: "세 가지 기능을 제공합니다",
    subText: "사진 앨범, 방명록, 그리고 그리운 사람의 목소리",
    img: "imgurl",
  },
];
