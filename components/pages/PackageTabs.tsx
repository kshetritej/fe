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
import type { PackageData, ItineraryItem } from "./package";

/* ================= FALLBACK CONTENT ================= */

const FALLBACK_OVERVIEW = `<p>The Annapurna Base Camp (ABC) Trek is one of Nepal's most iconic and rewarding Himalayan journeys. It takes you deep into the heart of the Annapurna region, bringing you face-to-face with some of the most magnificent snow-crowned peaks on Earth: Annapurna I (8,091 m), Machhapuchhre (6,993 m), Hiunchuli (6,441 m), and the surrounding Annapurna Himalayas.</p>
<p>In addition to breathtaking mountain views, this classic trail introduces you to the Gurung and Magar cultures, terraced fields, alpine scenery, rhododendron forests, and natural hot springs at Jhinu Danda.</p>
<p>Whether you're a beginner looking for your first Himalayan adventure or an experienced trekker craving a soulful mountain escape, the Annapurna Base Camp Trek is a life-changing experience. No technical climbing is involved, but proper acclimatization and fitness are essential for this moderately challenging trek.</p>`;

const FALLBACK_HIGHLIGHTS: string[] = [
  "Reach Annapurna Base Camp (4,130 m) surrounded by a stunning amphitheatre of peaks",
  "Visit Machhapuchhre Base Camp (3,700 m) with iconic views of Fishtail Mountain",
  "Explore the traditional Gurung village of Ghandruk and experience local culture",
  "Relax in the natural hot springs at Jhinu Danda",
  "Panoramic views of Annapurna South, Hiunchuli, and Machhapuchhre",
  "Trek through vibrant rhododendron and bamboo forests",
  "Walk alongside the Modi Khola river valley",
  "Diverse landscapes from subtropical lowlands to alpine glacial basins",
];

const FALLBACK_ITINERARY: ItineraryItem[] = [
  { day: 1, title: "Arrival in Kathmandu (1,400 m)", description: "Arrive in Kathmandu, hotel transfer, welcome briefing and trip preparation." },
  { day: 2, title: "Drive to Pokhara (820 m)", description: "Scenic drive or flight to the lakeside city of Pokhara. Evening at leisure." },
  { day: 3, title: "Drive to Nayapul, Trek to Ghandruk (1,940 m)", description: "Drive to Nayapul trailhead and trek through terraced fields to the traditional Gurung village of Ghandruk." },
  { day: 4, title: "Trek to Chhomrong (2,170 m)", description: "Descend to the Kimrong Khola and climb to Chhomrong, the gateway village to the Annapurna Sanctuary." },
  { day: 5, title: "Trek to Bamboo (2,310 m)", description: "Descend stone steps to the Chhomrong Khola and trek through dense rhododendron and bamboo forest to Bamboo." },
  { day: 6, title: "Trek to Dovan (2,580 m)", description: "Continue along the Modi Khola valley through lush forests to the settlement of Dovan." },
  { day: 7, title: "Trek to Machhapuchhre Base Camp (3,700 m)", description: "Ascend past Himalaya Hotel into alpine terrain. Arrive at MBC with close-up views of Fishtail Mountain." },
  { day: 8, title: "Trek to Annapurna Base Camp (4,130 m)", description: "Reach the glacial amphitheatre of ABC surrounded by Annapurna I, Annapurna South, Hiunchuli, and Machhapuchhre." },
  { day: 9, title: "ABC → Bamboo (2,310 m)", description: "Early morning sunrise at ABC. Descend back through MBC and Dovan to Bamboo." },
  { day: 10, title: "Trek to Jhinu Danda (1,780 m)", description: "Trek down to Jhinu Danda. Enjoy a relaxing soak in the natural hot springs by the Modi Khola river." },
  { day: 11, title: "Trek to Nayapul, Drive to Pokhara", description: "Final trek to Nayapul and drive to Pokhara. Leisure day by the lakeside." },
  { day: 12, title: "Pokhara to Kathmandu", description: "Drive or fly back to Kathmandu. Free time for sightseeing or shopping." },
  { day: 13, title: "Departure", description: "Final transfer to the airport. Departure from Kathmandu." },
];

