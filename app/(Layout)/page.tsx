import Carousel from "@/ui/MainPage/Carousel";
import Description from "@/ui/MainPage/Description";

export default function Home() {
  return (
    <div className="relative pt-[1.5rem] lg:pt-0 bg-rice-cake w-full overflow-x-hidden">
      {/* Carousel Part */}
      <Carousel />

      {/* Description Part */}
      <Description />
    </div>
  );
}
