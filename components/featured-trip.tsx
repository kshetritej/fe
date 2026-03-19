import Image from "next/image";
import { Badge } from "./ui/badge";
import { LucideClock3, LucideGauge } from "lucide-react";
import Link from "next/link";

export async function FeaturedTrip() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured/trip-of-the-month?includeActivity=true`,
  );
  const json = await res.json();

  const feature = json.data;
  const activity = feature.featuredTag.activity[0];

  return (
    <Link
      href={`/${activity.slug}`}
      className="md:min-h-[80vh] flex flex-col items-center justify-center px-4"
    >
      <div className="relative max-w-5xl mx-auto py-8">
        <Image
          src={activity.images[0]}
          width={1280}
          height={720}
          alt=""
          className="rounded-sm object-cover object-center h-72 md:h-full"
        />
        <div className="absolute -bottom-8 left-4">
          <div>
            <Badge variant={"secondary"} className="font-black px-4 py-2 mb-4">
              <LucideGauge /> {activity.difficultyLevel}{" "}
            </Badge>
            <div className="text-white  font-black flex flex-col gap-4">
              <div className="text-3xl md:text-5xl text-shadow-lg">
                {activity.title.split(":")[0]}
              </div>
              <div className="bg-white p-4 rounded-md w-fit text-black flex gap-8 border">
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    <LucideClock3 className="size-12 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Duration</p>
                    <p className="font-medium text-md md:text-xl">
                      {activity.duration}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-normal">Price starts from</p>
                  <p className="text-md md:text-xl text-primary font-black">
                    US $<span>{activity.price}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
