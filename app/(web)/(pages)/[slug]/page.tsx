import ContactSection from "@/components/pages/contact-section";
import AboutSection from "@/components/pages/about-section";
import TeamSection from "@/components/pages/team-section";
import Package from "@/components/pages/package";
import type { PackageData } from "@/components/pages/package";

async function fetchPackageData(slug: string): Promise<PackageData | null> {
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://api.hinepaltreks.com/api/packages";
    const endpoint = `${API_BASE}/${slug}`;
    const response = await fetch(endpoint, { next: { revalidate: 60 } });

    if (!response.ok) return null;

    const result = await response.json();

    const pkg =
      result.data?.package || result.data?.[0] || result.data || result;
    if (!pkg || !pkg.title) return null;

    return {
      id: pkg.id ?? 0,
      title: pkg.title ?? "",
      slug: pkg.slug ?? slug,
      shortDescription: pkg.shortDescription ?? "",
      fullDescription: pkg.fullDescription ?? pkg.description ?? "",
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
      locations: Array.isArray(pkg.locations) ? pkg.locations : [],
      keywords: Array.isArray(pkg.keywords) ? pkg.keywords : [],
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
      exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
      price: pkg.price ?? 0,
      duration: pkg.duration ?? "",
      guestCapacity: pkg.guestCapacity ?? 0,
      images: Array.isArray(pkg.images) ? pkg.images : [],
      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
      meetingPoint: pkg.meetingPoint ?? "",
      dropOffPoint: pkg.dropOffPoint ?? "",
      whatToBring: Array.isArray(pkg.whatToBring) ? pkg.whatToBring : [],
      additionalInfo: Array.isArray(pkg.additionalInfo)
        ? pkg.additionalInfo
        : [],
      difficultyLevel: pkg.difficultyLevel ?? "",
      faqs: Array.isArray(pkg.faqs) ? pkg.faqs : [],
      averageRating: pkg.averageRating ?? 0,
      reviewCount: pkg.reviewCount ?? 0,
    } as PackageData;
  } catch {
    return null;
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  if (slug === "contact") return <ContactSection />;
  if (slug === "about") return <AboutSection />;
  if (slug === "team") return <TeamSection />;

  const packageData = await fetchPackageData(slug);

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <p className="text-muted-foreground">
            The package &quot;{slug}&quot; could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return <Package data={packageData} />;
}
