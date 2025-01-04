"use client";
import image1 from "@/public/testImages/testImage1.png";
import image2 from "@/public/testImages/testImage2.png";
import image3 from "@/public/testImages/testImage3.png";
import useScrollAnimate from "@/util/custom-hook/use-scroll-animate";
import clsx from "clsx";
import Image from "next/image";

const images = [image1, image2, image3];

export default function Description() {
  return (
    <>
      <section className="pt-32 text-center">
        <div className="flex justify-center">
          <span className="text-2xl lg:text-5xl relative">Room</span>
          <span className="text-2xl lg:text-5xl relative">Of</span>
          <span className="relative border-b-2 border-b-black"></span>
        </div>
        <div className="py-3">
          <DescriptionCard text="1. 고인의 살아생전 사진/영상" idx={0} />
          <DescriptionCard text="2. TTS" idx={1} />
          <DescriptionCard text="3. 방명록" idx={2} />
        </div>
      </section>
    </>
  );
}

function DescriptionCard({ text, idx }: { text: string; idx: number }) {
  const isLeft = idx % 2 === 0;
  const translateValue = 10;
  const animatedItem = useScrollAnimate(isLeft, translateValue);
  return (
    <div
      className={clsx("w-full flex justify-center my-40", {
        "flex-row-reverse": isLeft,
      })}
      {...animatedItem}
    >
      <div className="w-[41vw] flex justify-center flex-col align-middle transition-opacity duration-1000 opacity-0">
        {text}
      </div>
      <div
        className={clsx(
          "w-[43vw] transition-all duration-1000 opacity-0",
          isLeft && `mr-[${translateValue}vw]`,
          !isLeft && `ml-[${translateValue}vw]`
        )}
      >
        <Image src={images[idx]} alt="testImage" />
      </div>
    </div>
  );
}
