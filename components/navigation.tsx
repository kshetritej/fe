// components/Navigation.tsx
// SERVER COMPONENT — no "use client", fetches data at request time

import Link from "next/link";
import { ChevronDown, Mail, Phone, Globe } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

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

// ─── Pure helpers ────────────────────────────────────────────────────────────

const hasChildren = (item: MenuItem) =>
  Array.isArray(item.children) && item.children.length > 0;

// ─── Desktop: Mega-menu dropdown (server JSX) ─────────────────────────────

function MegaMenu({ item }: { item: MenuItem }) {
  if (!hasChildren(item)) return null;

  return (
    // The dropdown is shown/hidden purely with CSS group-hover — zero JS
    <div className="absolute left-0 right-0 top-full w-screen max-w-full bg-white shadow-xl border-t border-gray-100 hidden group-hover:block z-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{item.label}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {item.children.map((child) => (
            <div key={child.id}>
              <div className="mb-4">
                {hasChildren(child) ? (
                  <span className="text-lg font-semibold text-gray-900 block pb-2 border-b-2 border-orange-600">
                    {child.label}
                  </span>
                ) : (
                  <Link
                    href={child.url || "#"}
                    className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors block pb-2 border-b-2 border-orange-600"
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
                        className="text-gray-700 hover:text-orange-600 transition-colors text-sm"
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

// ─── Desktop nav item (server JSX, CSS hover only) ───────────────────────────

function DesktopNavItem({ item }: { item: MenuItem }) {
  const dropdown = hasChildren(item);

  return (
    // `group` enables the CSS-only group-hover on MegaMenu
    <div className="relative group">
      {dropdown ? (
        <button className="flex items-center gap-1 px-4 py-3 font-semibold text-sm text-gray-900 hover:text-orange-600 group-hover:text-orange-600 transition-colors">
          {item.label}
          <ChevronDown
            size={16}
            className="transition-transform group-hover:rotate-180"
          />
        </button>
      ) : (
        <Link
          href={item.url || "#"}
          className="block px-4 py-3 font-semibold text-sm text-gray-900 hover:text-orange-600 transition-colors"
        >
          {item.label}
        </Link>
      )}

      {dropdown && <MegaMenu item={item} />}
    </div>
  );
}

// ─── Root server component ────────────────────────────────────────────────────

export async function Navigation() {
  const items = await fetchMenu();

  return (
    <nav className="bg-white">
      {/* Top bar */}
      <div className="bg-gray-900 text-white px-4 md:px-8 py-3 flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 text-xs md:text-sm">
        <a
          href="tel:+1234567890"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors"
        >
          <Phone size={16} />
          <span className="hidden sm:inline">+1 (234) 567-890</span>
        </a>
        <a
          href="mailto:info@example.com"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors"
        >
          <Mail size={16} />
          <span className="hidden sm:inline">info@example.com</span>
        </a>
        <button className="flex items-center gap-1 hover:text-orange-400 transition-colors">
          <Globe size={16} />
          <span className="hidden sm:inline">English</span>
        </button>
      </div>

      {/* Main bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Trek Guide</h1>
          </div>

          {/* Desktop menu — pure server JSX */}
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
