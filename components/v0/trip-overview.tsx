import { TripData } from "@/app/types/trip-data";
import {
  LucideClock,
  LucideGauge,
  LucideUsers,
  LucideMapPin,
  LucideIcon,
  LucideMountain,
  LucideTentTree,
  LucideMap,
  LucideStar,
} from "lucide-react";
import PricingCardSidebar from "../card/pricing-card";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import TripAdvisorRatingBadge from "../tripadvisor-rating-badge";

interface TripOverviewProps {
  trip: TripData;
}
export function TripOverview({ trip }: TripOverviewProps) {
  return (
    <div id="overview" className="space-y-8 mt-4">
      {/* AT A GLANCE Section */}
      <div>
        <div className="font-bold mb-2">AT A GLANCE</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary/10 p-4 rounded-sm">
          {/* Duration */}
          <GlanceItem
            text="Duration"
            icon={LucideClock}
            value={trip.duration}
          />
          <GlanceItem
            text="Trip Grade"
            icon={LucideGauge}
            value={trip.difficultyLevel}
          />
          <GlanceItem
            text="Group Size"
            icon={LucideUsers}
            value={String(trip.guestCapacity) ?? "-"}
          />
          <GlanceItem
            text="Start"
            icon={LucideMapPin}
            value={trip.meetingPoint ?? "-"}
          />
          <GlanceItem
            text="End"
            icon={LucideMapPin}
            value={trip.dropOffPoint ?? "-"}
          />
          <GlanceItem
            text="Max Altitude"
            icon={LucideMountain}
            value={trip.maximumAltitude ?? "-"}
          />
          <GlanceItem
            text="Accommodations"
            icon={LucideTentTree}
            value={trip.accommodations.join(", ") ?? "-"}
          />
          <GlanceItem
            text="Locations"
            icon={LucideMap}
            value={trip.locations.join(", ") ?? "-"}
          />
        </div>
      </div>

      <div className="md:hidden">
        <PricingCardSidebar
          price={trip.price}
          maxPrice={trip.price * 0.2}
          title={trip.title}
        />
      </div>
    </div>
  );
}

function GlanceItem({
  icon: Icon,
  text,
  value,
}: {
  icon: LucideIcon;
  text: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="size-8" strokeWidth={1} />
      <div>
        <p className="text-slate-600 text-sm font-medium">{text}</p>
        <p className="font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
