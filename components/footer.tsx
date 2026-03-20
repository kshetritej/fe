import { siteConfig } from "@/lib/siteConfig";
import { LucideMail, LucideMapPin, LucidePhone } from "lucide-react";
import Link from "next/link";
import { CgFacebook, CgInstagram, CgTwitter, CgYoutube } from "react-icons/cg";

export default async function Footer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/published?category=company`,
  );

  const json = await res.json();

  const items = json.blogs;

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/published?category=travel-guide`,
  );

  const json2 = await res2.json();

  const guides = json2.blogs;

  return (
    <div className="bg-black">
      <div className="flex  flex-col-reverse gap-8 lg:grid lg:grid-cols-4 container mx-auto text-white py-12 px-4">
        <div>
          <h3 className="font-black text-xl">Company</h3>
          <ul className="flex gap-2 flex-col">
            {items.map((item: any) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-black text-xl">Travel Guides</h3>
          <ul className="flex gap-2 flex-col">
            {guides.map((item: any) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-black text-xl">Useful Links</h3>
          <ul className="flex gap-2 flex-col">
            <li>About us</li>
            <li>Why us?</li>
            <li>Equipment Checklist</li>
            <li>Legal Documents</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-black text-xl">Essence Treks Nepal</h3>
          <div className="flex items-start md:items-center gap-4">
            <LucideMapPin className="size-8 md:size-10 text-primary" />{" "}
            {siteConfig.fullAddress}
          </div>
          <div className="flex items-center gap-4">
            <LucidePhone className="size-4 md:size-6 text-primary" />{" "}
            {siteConfig.phoneNumbers[0].phone}
          </div>
          <div className="flex items-center gap-4">
            <LucideMail className="size-4 md:size-6 text-primary" />{" "}
            {siteConfig.email}
          </div>
        </div>
      </div>
      <div className="bg-amber-50">
        <div className="container mx-auto py-12 grid md:grid-cols-2 gap-4 px-4">
          <div>
            <div className="font-black text-lg">Find us on</div>
            <div className="flex gap-4 mt-4">
              <CgFacebook className="size-4 md:size-8" />
              <CgTwitter className="size-4 md:size-8" />
              <CgInstagram className="size-4 md:size-8" />
              <CgYoutube className="size-4 md:size-8" />
            </div>
          </div>
          <div>
            <div className="font-black text-lg">Associated With</div>
            <div className="flex gap-4 mt-4">
              <img
                src={"https://www.moha.gov.np/static/nepal-government.png"}
                className="object-contain w-40"
              />
              {/*<img
                src={"https://www.taan.org.np/public/images/taan-logo.jpg"}
                className="object-contain w-40"
              />
              <img
                src={"https://www.taan.org.np/public/images/ntb.jpg"}
                className="object-contain w-40"
              />
              <img
                src={
                  "https://www.nepalmountaineering.org/storage/website/logo-header.png"
                }
                className="object-contain w-40"
              />*/}
            </div>
          </div>
        </div>
        <div className="p-4 items-center text-center">
          &copy;Copyright {siteConfig.name} {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </div>
    </div>
  );
}
