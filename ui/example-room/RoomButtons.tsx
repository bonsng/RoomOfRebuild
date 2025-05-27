import clsx from "clsx";
import LeftArrow from "@/public/svgs/left-arrow.svg";
import RightArrow from "@/public/svgs/right-arrow.svg";

export default function RoomButtons({
  onClick,
  isLeft,
  visible,
}: {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isLeft: boolean;
  visible: boolean;
}) {
  return (
    <>
      <div
        onClick={onClick}
        className={clsx(
          `absolute bg-transparent top-0 w-[10vw] h-screen transition-opacity cursor-pointer flex justify-center items-center  ${
            isLeft ? "left-0" : "right-0"
          } ${visible ? "opacity-100" : "opacity-0"}`
        )}
      >
        {isLeft ? <LeftArrow /> : <RightArrow />}
      </div>
    </>
  );
}
