"use client";

import React, { useState } from "react";
import { CarouselItem, carouselItems } from "./carouselItem";
import Image from "next/image";
import image1 from "@/public/testImages/roomImage1.jpeg";
import image2 from "@/public/testImages/roomImage2.jpeg";
import image3 from "@/public/testImages/roomImage3.jpeg";
import { useInterval } from "@/util/custom-hook/use-interval";
import useScrollMove from "@/util/custom-hook/use-scroll-move";

const images = [image1, image2, image3];

export default function Carousel() {
  const animatedItem = useScrollMove();
  const [num, setNum] = useState(0);
  const clickLeft = () => setNum(num - 1 == -1 ? 2 : num - 1);
  const clickRight = () => setNum((num + 1) % 3);

  useInterval(() => setNum((num + 1) % 3), 5000);

  return (
    <>
      <div className="w-[300vw] flex" {...animatedItem}>
        {carouselItems.map((item, idx) => (
          <CarouselCard
            item={item}
            key={idx}
            style={{
              left: `-${idx * 100}vw`,
              opacity: idx === num ? 1 : 0,
              visibility: idx === num ? "visible" : "hidden",
              transition: "opacity 1s ease-in-out, visibility 1s ease-in-out",
            }}
            idx={idx}
          />
        ))}
      </div>
      <div className="flex justify-center align-middle w-screen mt-2">
        <span
          className="material-symbols-outlined cursor-pointer"
          onClick={clickLeft}
        >
          chevron_left
        </span>
        <div className="font-extralight">{num + 1} / 3</div>
        <span
          className="material-symbols-outlined cursor-pointer"
          onClick={clickRight}
        >
          chevron_right
        </span>
      </div>
    </>
  );
}

function CarouselCard({
  item,
  style,
  idx,
}: {
  item: CarouselItem;
  style: React.CSSProperties;
  idx: number;
}) {
  return (
    <>
      <div
        className={`lg:flex lg:flex-row-reverse w-screen h-[600px] relative`}
        style={style}
      >
        <Image src={images[idx]} alt={`image${item.id}`} className="lg:w-1/2" />
        <div className="lg:w-1/2 py-20 px-24 bg-[#f6f5e8]">
          <h1 className="text-4xl">RoomOf</h1>
          <p className="mt-5">{item.text}</p>
          <div className="flex align-middle justify-between px-4 py-4 border-black border-[0.1px] w-1/2 font-normal mt-10 hover:cursor-pointer hover:text-[#f6f5e8] hover:bg-onyx-black transition-all">
            <span>예시공간 입장하기</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </div>
      </div>
    </>
  );
}
