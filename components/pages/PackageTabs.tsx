"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Sun,
  Car,
  Home,
  Ticket,
  XCircle,
  Mountain,
  Compass,
  Star,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import type { PackageData } from "./package";

type SectionId =
  | "overview"
  | "highlights"
  | "itinerary"
  | "includes"
  | "excludes"
  | "map"
  | "best-seasons"
  | "packing"
  | "faqs";

const SECTIONS: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <Mountain className="h-4 w-4" /> },
  {
    id: "highlights",
    label: "Highlights",
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: "itinerary",
    label: "Itinerary",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "includes",
    label: "Includes",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    id: "excludes",
    label: "Excludes",
    icon: <XCircle className="h-4 w-4" />,
  },
  { id: "map", label: "Map", icon: <MapPin className="h-4 w-4" /> },
  {
    id: "best-seasons",
    label: "Best Seasons",
    icon: <Sun className="h-4 w-4" />,
  },
  {
    id: "packing",
    label: "Packing",
    icon: <Compass className="h-4 w-4" />,
  },
  { id: "faqs", label: "FAQs", icon: <MessageCircle className="h-4 w-4" /> },
];

interface PackageTabsProps {
  data: PackageData;
}

export default function PackageTabs({ data }: PackageTabsProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      sectionRefs.current[id] = el;
    },
    []
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = SECTIONS.map((s) => s.id);

    sectionIds.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector(
      `[data-section="${activeSection}"]`
    );
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  const scrollToSection = (id: SectionId) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Section Navigation — sticky */}
      <div
        ref={navRef}
        className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border overflow-x-auto sticky top-0 bg-background z-10 pt-4"
      >
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            data-section={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                activeSection === section.id
                  ? "bg-green-600 text-white shadow-sm hover:bg-green-700"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }
            `}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* All Sections — visible, stacked vertically */}
      <div className="space-y-16">
        <div ref={setSectionRef("overview")}>
          <OverviewSection data={data} />
        </div>

        <div ref={setSectionRef("highlights")}>
          <HighlightsSection data={data} />
        </div>

        <div ref={setSectionRef("itinerary")}>
          <ItinerarySection data={data} />
        </div>

        <div ref={setSectionRef("includes")}>
          <IncludesSection data={data} />
        </div>

        <div ref={setSectionRef("excludes")}>
          <ExcludesSection data={data} />
        </div>

        <div ref={setSectionRef("map")}>
          <MapSection data={data} />
        </div>

        <div ref={setSectionRef("best-seasons")}>
          <BestSeasonsSection />
        </div>

        <div ref={setSectionRef("packing")}>
          <PackingSection data={data} />
        </div>

        <div ref={setSectionRef("faqs")}>
          <FAQsSection data={data} />
        </div>
      </div>
    </>
  );
}

/* ================= SECTION COMPONENTS ================= */

function OverviewSection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Overview of {data.title}
      </h2>
      <div
        className="text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data.fullDescription }}
      />

      {/* Summary Box */}
      <Card className="bg-green-50/50 border-green-200/60">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryItem
              icon={<Mountain className="h-5 w-5 text-green-700" />}
              label="Destination"
              value={data.title}
            />
            <SummaryItem
              icon={<Clock className="h-5 w-5 text-green-700" />}
              label="Duration"
              value={data.duration || "N/A"}
            />
            <SummaryItem
              icon={<Compass className="h-5 w-5 text-green-700" />}
              label="Trip Grade"
              value={data.difficultyLevel || "Moderate"}
            />
            <SummaryItem
              icon={<Calendar className="h-5 w-5 text-green-700" />}
              label="Start/End"
              value={`${data.meetingPoint || "Kathmandu"}/${data.dropOffPoint || "Kathmandu"}`}
            />
            <SummaryItem
              icon={<Sun className="h-5 w-5 text-green-700" />}
              label="Best Seasons"
              value="Spring (April-May) and Autumn (October-November)"
            />
            <SummaryItem
              icon={<Car className="h-5 w-5 text-green-700" />}
              label="Transport"
              value="Private Car/Flight"
            />
            <SummaryItem
              icon={<Home className="h-5 w-5 text-green-700" />}
              label="Accommodation"
              value="Teahouses/Lodges"
            />
            <SummaryItem
              icon={<Ticket className="h-5 w-5 text-green-700" />}
              label="Permits"
              value="Sagarmatha National Park Entry Permit, Khumbu Pasang Lhamu Rural Municipality Permit, TIMS Card"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HighlightsSection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Highlights of {data.title.split(" ")[0]} Trek
      </h2>
      <ul className="space-y-3">
        {data.highlights?.map((highlight, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors"
          >
            <span className="mt-0.5 h-2 w-2 rounded-full bg-orange-500 shrink-0" />
            <span
              className="text-muted-foreground flex-1"
              dangerouslySetInnerHTML={{ __html: highlight }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ItinerarySection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Itinerary
      </h2>
      <div className="space-y-6">
        {data.itinerary?.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 group hover:bg-muted/30 p-4 rounded-lg transition-colors"
          >
            <div className="flex flex-col items-center shrink-0">
              <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm group-hover:bg-green-700 transition-colors">
                {item.day}
              </div>
              {idx < (data.itinerary?.length || 0) - 1 && (
                <div className="w-0.5 h-full bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <div
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IncludesSection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        What&apos;s Included
      </h2>
      <ul className="space-y-3">
        {data.inclusions?.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 group hover:bg-green-50/50 p-3 rounded-lg transition-colors"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <span
              className="text-muted-foreground flex-1"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExcludesSection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        What&apos;s Excluded
      </h2>
      <ul className="space-y-3">
        {data.exclusions?.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 group hover:bg-red-50/50 p-3 rounded-lg transition-colors"
          >
            <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <span
              className="text-muted-foreground flex-1"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MapSection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Route Map
      </h2>
      <div className="bg-muted rounded-lg p-8 text-center text-muted-foreground border border-border">
        <MapPin className="h-12 w-12 mx-auto mb-4 text-green-600" />
        <p>Map visualization will be displayed here.</p>
        <p className="text-sm mt-2">
          Locations: {data.locations?.join(", ") || "N/A"}
        </p>
      </div>
    </div>
  );
}

function BestSeasonsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Best Seasons
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-green-50/50 rounded-lg border border-green-200/60">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Sun className="h-5 w-5 text-green-700" />
            Spring (April - May)
          </h3>
          <p className="text-muted-foreground text-sm">
            Ideal weather conditions with clear skies and moderate temperatures.
            Perfect for trekking with excellent mountain views.
          </p>
        </div>
        <div className="p-4 bg-green-50/50 rounded-lg border border-green-200/60">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Sun className="h-5 w-5 text-green-700" />
            Autumn (October - November)
          </h3>
          <p className="text-muted-foreground text-sm">
            Stable weather, clear visibility, and comfortable temperatures.
            Considered the best season for trekking in Nepal.
          </p>
        </div>
      </div>
    </div>
  );
}

function PackingSection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Packing List
      </h2>
      {data.whatToBring && data.whatToBring.length > 0 ? (
        <ul className="space-y-3">
          {data.whatToBring.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 group hover:bg-muted/50 p-3 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-3">
          <PackingCategory
            title="Clothing"
            items={[
              "Base layers",
              "Insulating layers",
              "Outer shell",
              "Trekking pants",
              "Underwear",
              "Socks",
            ]}
          />
          <PackingCategory
            title="Footwear"
            items={["Trekking boots", "Camp shoes", "Gaiters"]}
          />
          <PackingCategory
            title="Equipment"
            items={[
              "Backpack",
              "Sleeping bag",
              "Headlamp",
              "Water bottles",
              "Trekking poles",
            ]}
          />
          <PackingCategory
            title="Personal Items"
            items={[
              "First aid kit",
              "Sunscreen",
              "Sunglasses",
              "Personal toiletries",
            ]}
          />
        </div>
      )}
    </div>
  );
}

function PackingCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-4 bg-muted/30 rounded-lg border border-border">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ChevronRight className="h-4 w-4 text-green-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQsSection({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {data.faqs && data.faqs.length > 0 ? (
          data.faqs.map((faq, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-lg">{faq.question}</h3>
                <div
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">
            No FAQs available at this time.
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 group hover:bg-white/50 p-2 rounded transition-colors">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground mb-0.5">
          {label}
        </p>
        <p className="text-sm text-foreground leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
