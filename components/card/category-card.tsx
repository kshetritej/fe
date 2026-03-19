import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Sticker } from "lucide-react";
import Link from "next/link";

export interface TCategoryCardProps {
  image?: string;
  icon?: any;
  text?: string;
  link?: string;
}
export default function CategoryCard({
  image,
  icon: Icon,
  text,
  link,
}: TCategoryCardProps) {
  return (
    <Link href={link ?? "/"} className="block">
      <Card className="overflow-hidden py-0 rounded-sm relative group min-w-56 shrink-0">
        <div className="overflow-hidden h-60">
          <Image
            src={image ?? "/assets/everest.jpg"}
            height={720}
            width={1280}
            alt="category"
            className="hover:scale-105 transition-all duration-300 delay-100 object-center object-cover"
          />
        </div>
        <div className="group-hover:bg-white group-hover:text-primary transition-colors duration-300 delay-100 absolute bottom-16 sm:bottom-12 left-20 sm:left-28 bg-primary text-white rounded-full  size-12 md:size-16 flex items-center justify-center">
          {Icon ? (
            <Icon className="size-4 md:size-8" />
          ) : (
            <Sticker className="size-8" />
          )}
        </div>
        <CardContent className="py-4">
          <CardHeader>
            <CardTitle className="font-black uppercase text-center">
              {text ?? "Trekking in Nepal"}
            </CardTitle>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
}
