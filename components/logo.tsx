import { siteConfig } from "@/lib/siteConfig";

export default function Logo() {
  return <div className="font-bold text-lg">{siteConfig.name}</div>;
}
