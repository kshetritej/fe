import ContactSection from "@/components/pages/contact-section";
import AboutSection from "@/components/pages/about-section";
import TeamSection from "@/components/pages/team-section";

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

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">Try: /contact, /about, /team</p>
    </div>
  );
}
