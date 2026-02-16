import ContactSection from "@/components/pages/contact-section";
import AboutSection from "@/components/pages/about-section";
import TeamSection from "@/components/pages/team-section";
import Package from "@/components/pages/package";
import { mockPackageData } from "@/components/pages/package-example";

// Next.js 15: params can be a Promise in dynamic routes, so we unwrap it using await
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

  // Package pages are accessed via their slug (e.g., /annapurna-circuit-trek)
  // Try to fetch package data for this slug
  
  return <Package data={mockPackageData} />;
}
