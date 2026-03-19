import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import Link from "next/link";

export default function GoogleRatingBadge() {
  return (
    <div className="flex gap-4 items-start md:items-center justify-center">
      <Image
        src={"/assets/googleicon.png"}
        height={20}
        width={20}
        alt="tripadvisor logo"
      />
      <span className="font-bold text-muted-foreground">
        {siteConfig.reviews.googleReview.rating} Rating out of 5 based on{" "}
        <Link
          href={
            "https://www.google.com/search?sca_esv=ae95eeef493796b7&sxsrf=ANbL-n6hSgLST7MwqJ5EmSnmopZbrfKeFw:1773921800283&si=AL3DRZFIhG6pAqfNLal55wUTwygCG0fClF3UxiOmgw9Hq7nbWW69MEiZvU5e10x2mJ4gcivbI3k1hbjGYLhzGj-V2cm6KV2fnoNne5TGw9saosfyIF9gOofvJHEbem49cx5s80sWpCVz_pf71VEmfNsGGUuwCbhXOmvSVzLsX9eK7O-H8EYlWrd2P0NIYnI2YewziZckUBXc&q=Essence+Tours+and+Travels+%26+Treks+and+Expedition+Pvt.+LTD.+Reviews&sa=X&ved=2ahUKEwj3oI_W9auTAxWGcGwGHfCcDLAQ0bkNegQIKxAH&biw=1462&bih=837&dpr=2"
          }
          className="underline hover:text-primary"
          target="_blank"
        >
          {siteConfig.reviews.googleReview.count} Reviews
        </Link>
      </span>
    </div>
  );
}
