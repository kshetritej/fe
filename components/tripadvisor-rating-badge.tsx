import Image from "next/image";
import Link from "next/link";

export default function TripAdvisorRatingBadge() {
  return (
    <div className="flex gap-4 items-start md:items-center justify-center">
      <Image
        src={"/assets/tripadvisor.avif"}
        height={50}
        width={150}
        alt="tripadvisor logo"
      />
      <span className="font-bold text-muted-foreground">
        5.0 Rating out of 5 based on{" "}
        <Link
          href="https://www.tripadvisor.com/"
          className="underline hover:text-primary"
          target="_blank"
        >
          150 Reviews
        </Link>
      </span>
    </div>
  );
}
