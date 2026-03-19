import { FeaturedTrip } from "@/components/featured-trip";
import CategorySection from "@/components/sections/category-section";
import FeaturedSections from "@/components/sections/featuered-sections";
import HomeHero from "@/components/sections/home-hero";
import WhySection from "@/components/sections/why-section";
import Testimonials from "@/components/testimonials";

export default async function Homepage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured?includeActivity=true`,
  );

  const data = await res.json();

  const featured = data?.data;

  const featuredWithoutTOM = featured.featuredTags.filter(
    (tag: any) => tag.slug !== "trip-of-the-month",
  );

  const firstFeatured = featuredWithoutTOM.slice(0, 1);
  const secondFeatured = featuredWithoutTOM.slice(1, 3);

  return (
    <>
      <HomeHero />
      <CategorySection />
      <FeaturedSections featuredTags={firstFeatured} />
      <WhySection />
      <FeaturedTrip />
      <FeaturedSections featuredTags={secondFeatured} />
      <Testimonials />
    </>
  );
}
