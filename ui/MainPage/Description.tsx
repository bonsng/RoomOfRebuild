"use client";
import image1 from "@/public/roomImages/roomImage1.png";
import image2 from "@/public/roomImages/roomImage2.png";
import image3 from "@/public/roomImages/roomImage3.png";
import useScrollAnimate from "@/util/custom-hook/use-scroll-animate";
import clsx from "clsx";
import Image from "next/image";

const images = [image1, image2, image3];

export default function Description() {
  return (
    <>
      <section className="lg:pt-32 pt-16 text-center">
        <div className="flex justify-center font-news font-semibold ">
          <span className="text-2xl lg:text-6xl relative">Room</span>
          <span className="text-2xl lg:text-6xl relative">Of</span>
          <span className="relative border-b-2 border-b-black"></span>
        </div>
        <div className="py-3">
          <DescriptionCard text="1. 고인의 살아생전 사진/영상" subText="그리운 사람의 사진을 보며 그 사람을 추억해보세요" idx={0} />
          <DescriptionCard text="2. TTS" subText="그 사람의 목소리로 듣고 싶은 말을 들어보세요" idx={1} />
          <DescriptionCard text="3. 방명록" subText="그 사람에게 남기고 싶은 말이 있으신가요?" idx={2} />
        </div>
      </section>
    </>
  );
}

function DescriptionCard({ text, subText ,idx }: { text: string; subText:string; idx: number }) {
  const isLeft = idx % 2 === 0;
  const translateValue = 10;
  const animatedItem = useScrollAnimate(isLeft, translateValue);
  return (
    <div
      className={clsx("w-full flex flex-col-reverse lg:flex-row justify-center items-center my-20 lg:my-40", {
        "lg:flex-row-reverse": isLeft,
      })}
      {...animatedItem}
    >
      <div className={clsx
      ("lg:w-[41vw] flex flex-col transition-opacity duration-1000 opacity-0 ", {"lg:pl-52": isLeft}, {"lg:pr-52": !isLeft})}>
        <p className="lg:text-3xl font-semibold lg:mb-3">{text}</p>
        <p className="text-sm lg:text-base lg:font-medium">{subText}</p>
      </div>
      <div
        className={clsx(
          "lg:w-[43vw] transition-all duration-1000 opacity-0",
          isLeft && `mr-[${translateValue}vw]`,
          !isLeft && `ml-[${translateValue}vw]`
        )}
      >
        <Image src={images[idx]} alt="testImage" />
      </div>
    </div>
  );
}
