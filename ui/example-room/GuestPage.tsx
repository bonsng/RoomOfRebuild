import { PostIts } from "@/models/PostIt";

export default function GuestPage({ notes }: { notes: PostIts[] }) {
  return (
    <>
      <div className="bg-transparent text-gray-50 w-[80vw] h-[80vh] flex items-center flex-col overflow-hidden">
        <div className="sticky top-0 w-full bg-transparent py-3 text-center text-lg font-bold z-10">
          Example Room Guest Book
        </div>
        <div className="w-4/5 flex-1 overflow-y-auto pt-3 pr-4">
          {notes &&
            notes.map((el, idx) => {
              return <GuestBookCard el={el} key={idx} />;
            })}
        </div>
      </div>
    </>
  );
}

const GuestBookCard = ({ el }: { el: PostIts }) => {
  return (
    <div className="mt-10 p-5 border border-gray-50 rounded-md">
      <div className="flex flex-col">
        <p className="text-left text-lg font-bold">{el.text}</p>
        <p className="mt-2 mb-2">내용....</p>
        {el.createdAt && (
          <p className="text-right text-sm text-[rgb(151,151,151)]">
            작성 날짜: {new Date(el.createdAt).toLocaleDateString()}{" "}
            {new Date(el.createdAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};
