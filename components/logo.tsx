import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="font-bold text-lg">
      <Link href={"/"} className="flex gap-1 items-center text-white">
        <Image
          src={siteConfig.logo}
          alt="Essence Treks Nepal Logo"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        {siteConfig.name}
      </Link>
    </div>
  );
}
