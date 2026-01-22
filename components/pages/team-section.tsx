"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Briefcase, Globe, Landmark, Mountain, Wallet } from "lucide-react";

/* ================= TYPES ================= */

type TeamCategory =
  | "Board of Directors"
  | "Trek Leaders"
  | "Operations & Support"
  | "Finance & Admin"
  | "International Representatives";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: TeamCategory;
  locationPill?: string;
  highlightPill?: string;
  bio: string;
  avatar: string;
};

/* ================= DATA ================= */

const TEAM: TeamMember[] = [
  {
    id: "b1",
    name: "Sam Aryal",
    role: "Founder",
    category: "Board of Directors",
    locationPill: "Kathmandu",
    highlightPill: "Since 2009",
    bio: "Leads the company vision and long-term partnerships with a strong focus on responsible tourism in Nepal.",
    avatar: "/images/team/boy-1.jpg",
  },
  {
    id: "b2",
    name: "Anna Rai",
    role: "Executive Director",
    category: "Board of Directors",
    locationPill: "Pokhara",
    highlightPill: "Operations Lead",
    bio: "Oversees daily operations, quality checks, and guest satisfaction across all travel experiences.",
    avatar: "/images/team/girl-3.jpg",
  },
  {
    id: "b3",
    name: "James Tamang",
    role: "Co-Founder",
    category: "Board of Directors",
    locationPill: "Kathmandu",
    highlightPill: "Route Planner",
    bio: "Designs trekking routes and travel packages with safety, comfort, and authenticity in mind.",
    avatar: "/images/team/boy-2.jpg",
  },

  {
    id: "t1",
    name: "Pemba Sherpa",
    role: "Senior Trek Leader",
    category: "Trek Leaders",
    locationPill: "Everest Region",
    highlightPill: "High Altitude",
    bio: "Expert in high-altitude trekking, acclimatization planning, and expedition safety.",
    avatar: "/images/team/boy-8.jpg",
  },
  {
    id: "t2",
    name: "Sita Gurung",
    role: "Trek Leader",
    category: "Trek Leaders",
    locationPill: "Annapurna",
    highlightPill: "Cultural Guide",
    bio: "Specializes in Annapurna trails and cultural storytelling with local communities.",
    avatar: "/images/team/girl-2.jpg",
  },
  {
    id: "t3",
    name: "Ramesh Tamang",
    role: "Nature & Hiking Guide",
    category: "Trek Leaders",
    locationPill: "Langtang",
    highlightPill: "Day Hikes",
    bio: "Leads scenic hikes and moderate treks focused on nature and wildlife experiences.",
    avatar: "/images/team/boy-3.jpg",
  },

  {
    id: "o1",
    name: "Anisha Shrestha",
    role: "Trip Coordinator",
    category: "Operations & Support",
    locationPill: "Kathmandu",
    highlightPill: "Bookings",
    bio: "Handles reservations, confirmations, itineraries, and traveler communication.",
    avatar: "/images/team/girl-1.jpg",
  },
  {
    id: "o2",
    name: "Bikash Karki",
    role: "Transport & Logistics",
    category: "Operations & Support",
    locationPill: "Pokhara",
    highlightPill: "Logistics",
    bio: "Manages transport coordination and ensures smooth trip operations.",
    avatar: "/images/team/boy-4.jpg",
  },

  {
    id: "f1",
    name: "Nirmala Rai",
    role: "Finance Officer",
    category: "Finance & Admin",
    locationPill: "Kathmandu",
    highlightPill: "Invoices",
    bio: "Manages billing, invoices, and supplier payment records.",
    avatar: "/images/team/girl-4.jpg",
  },
  {
    id: "f2",
    name: "Prakash Adhikari",
    role: "Admin & Compliance",
    category: "Finance & Admin",
    locationPill: "Kathmandu",
    highlightPill: "Compliance",
    bio: "Handles permits, documentation, and administrative compliance.",
    avatar: "/images/team/boy-5.jpg",
  },

  {
    id: "i1",
    name: "Kedar Aryal",
    role: "Operations Head – Australia",
    category: "International Representatives",
    locationPill: "Sydney",
    highlightPill: "Partnerships",
    bio: "Supports Australian travelers and international partnerships.",
    avatar: "/images/team/boy-6.jpg",
  },
  {
    id: "i2",
    name: "Paul Pradeep",
    role: "Trek Fitness Partner – India",
    category: "International Representatives",
    locationPill: "India",
    highlightPill: "Fitness",
    bio: "Provides fitness and trek preparation guidance for safer journeys.",
    avatar: "/images/team/boy-7.jpg",
  },
];

/* ================= META ================= */

const CATEGORY_META: Record<
  TeamCategory,
  { icon: React.ReactNode; subtitle: string }
> = {
  "Board of Directors": {
    icon: <Landmark className="h-4 w-4" />,
    subtitle: "Leadership & strategic direction",
  },
  "Trek Leaders": {
    icon: <Mountain className="h-4 w-4" />,
    subtitle: "Certified trekking & cultural guides",
  },
  "Operations & Support": {
    icon: <Briefcase className="h-4 w-4" />,
    subtitle: "Coordination & traveler support",
  },
  "Finance & Admin": {
    icon: <Wallet className="h-4 w-4" />,
    subtitle: "Finance, billing & compliance",
  },
  "International Representatives": {
    icon: <Globe className="h-4 w-4" />,
    subtitle: "International contacts & partners",
  },
};

const CATEGORIES = Object.keys(CATEGORY_META) as TeamCategory[];

/* ================= MAIN ================= */

export default function TeamSection() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
        <img
          src="/images/contact-hero.jpg"
          alt="Walkthrough Nepal Team"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-10 md:pb-14">
            <p className="text-xs tracking-wide text-white/80">
              WalkthroughNepal • Meet Our Team
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white">
              The people behind your Nepal experience
            </h1>
            <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base">
              Dedicated professionals working together to create meaningful
              journeys across Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-14 space-y-16">
        {CATEGORIES.map((category) => (
          <div key={category} className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                {CATEGORY_META[category].icon}
              </span>
              <h2 className="text-2xl font-bold">{category}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {CATEGORY_META[category].subtitle}
            </p>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEAM.filter((m) => m.category === category).map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ================= CARD ================= */

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          {/* BIGGER AVATAR */}
          <div className="relative h-20 w-20 shrink-0">
            <div className="absolute -inset-1 rounded-full bg-muted opacity-0 group-hover:opacity-100 transition" />
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              sizes="80px"
              className="relative rounded-full object-cover border"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-lg">{member.name}</span>
              {member.locationPill && (
                <Badge variant="outline" className="rounded-full text-xs">
                  {member.locationPill}
                </Badge>
              )}
              {member.highlightPill && (
                <Badge variant="secondary" className="rounded-full text-xs">
                  {member.highlightPill}
                </Badge>
              )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
      </CardContent>

      {/* soft top highlight */}
      <div className="pointer-events-none absolute top-0 left-0 h-10 w-full bg-gradient-to-r from-muted/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </Card>
  );
}
