import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { LucideArrowRight, LucideClock, LucideGauge } from "lucide-react";
import { Badge } from "../ui/badge";

export default function TripCard({ trip }: { trip: any }) {
  return (
    <Link
      href={`/package/${trip.canonicalPath || trip.slug} `}
      className="p-4 min-w-64  md:min-w-md hover:-translate-y-0.5 duration-300 flex flex-col items-start group hover:shadow-b-sm rounded-sm"
    >
      <div className="max-w-md overflow-hidden rounded-t-sm h-42 md:h-72">
        <Image
          src={trip.images[0]}
          alt={trip.keywords[0] || trip.title.split(":")[0]}
          width={1280}
          height={720}
          className="object-cover hover:scale-105 ease-linear duration-300 rounded-t-sm h-42 md:h-72"
        />
      </div>
      <div className="w-full mt-4">
        <div className="flex gap-1 items-center text-primary  font-semibold justify-between">
          <div className="flex gap-1 items-center">
            <LucideClock /> {trip.duration}
          </div>
          <Badge className="font-black">
            <LucideGauge /> {trip.difficultyLevel}
          </Badge>
        </div>
        <div className="min-h-16 py-2">
          <div className="font-black md:text-2xl text-left">
            {trip.title.split(":")[0]}
          </div>
        </div>
        <div className="font-black text-2xl text-primary text-left flex justify-between">
          <div>
            US ${trip.price}{" "}
            <span className="text-sm font-bold text-black">/per person</span>
          </div>
          <Button
            size={"sm"}
            className="hidden group-hover:flex transition-all delay-200 duration-500 uppercase font-black cursor-pointer"
          >
            Know More <LucideArrowRight />
          </Button>
        </div>
        {/*<div className="border-t pt-4 flex justify-between items-center">
          <div className="flex flex-col text-sm">Starting from per person</div>
        </div>*/}
      </div>
    </Link>
  );
}
