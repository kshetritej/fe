import ShareBlog from "@/components/share-blog";
import { MyBreadCrumb } from "@/components/etbreadcrumb";
import { BlogRenderer } from "@/components/blog-renderer";
import TocCard from "@/components/toc-card";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LucideEye } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const param = await params;
  const slug = param.slug;

  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`;

  const response = await fetch(URL);
  const blog = await response.json();

  if (!response.ok) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  return {
    title: `${blog.metaTitle}`,
    description: blog.metaDescription || undefined,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription || undefined,
      images: blog.coverImage || [],
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogSingle({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const param = await params;
  const slug = param.slug;

  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`;
  const response = await fetch(URL);
  const blog = await response.json();

  if (!response.ok) {
    return notFound();
  }

  const breadcrumbItems = [{ label: "Home", href: "/" }];

  breadcrumbItems.push({ label: blog.title, href: "#" });

  return (
    <section className="pt-8 md:pt-4 pb-12 max-w-5xl mx-auto">
      <MyBreadCrumb items={breadcrumbItems} />
      <header className="border-b border-accent p-2">
        <h1 className="text-3xl md:text-5xl font-bold  leading-tight max-w-4xl">
          {blog?.title}
        </h1>
        <div className="flex justify-between gap-4 text-sm text-foreground w-full mt-4 items-center">
          <div className="flex items-center gap-8">
            <time className="flex items-center">
              Last Updated:{" "}
              {new Date(blog.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
          </div>
          <ShareBlog title={blog?.title} shareUrl={URL} />
        </div>
      </header>

      <div className="grid md:grid-cols-6 gap-8">
        <div className="col-span-4">
          <div>
            {/* Featured Image */}
            {blog.coverImage && (
              <Image
                src={blog?.coverImage}
                alt={blog?.imageAlt || blog?.title}
                height={1280}
                width={1920}
                className="w-full h-auto object-cover mb-8 rounded-lg p-2"
              />
            )}
            <BlogRenderer blog={blog?.content} />
          </div>
        </div>
        <TocCard />
      </div>
    </section>
  );
}
