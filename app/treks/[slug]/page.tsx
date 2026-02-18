import { notFound } from "next/navigation";
import Package from "@/components/pages/package";
import type { PackageData } from "@/components/pages/package";

const API_BASE = "https://api.hinepaltreks.com/api/packages";

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapApiToPackageData(pkg: any, slug: string): PackageData {
  return {
    id: pkg.id ?? 0,
    title: pkg.title ?? "",
    slug: pkg.slug ?? slug,
    shortDescription: pkg.shortDescription ?? "",
    fullDescription: pkg.overview ?? pkg.fullDescription ?? "",
    highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
    highlightsHtml:
      typeof pkg.highlights === "string" ? pkg.highlights : undefined,
    locations: Array.isArray(pkg.locations) ? pkg.locations : [],
    keywords: Array.isArray(pkg.keywords) ? pkg.keywords : [],
    inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
    exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
    price: pkg.price ?? 0,
    duration: typeof pkg.duration === "number" ? `${pkg.duration} Days` : (pkg.duration ?? ""),
    guestCapacity: pkg.guestCapacity ?? 0,
    images: pkg.banner
      ? [pkg.banner, ...(Array.isArray(pkg.images) ? pkg.images : [])]
      : Array.isArray(pkg.images)
        ? pkg.images
        : [],
    itinerary: Array.isArray(pkg.itinerary)
      ? pkg.itinerary
      : Array.isArray(pkg.altitudeInfo)
        ? pkg.altitudeInfo.map((item: any, idx: number) => ({
            day: item.day ?? idx + 1,
            title: item.title ?? item.place ?? `Day ${idx + 1}`,
            description:
              item.description ?? item.altitude ?? item.detail ?? "",
          }))
        : [],
    meetingPoint: pkg.meetingPoint ?? "",
    dropOffPoint: pkg.dropOffPoint ?? "",
    whatToBring: Array.isArray(pkg.whatToBring) ? pkg.whatToBring : [],
    additionalInfo: Array.isArray(pkg.additionalInfo)
      ? pkg.additionalInfo
      : [],
    difficultyLevel: pkg.tripGrade ?? pkg.difficultyLevel ?? "",
    faqs: Array.isArray(pkg.faqs) ? pkg.faqs : [],
    faqsHtml:
      typeof pkg.goodtoknow === "string" ? pkg.goodtoknow : undefined,
    averageRating: pkg.averageRating ?? 0,
    reviewCount: pkg.reviewCount ?? 0,
    banner: pkg.banner ?? "",
    bestSeason: pkg.bestSeason ?? "",
    accommodation: pkg.accommodation ?? "",
    transportation: pkg.transportation ?? "",
    tripGrade: pkg.tripGrade ?? "",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

async function fetchPackage(slug: string): Promise<PackageData | null> {
  try {
    const res = await fetch(`${API_BASE}/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();

    if (json.status !== "success" || !json.data?.package) return null;

    const pkg = json.data.package;
    if (!pkg || !pkg.title) return null;

    return mapApiToPackageData(pkg, slug);
  } catch {
    return null;
  }
}

export default async function TrekPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const packageData = await fetchPackage(slug);

  if (!packageData) {
    notFound();
  }

  return <Package data={packageData} />;
}