const FALLBACK_INCLUSIONS: string[] = [
  "Airport transfers (arrival & departure)",
  "Annapurna Conservation Area Permit (ACAP)",
  "TIMS Card",
  "Teahouse accommodation (twin-sharing)",
  "Three meals per day during trek",
  "Licensed English-speaking guide",
  "Porter service (1 porter per 2 trekkers)",
  "First aid kit & emergency assistance",
  "Ground transport (Kathmandu–Pokhara & Nayapul transfers)",
  "Welcome and farewell dinners",
];

const FALLBACK_EXCLUSIONS: string[] = [
  "International airfare",
  "Nepal tourist visa fee",
  "Travel insurance (mandatory)",
  "Personal expenses (Wi-Fi, hot shower, charging, drinks)",
  "Alcoholic beverages",
  "Tips for guide and porter",
  "Extra nights outside itinerary",
  "Optional domestic flights",
];

const FALLBACK_MAP_LOCATIONS: string[] = [
  "Pokhara",
  "Nayapul",
  "Ghandruk",
  "Chhomrong",
  "Bamboo",
  "Dovan",
  "Machhapuchhre Base Camp",
  "Annapurna Base Camp",
  "Jhinu Danda",
];

function isPlaceholder(text: string): boolean {
  if (!text) return true;
  const lower = text.toLowerCase();
  return (
    lower.includes("&nbsp;") ||
    lower.includes("corporis") ||
    lower.includes("blanditiis") ||
    lower.includes("soluta eiusmo") ||
    lower.includes("lorem ipsum") ||
    text.trim().length < 20
  );
}

