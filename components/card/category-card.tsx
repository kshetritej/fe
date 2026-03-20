import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export interface TCategoryCardProps {
  image?: string;
  text?: string;
  link?: string;
}
export default function CategoryCard({
  image,
  text,
  link,
}: TCategoryCardProps) {
  return (
    <Link href={link ?? "/"} className="block max-w-sm">
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
