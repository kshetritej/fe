import Link from "next/link";
import { ChevronDown, Mail, Phone, Globe } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { siteConfig } from "@/lib/siteConfig";
import Logo from "./logo";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
  parentId?: string | null;
  depth?: number;
};

type MenuData = {
  success: boolean;
  data: {
    items: MenuItem[];
    version: string;
    updatedAt: string;
  };
};

async function fetchMenu(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu`, {
      // Revalidate every 60 seconds (ISR-style). Use `cache: "no-store"` for always-fresh.
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data: MenuData = await res.json();
    return data?.data?.items ?? [];
  } catch {
    return [];
  }
}

const hasChildren = (item: MenuItem) =>
  Array.isArray(item.children) && item.children.length > 0;

// ─── Desktop: Mega-menu dropdown (server JSX) ─────────────────────────────

function MegaMenu({ item }: { item: MenuItem }) {
  if (!hasChildren(item)) return null;

  return (
    <div className="absolute left-0 right-0 top-full w-fit  bg-white shadow-xl border-t border-gray-100 hidden group-hover:block z-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{item.label}</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {item.children.map((child) => (
            <div key={child.id}>
              <div className="mb-4">
                {hasChildren(child) ? (
                  <span className="text-lg font-semibold text-gray-900 block pb-2 border-b-2 border-primary/60">
                    {child.label}
                  </span>
                ) : (
                  <Link
                    href={child.url || "#"}
                    className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors block pb-2 border-b-2 border-primary"
                  >
                    {child.label}
                  </Link>
                )}
              </div>
              {hasChildren(child) && (
                <ul className="space-y-3">
                  {child.children.map((subChild) => (
                    <li key={subChild.id}>
                      <Link
                        href={subChild.url || "#"}
                        className="text-gray-700 hover:text-primary transition-colors text-sm"
                      >
                        {subChild.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopNavItem({ item }: { item: MenuItem }) {
  const dropdown = hasChildren(item);

  return (
    <div className="relative group">
      {dropdown ? (
        <button className="flex items-center gap-1 px-4 py-3 font-semibold text-sm text-gray-900 hover:text-primary group-hover:text-primary transition-colors">
          {item.label}
          <ChevronDown
            size={16}
            className="transition-transform group-hover:rotate-180"
          />
        </button>
      ) : (
        <Link
          href={item.url || "#"}
          className="block px-4 py-3 font-semibold text-sm text-gray-900 hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      )}

      {dropdown && <MegaMenu item={item} />}
    </div>
  );
}

//Root server component
export async function Navigation() {
  const items = await fetchMenu();

  return (
    <nav className="bg-white">
      {/* Top bar */}
      <div className="bg-gray-900 text-white px-4 md:px-8 py-3 flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 text-xs md:text-sm">
        <Link
          href={siteConfig.phoneNumbers[0].phone!}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Phone size={16} />
          <span className="hidden sm:inline">
            {`tel:${siteConfig.phoneNumbers[0].phone}`}
          </span>
        </Link>
        <Link
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Mail size={16} />
          <span className="hidden sm:inline">info@example.com</span>
        </Link>
      </div>

      {/* Main bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {items.map((item) => (
              <DesktopNavItem key={item.id} item={item} />
            ))}
          </div>

          {/* Mobile menu — client island, receives pre-fetched items as props */}
          <MobileMenu items={items} />
        </div>
      </div>
    </nav>
  );
}