function hasRealArrayContent(arr: string[] | undefined): boolean {
  if (!arr || arr.length === 0) return false;
  return arr.length > 1 && !arr.some((item) => isPlaceholder(item));
}

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
  const description = isPlaceholder(data.fullDescription)
    ? FALLBACK_OVERVIEW
    : data.fullDescription;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Overview of {data.title}
      </h2>
      <div
        className="text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
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
              value={data.duration || "14 Days"}
            />
            <SummaryItem
              icon={<Compass className="h-5 w-5 text-green-700" />}
              label="Trip Grade"
              value={data.tripGrade || data.difficultyLevel || "Moderate"}
            />
            <SummaryItem
              icon={<Calendar className="h-5 w-5 text-green-700" />}
              label="Start/End"
              value={
                data.meetingPoint && data.dropOffPoint
                  ? `${data.meetingPoint} / ${data.dropOffPoint}`
                  : "Kathmandu / Pokhara"
              }
            />
            <SummaryItem 
              icon={<Sun className="h-5 w-5 text-green-700" />}
              label="Best Seasons"
              value={data.bestSeason || "Spring (March–May) and Autumn (September–November)"}
            />
            <SummaryItem
              icon={<Car className="h-5 w-5 text-green-700" />}
              label="Transport"
              value={data.transportation || "Private Car/Flight"}
            />
            <SummaryItem
              icon={<Home className="h-5 w-5 text-green-700" />}
              label="Accommodation"
              value={data.accommodation || "Teahouses/Lodges"}
            />
            <SummaryItem
              icon={<Ticket className="h-5 w-5 text-green-700" />}
              label="Permits"
              value="ACAP (Annapurna Conservation Area Permit), TIMS Card"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HighlightsSection({ data }: { data: PackageData }) {
  const hasHtml = data.highlightsHtml && data.highlightsHtml.trim().length > 20;
  const highlights = hasRealArrayContent(data.highlights)
    ? data.highlights
    : FALLBACK_HIGHLIGHTS;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Highlights of {data.title.split(" ")[0]} Trek
      </h2>
      {hasHtml ? (
        <div
          className="text-muted-foreground leading-relaxed prose prose-sm max-w-none prose-li:marker:text-orange-500"
          dangerouslySetInnerHTML={{ __html: data.highlightsHtml! }}
        />
      ) : (
        <ul className="space-y-3">
          {highlights.map((highlight, idx) => (
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
      )}
    </div>
  );
}

function ItinerarySection({ data }: { data: PackageData }) {
  const hasRealItinerary =
    data.itinerary &&
    data.itinerary.length > 2 &&
    !data.itinerary.some((item) => isPlaceholder(item.title));
  const itinerary = hasRealItinerary ? data.itinerary : FALLBACK_ITINERARY;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Itinerary
      </h2>
      <div className="space-y-6">
        {itinerary.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 group hover:bg-muted/30 p-4 rounded-lg transition-colors"
          >
            <div className="flex flex-col items-center shrink-0">
              <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm group-hover:bg-green-700 transition-colors">
                {item.day}
              </div>
              {idx < itinerary.length - 1 && (
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
  const inclusions = hasRealArrayContent(data.inclusions)
    ? data.inclusions
    : FALLBACK_INCLUSIONS;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        What&apos;s Included
      </h2>
      <ul className="space-y-3">
        {inclusions.map((item, idx) => (
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
  const exclusions = hasRealArrayContent(data.exclusions)
    ? data.exclusions
    : FALLBACK_EXCLUSIONS;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        What&apos;s Excluded
      </h2>
      <ul className="space-y-3">
        {exclusions.map((item, idx) => (
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
  const locations =
    data.locations && data.locations.length > 2
      ? data.locations
      : FALLBACK_MAP_LOCATIONS;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Route Map
      </h2>
      <div className="bg-muted/30 rounded-lg p-6 border border-border">
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Annapurna Base Camp Trek starts from Nayapul near Pokhara and follows the Modi Khola river valley through the traditional Gurung village of Ghandruk to Chhomrong — the gateway to the Annapurna Sanctuary. The trail continues through bamboo and rhododendron forests via Bamboo, Dovan, and Machhapuchhre Base Camp before reaching Annapurna Base Camp (4,130 m). The return route passes through Jhinu Danda with its natural hot springs before ending at Nayapul.
        </p>
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Key Locations
          </h3>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 rounded-full text-sm border border-green-200/60"
              >
                <MapPin className="h-3.5 w-3.5" />
                {loc}
              </span>
            ))}
          </div>
        </div>
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
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sun className="h-5 w-5 text-green-700" />
            Spring (March – May)
          </h3>
          <ul className="space-y-1.5 text-muted-foreground text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Blooming rhododendrons</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Clear mountain views</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Mild temperatures</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Most popular trekking season</li>
          </ul>
        </div>
        <div className="p-4 bg-green-50/50 rounded-lg border border-green-200/60">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sun className="h-5 w-5 text-green-700" />
            Autumn (September – November)
          </h3>
          <ul className="space-y-1.5 text-muted-foreground text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Best visibility</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Stable weather</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Crisp air after monsoon</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" /> Comfortable trekking conditions</li>
          </ul>
        </div>
        <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-200/60">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Mountain className="h-5 w-5 text-orange-700" />
            Winter (December – February)
          </h3>
          <ul className="space-y-1.5 text-muted-foreground text-sm">
            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-orange-600 shrink-0" /> Fewer crowds</li>
            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-orange-600 shrink-0" /> Cold temperatures</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-orange-600 shrink-0" /> Trail above MBC may be snow-covered</li>
          </ul>
        </div>
        <div className="p-4 bg-red-50/50 rounded-lg border border-red-200/60">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Monsoon (June – August)
          </h3>
          <ul className="space-y-1.5 text-muted-foreground text-sm">
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500 shrink-0" /> Heavy rainfall</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500 shrink-0" /> Landslide risk</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500 shrink-0" /> Poor visibility</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500 shrink-0" /> Not recommended</li>
          </ul>
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
              "Thermal base layers",
              "Down jacket",
              "Waterproof jacket & pants",
              "Trekking trousers",
              "Wool socks (4–5 pairs)",
              "Warm hat & gloves",
            ]}
          />
          <PackingCategory
            title="Footwear"
            items={["Waterproof trekking boots", "Camp sandals"]}
          />
          <PackingCategory
            title="Equipment"
            items={[
              "40–50L backpack",
              "Sleeping bag (–10°C rating)",
              "Trekking poles",
              "Headlamp",
              "Water bottles",
            ]}
          />
          <PackingCategory
            title="Personal Items"
            items={[
              "Sunscreen SPF 50+",
              "Sunglasses",
              "Toiletries",
              "First aid kit",
              "Altitude medication (if prescribed)",
            ]}
          />
          <PackingCategory
            title="Documents"
            items={[
              "Passport copies",
              "Permits (ACAP, TIMS)",
              "Travel insurance",
              "Nepalese cash",
              "Power bank",
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
  const hasHtml = data.faqsHtml && data.faqsHtml.trim().length > 20;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        Frequently Asked Questions
      </h2>
      {hasHtml ? (
        <Card>
          <CardContent className="pt-6">
            <div
              className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: data.faqsHtml! }}
            />
          </CardContent>
        </Card>
      ) : (
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
      )}
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
