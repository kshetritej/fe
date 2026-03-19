import {
  LucideHelicopter,
  LucideMountain,
  LucideTreePine,
  LucideVectorSquare,
} from "lucide-react";
import CategoryCard from "../card/category-card";

export default function CategorySection() {
  return (
    <div className="bg-green-50/50">
      <div className="flex gap-4 md:min-h-[60vh] items-center md:justify-center md:max-w-7xl mx-auto overflow-x-auto py-12 px-4 scroll-smooth">
        <CategoryCard
          text="Tours in Nepal"
          link={"/"}
          image="/assets/kathmandu12.jpg"
          icon={LucideVectorSquare}
        />
        <CategoryCard
          text="Peak Climbing"
          link={"/"}
          image="/assets/kathmandu12.jpg"
          icon={LucideMountain}
        />
        <CategoryCard
          text="Trekking in Nepal"
          link={"/"}
          image="/assets/pokhara.jpg"
          icon={LucideTreePine}
        />
        <CategoryCard
          text="Heli Tours in Nepal"
          link="/"
          image="/assets/everest.jpg"
          icon={LucideHelicopter}
        />
      </div>
    </div>
  );
}
