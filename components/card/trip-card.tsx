import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { LucideArrowRight } from "lucide-react";

export default function TripCard({ trip }: { trip: any }) {
  return (
    <Link
      href={`/${trip.canonicalPath || trip.slug} `}
      className="bg-white shadow-md p-4 max-w-md hover:-translate-y-0.5 duration-300 block"
    >
      <div className="max-w-md overflow-hidden rounded-sm">
        <Image
          src={trip.images[0]}
          alt={trip.keywords[0] || trip.title.split(":")[0]}
          width={1280}
          height={720}
          className="object-cover hover:scale-105 ease-linear duration-300 rounded-sm"
        />
      </div>
      <div className="h-20 py-2">
        <div className="font-bold text-2xl">{trip.title}</div>
        <div className="">{trip.description}</div>
      </div>
      <div className="border-t pt-4 flex justify-between items-center">
        <div className="flex flex-col text-sm">
          Starting from
          <span className="font-bold text-2xl text-primary">
            USD {trip.price}
          </span>
          per person
        </div>
        <Button>
          Find out More <LucideArrowRight />
        </Button>
      </div>
    </Link>
  );
}
