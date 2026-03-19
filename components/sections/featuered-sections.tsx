import { satisfy } from "@/lib/font";
import TripCard from "../card/trip-card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function FeaturedSections({
  featuredTags,
}: {
  featuredTags: any;
}) {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured?includeActivity=true`,
  // );

  // const data = await res.json();

  // const featured = data?.data;

  return (
    <div className="relative flex flex-col gap-4 justify-center container mx-auto mt-12 p-2">
      {featuredTags.map((tag: any, index: number) => {
        return (
          <div key={index} className="space-y-4 min-h-[70vh] ">
            <div className="flex flex-col items-center justify-center">
              <div
                className={cn(
                  "md:max-w-3xl text-xl md:text-2xl font-semibold text-primary text-shadow-2xs text-center",
                  satisfy.className,
                )}
              >
                {tag.description.substring(0, 28)}
              </div>

              <div className="text-2xl md:text-3xl font-black uppercase">
                {" "}
                {tag.name}
              </div>
            </div>
            <div className="flex gap-4 justify-start overflow-x-auto scrollbar-red items-start">
              {tag.activity.map((activity: any, index: number) => (
                <div key={index}>
                  <TripCard key={activity.id} trip={activity} />
                </div>
              ))}
            </div>

            {/*Button Group*/}
            <div className="flex gap-4 items-center justify-center mb-12">
              <Button className="group flex items-center gap-2 overflow-hidden rounded-full bg-transparent hover:bg-primary text-primary  border h-12 w-12 hover:w-32 transition-all duration-300">
                <ChevronLeft className="group-hover:text-white" />

                <span className="hidden group-hover:block group-hover:text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-150 font-black whitespace-nowrap">
                  Prev
                </span>
              </Button>
              <Button className="group flex items-center gap-2 overflow-hidden rounded-full bg-transparent hover:bg-primary text-primary  border h-12 w-12 hover:w-32 transition-all duration-300">
                <span className="hidden group-hover:block group-hover:text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-150 font-black whitespace-nowrap">
                  Next
                </span>
                <ChevronRight className="group-hover:text-white" />
              </Button>
              <Button className="w-32 rounded-full cursor-pointer h-12">
                Explore all
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
