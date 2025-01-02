"use client";

export default function Description() {
  return (
    <>
      <section className="h-[1000px] pt-36 text-center">
        <div className="flex justify-center">
          <span className="text-2xl lg:text-5xl relative">Room</span>
          <span className="text-2xl lg:text-5xl relative">Of</span>
          <span className="relative border-b-2 border-b-black"></span>
        </div>
        <div className="py-20">
          <div className="w-full">1. 고인의 살아생전 사진/영상</div>
          <div className="w-full">2. TTS</div>
          <div className="w-full">3. 방명록</div>
        </div>
      </section>
    </>
  );
}
