export const dynamic = "force-static";
import PricingCardSidebar from "@/components/card/pricing-card";
import { Lightbox } from "@/components/claude/lightbox";
import { AdditionalInfoRenderer } from "@/components/additional-info-renderer";
import { TripFaqs } from "@/components/v0/trip-faqs";
import { TripItinerary } from "@/components/v0/trip-itinerary";
import { TripOverview } from "@/components/v0/trip-overview";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { LucideImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionNavigation } from "@/components/section-nav";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const param = await params;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity/slug/${param.slug}`,
  ).then((res) => res.json());

  const trip = data.data;

  return {
    title: trip.seo?.metaTitle || "Limestone Treks",
    description:
      trip.seo.metaDescription || "Explore the beauty of Limestone Treks",
    openGraph: {
      title: trip.seo.metaTitle,
      description: trip.seo.metaDescription,
      images: [
        {
          url: trip?.seo?.featuredMedia,
          width: 800,
          height: 600,
          alt: trip?.seo?.metaTitle || "Limestone Treks",
        },
      ],
    },
  };
}

export default async function TripPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity/slug/${slug}`,
  );

  if (res.status == 404) {
    return notFound();
  }

  if (!res.ok) {
    return (
      <main>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold">Failed to fetch.</h1>
          <p className="mt-2 text-muted-foreground">
            The trip data could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  const jsonres = await res.json();

  const trip = jsonres.data;

  const mainImage = trip.images[0];
  const otherImages = trip.images.slice(1) || [];
  return (
    <main className="min-h-screen p-2">
      {/*Schema */}
      {trip.seo?.schema && (
        <Script
          id="schema"
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON.parse(trip.seo.schema)),
          }}
        ></Script>
      )}

      {/*Images in Lightbox*/}
      {trip.images && trip.images.length > 0 && (
        <Lightbox images={trip.images} keywords={trip.keywords || []}>
          <div className="grid md:grid-cols-3 gap-2 container mx-auto relative">
            <div className="rounded-sm overflow-hidden col-span-2">
              <Image
                src={mainImage}
                alt={trip.keywords[0] || trip.title}
                height={1280}
                width={1920}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <div className="col-span-1 gap-2 hidden md:grid">
              {otherImages.map((imageUrl: string, index: number) => (
                <div key={imageUrl} className="rounded-sm overflow-hidden">
                  <Image
                    alt={trip.keywords[index + 1] || trip.title + "2"}
                    src={imageUrl}
                    height={1280}
                    width={1920}
                    className="w-full object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
            <Button className="absolute top-2 left-2" variant={"secondary"}>
              <LucideImage /> {trip.images.length} Photo(s)
            </Button>
          </div>
        </Lightbox>
      )}

      {/*Content starts */}
      <div className="container mx-auto">
        <SectionNavigation />
        <div className="grid md:grid-cols-4 gap-4 min-w-0">
          <div className="col-span-3 min-w-0!">
            <TripOverview trip={trip} />
            <div
              className="col-span-2 min-w-0!
      prose-base leading leading-relaxed
      prose-headings:text-gray-900 prose-headings:font-bold
      prose-h1:text-3xl
      prose-h2:text-3xl   prose-h2:font-bold
      prose-h3:text-xl
      prose-h4:text-lg
      prose-p:leading-relaxed prose-p:mb-4 prose-p:mt-0 prose-p:text-xl
      prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary hover:prose-a:underline
      prose-strong:text-black prose-strong:font-bold
      prose-ul:my-2 prose-ol:my-2
      prose-li:text-gray-700 prose-li:mb-1
      prose-blockquote:border-l-4 prose-blockquote:border-primary/70 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
      prose-img:rounded-lg prose-img:my-6
      prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
      prose-ul:list-none
      prose-li:relative prose-li:pl-8 prose-li:text-xl
      prose-li:before:absolute
      prose-li:before:left-0
      prose-li:before:top-[0.45em]
      prose-li:before:w-4 prose-li:before:h-4
      prose-li:before:mask-[url('/icons/bullet.png')]
      prose-li:before:rotate-90
      prose-li:before:mask-contain
      prose-li:before:mask-no-repeat
      prose-li:before:bg-primary
      prose max-w-none w-full
      wrap-break-word
      **:wrap-break-word
            "
            >
              <TripItinerary trip={trip} />
              <div
                id="inclusions"
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntities(trip.inclusions[0]),
                }}
                className="bg-primary/10 p-2 w-full mt-4 rounded-sm
                  prose-li:before:mask-[url('/icons/greentick.png')]
                  prose-li:before:rotate-360
                   "
              />
              <div
                id="exclusions"
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntities(trip.exclusions[0]),
                }}
                className="w-full bg-rose-500/10 p-2 rounded-sm  mt-4 prose-li:before:mask-[url('/icons/cross.png')]"
              />
              {trip.additionalInfo.length > 0 && (
                <>
                  <h2 id="trip-info" className="font-bold text-xl my-4">
                    Trip Information
                  </h2>
                  {/*<Accordion collapsible type="single" className="w-full! mb-8">*/}
                  {trip.additionalInfo.map((info: any, idx: any) => {
                    return (
                      <AdditionalInfoRenderer
                        key={idx}
                        index={idx}
                        item={info}
                      />
                    );
                  })}
                  {/*</Accordion>*/}
                </>
              )}
              <div id="faqs">
                {trip.faqs && trip.faqs.length > 1 && <TripFaqs trip={trip} />}
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:flex">
            <div>
              <PricingCardSidebar
                title={trip.title}
                price={trip.price}
                maxPrice={trip.price * 0.2}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
