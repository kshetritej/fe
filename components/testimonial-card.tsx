import { LucideStar } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export default function TestimonialCard({
  name,
  review,
}: {
  name: string;
  review: string;
}) {
  const stars = [0, 1, 2, 3, 4];

  return (
    <div className="max-w-sm space-y-1.5 min-w-sm">
      <div className="bg-white p-4 rounded-xs space-y-3">
        <div className="flex gap-1">
          {stars.map((_, index) => {
            return (
              <LucideStar
                key={index}
                fill="orange"
                className="text-orange-500"
              />
            );
          })}
        </div>
        {/*<p className="text-black font-bold">
          My First Nepal Hiking Experience at Pikey Peak – A Memorable Adventure
        </p>*/}
        <p className="text-black">
          <ScrollArea className="h-32">{review}</ScrollArea>
        </p>
        <div className="flex gap-4 items-center">
          <div className="rounded-full size-16 bg-slate-100 flex items-center justify-center text-black font-black">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="text-black">
            <p className="font-bold">{name}</p>
            {/*<p className="text-sm">20th Dec, 2024</p>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
