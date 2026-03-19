import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import Link from "next/link";

export default function TripAdvisorRatingBadge() {
  return (
    <div className="flex gap-4 items-start md:items-center justify-center">
      <Image
        src={"/assets/tripadvisor.avif"}
        height={50}
        width={100}
        alt="tripadvisor logo"
      />
      <span className="font-bold text-muted-foreground">
        {siteConfig.reviews.tripadvisor.rating} Rating out of 5 based on{" "}
        <Link
          href={
            "https://www.tripadvisor.com/Attraction_Review-g293891-d34042144-Reviews-Essence_Treks-Pokhara_Gandaki_Zone_Western_Region.html"
          }
          className="underline hover:text-primary"
          target="_blank"
        >
          {siteConfig.reviews.tripadvisor.count} Reviews
        </Link>
      </span>
    </div>
  );
}
