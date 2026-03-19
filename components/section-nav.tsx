"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  LucideCheck,
  LucideCircleQuestionMark,
  LucideEye,
  LucideInfo,
  LucideMapPin,
  LucideStar,
  LucideWallpaper,
  LucideX,
} from "lucide-react";

// interface Section {
//   id: string;
//   label: string;
// }

// interface SectionNavigationProps {
//   sections: Section[];
// }

const sections = [
  { id: "overview", label: "Overview", icon: LucideWallpaper },
  { id: "highlights", label: "Highlights", icon: LucideStar },
  { id: "intro", label: "Introduction", icon: LucideEye },
  { id: "itinerary", label: "Itinerary", icon: LucideMapPin },
  { id: "inclusions", label: "Includes", icon: LucideCheck },
  { id: "exclusions", label: "Excludes", icon: LucideX },
  { id: "trip-info", label: "Trip Info", icon: LucideInfo },
  { id: "faqs", label: "Faqs", icon: LucideCircleQuestionMark },
];

export function SectionNavigation() {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [offsetTop, setOffsetTop] = useState(0);

  // Read navbar height ONCE and store as CSS-safe value
  useEffect(() => {
    const navbar = document.getElementById("site-navbar");
    if (navbar) {
      setOffsetTop(navbar.offsetHeight);
    }
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: `-${offsetTop}px 0px -50% 0px`,
        threshold: 0,
      },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, offsetTop]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - offsetTop - 8;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      className="sticky top-[var(--section-nav-top)] z-50 bg-white shadow-y-sm  border-y my-4 "
      style={
        {
          "--section-nav-top": `${offsetTop}px`,
        } as React.CSSProperties
      }
    >
      <nav className="container mx-auto">
        <div className="flex">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {sections.map(({ id, label, icon: Icon }) => (
              <Button
                variant={"ghost"}
                key={id}
                onClick={() => handleNavClick(id)}
                className={` text-base  whitespace-nowrap  transition-colors flex items-center gap-1  ${
                  activeSection === id
                    ? "border-gray-900 rounded-none bg-primary text-white py-2"
                    : "border-transparent text-gray-500 hover:text-gray-900 rounded-none py-2"
                }`}
              >
                {Icon && <Icon className="" />}
                {label}
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
