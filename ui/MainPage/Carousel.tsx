"use client";

import React, { useState } from "react";
import { CarouselItem, carouselItems } from "./carouselItem";
import Image from "next/image";
import image1 from "@/public/testImages/roomImage1.jpeg";
import image2 from "@/public/testImages/roomImage2.jpeg";
import image3 from "@/public/testImages/roomImage3.jpeg";
import { useInterval } from "@/util/custom-hook/use-interval";

const images = [image1, image2, image3];

export default function Carousel() {
  const [num, setNum] = useState(0);
  const clickLeft = () => setNum(num - 1 == -1 ? 2 : num - 1);
  const clickRight = () => setNum((num + 1) % 3);

  useInterval(() => setNum((num + 1) % 3), 5000);

  return (
    <>
      <div className="w-[300vw] flex">
        {carouselItems.map((item, idx) => (
          <CarouselCard
            item={item}
            key={idx}
            style={{
              left: `-${idx * 100}vw`,
              opacity: idx === num ? 1 : 0,
              transition: "opacity 1s ease-in-out",
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
        className={`lg:flex lg:flex-row-reverse w-screen h-[550px] relative`}
        style={style}
      >
        <Image src={images[idx]} alt={`image${item.id}`} className="lg:w-1/2" />
        <div className="lg:w-1/2 py-20 px-24 bg-[#EFF3EA]">
          <h1 className="text-4xl">RoomOf</h1>
          <p>{item.text}</p>
        </div>
      </div>
    </>
  );
}
