"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  Phone,
  Send,
  ChevronRight,
} from "lucide-react";

/* ================= TYPES ================= */

export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type AdditionalInfo = {
  title: string;
  description: string;
};

export type PackageData = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  locations: string[];
  keywords: string[];
  inclusions: string[];
  exclusions: string[];
  price: number;
  duration: string;
  guestCapacity: number;
  images: string[];
  itinerary: ItineraryItem[];
  meetingPoint: string;
  dropOffPoint: string;
  whatToBring: string[];
  additionalInfo: AdditionalInfo[];
  difficultyLevel: string;
  faqs: FAQ[];
  averageRating: number;
  reviewCount: number;
};

type TabType =
  | "overview"
  | "highlights"
  | "itinerary"
  | "includes"
  | "excludes"
  | "map"
  | "best-seasons"
  | "packing"
  | "faqs";

/* ================= TABS CONFIG ================= */

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
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

/* ================= MAIN COMPONENT ================= */

interface PackageProps {
  data: PackageData;
}

export default function Package({ data }: PackageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const primaryImage = data.images?.[0] || "/assets/mountain.jpg";

  // Calculate price range (example: base price and +30% for smaller groups)
  const basePrice = data.price || 264;
  const maxPrice = Math.round(basePrice * 1.31); // ~31% increase

  return (
    <div className="w-full min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
        <Image
          src={primaryImage}
          alt={data.title}
          fill
          priority
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-6 pb-8 md:pb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-white">
                  {data.averageRating > 0
                    ? data.averageRating.toFixed(1)
                    : "5.0"}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-green-500 text-green-500"
                    />
                  ))}
                </div>
              </div>
              <span className="text-white/90 text-sm">
                {data.reviewCount || 122}+ Reviews
                {data.reviewCount > 0 && " (Recommended by 100% of Travelers)"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT — Two Column Layout */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* LEFT COLUMN — Tabbed Content */}
          <div className="min-w-0">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-green-600 text-white shadow-sm hover:bg-green-700"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="prose prose-sm max-w-none">
              {activeTab === "overview" && (
                <OverviewTab data={data} />
              )}
              {activeTab === "highlights" && (
                <HighlightsTab data={data} />
              )}
              {activeTab === "itinerary" && (
                <ItineraryTab data={data} />
              )}
              {activeTab === "includes" && (
                <IncludesTab data={data} />
              )}
              {activeTab === "excludes" && (
                <ExcludesTab data={data} />
              )}
              {activeTab === "map" && <MapTab data={data} />}
              {activeTab === "best-seasons" && (
                <BestSeasonsTab data={data} />
              )}
              {activeTab === "packing" && <PackingTab data={data} />}
              {activeTab === "faqs" && <FAQsTab data={data} />}
            </div>
          </div>

          {/* RIGHT COLUMN — Static Pricing Sidebar */}
          <div className="lg:sticky lg:top-8 h-fit">
            <PricingSidebar
              price={basePrice}
              maxPrice={maxPrice}
              title={data.title}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= TAB COMPONENTS ================= */

function OverviewTab({ data }: { data: PackageData }) {
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

function HighlightsTab({ data }: { data: PackageData }) {
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

function ItineraryTab({ data }: { data: PackageData }) {
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

function IncludesTab({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        What's Included
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

function ExcludesTab({ data }: { data: PackageData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
        What's Excluded
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

function MapTab({ data }: { data: PackageData }) {
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

function BestSeasonsTab({ data }: { data: PackageData }) {
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

function PackingTab({ data }: { data: PackageData }) {
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
          <PackingCategory title="Clothing" items={["Base layers", "Insulating layers", "Outer shell", "Trekking pants", "Underwear", "Socks"]} />
          <PackingCategory title="Footwear" items={["Trekking boots", "Camp shoes", "Gaiters"]} />
          <PackingCategory title="Equipment" items={["Backpack", "Sleeping bag", "Headlamp", "Water bottles", "Trekking poles"]} />
          <PackingCategory title="Personal Items" items={["First aid kit", "Sunscreen", "Sunglasses", "Personal toiletries"]} />
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
          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronRight className="h-4 w-4 text-green-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQsTab({ data }: { data: PackageData }) {
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
          <p className="text-muted-foreground">No FAQs available at this time.</p>
        )}
      </div>
    </div>
  );
}

/* ================= PRICING SIDEBAR ================= */

function PricingSidebar({
  price,
  maxPrice,
  title,
}: {
  price: number;
  maxPrice: number;
  title: string;
}) {
  return (
    <Card className="sticky top-8 shadow-lg border-2 border-green-200/60">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Price Header */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              PRICE PER PERSON
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-green-700">${price}</span>
              <span className="text-xl text-muted-foreground line-through">
                ${maxPrice}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              (Price varies by group size)
            </p>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold shadow-sm"
              size="lg"
            >
              BOOK THIS TRIP
            </Button>
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-700 hover:bg-green-50 h-12 text-base font-semibold"
              size="lg"
            >
              <Send className="h-5 w-5" />
              SEND INQUIRY
            </Button>
          </div>

          <Separator />

          {/* Expert Contact */}
          <div>
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-700" />
              Speak to an Expert
            </p>
            <a
              href={`https://wa.me/9779841328947`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
            >
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-900">WhatsApp</p>
                <p className="text-xs text-green-700 truncate">
                  +977 9841328947
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-green-700 shrink-0" />
            </a>
          </div>

          <Separator />

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              Hassle Free Booking
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              Seamless Communication
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              Secure Payments
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              No Hidden Fees
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
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
