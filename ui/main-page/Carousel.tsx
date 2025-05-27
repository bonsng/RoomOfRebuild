"use client";

import React, { useState } from "react";
import { CarouselItem, carouselItems } from "./carouselItem";
import Image from "next/image";
import image1 from "/roomImages/roomImage6.png";
import image2 from "/roomImages/roomImage5.png";
import image3 from "/roomImages/roomImage4.png";
import { useInterval } from "../../util/custom-hook/use-interval";
import useScrollMove from "../../util/custom-hook/use-scroll-move";
import Link from "next/link";

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
      <div className="flex justify-center align-middle lg:w-screen lg:mt-2">
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
      <Link
        href="/example-room"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex lg:hidden align-middle rounded-3xl justify-between px-4 py-4 border-black border-[0.1px] w-[70vw] max-w-xs  font-normal bg-white z-50 hover:cursor-pointer hover:text-[#f6f5e8] hover:bg-onyx-black transition-all"
      >
        <span>예시공간 입장하기</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </Link>
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
        className="flex flex-col lg:flex-row-reverse w-screen h-[500px] relative"
        style={style}
      >
        <Image
          src={images[idx]}
          alt={`image${item.id}`}
          objectFit="cover"
          className="w-full lg:w-1/2 h-1/2 lg:h-full object-cover"
        />
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full lg:py-20 lg:pl-48 pl-8 py-8 flex flex-col justify-start bg-[#f6f5e8]">
          <h1 className="text-3xl mt-6 lg:mt-0 lg:text-6xl font-semibold">RoomOf</h1>
          <p className="text-xl mt-5 lg:mt-16 lg:text-3xl font-medium">{item.text}</p>
            <p className="lg:mt-3 lg:text-lg">{item.subText}</p>
          <Link
            href="/example-room"
            className="hidden lg:flex align-middle justify-between px-4 py-4 border-black border-[0.1px] w-1/2 font-normal mt-10 hover:cursor-pointer hover:text-[#f6f5e8] hover:bg-onyx-black transition-all"
          >
            <span>예시공간 입장하기</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </>
  );
}
