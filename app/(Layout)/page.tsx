import Carousel from "@/ui/main-page/Carousel";
import Description from "@/ui/main-page/Description";

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
