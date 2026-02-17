import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Star,
  MessageCircle,
  Phone,
  Send,
  ChevronRight,
} from "lucide-react";
import PackageTabs from "./PackageTabs";

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

/* ================= MAIN COMPONENT (SERVER) ================= */

interface PackageProps {
  data: PackageData;
}

export default function Package({ data }: PackageProps) {
  const primaryImage = data.images?.[0] || "/assets/mountain.jpg";
  const basePrice = data.price || 264;
  const maxPrice = Math.round(basePrice * 1.31);

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
          {/* LEFT COLUMN — Tabbed Content (Client Component) */}
          <div className="min-w-0">
            <PackageTabs data={data} />
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
              <span className="text-3xl font-bold text-green-700">
                ${price}
              </span>
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
