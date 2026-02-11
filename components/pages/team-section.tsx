"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Briefcase,
  Globe,
  Landmark,
  MapPin,
  Mountain,
  Wallet,
} from "lucide-react";

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
  
    bio: "Leads the company vision and long-term partnerships with a strong focus on responsible tourism in Nepal.",
    avatar: "/images/team/boy-6.jpg",
  },
  {
    id: "b2",
    name: "Anna Rai",
    role: "Executive Director",
    category: "Board of Directors",
 
    bio: "Oversees daily operations, quality checks, and guest satisfaction across all travel experiences.",
    avatar: "/images/team/girl-3.jpg",
  },
  {
    id: "b3",
    name: "James Tamang",
    role: "Co-Founder",
    category: "Board of Directors",
    
    bio: "Designs trekking routes and travel packages with safety, comfort, and authenticity in mind.",
    avatar: "/images/team/boy-2.jpg",
  },

  {
    id: "t1",
    name: "Pemba Sherpa",
    role: "Senior Trek Leader",
    category: "Trek Leaders",

    bio: "Expert in high-altitude trekking, acclimatization planning, and expedition safety.",
    avatar: "/images/team/boy-8.jpg",
  },
  {
    id: "t2",
    name: "Sita Gurung",
    role: "Trek Leader",
    category: "Trek Leaders",
 
    bio: "Specializes in Annapurna trails and cultural storytelling with local communities.",
    avatar: "/images/team/girl-2.jpg",
  },
  {
    id: "t3",
    name: "Ramesh Tamang",
    role: "Nature & Hiking Guide",
    category: "Trek Leaders",
  
    bio: "Leads scenic hikes and moderate treks focused on nature and wildlife experiences.",
    avatar: "/images/team/boy-3.jpg",
  },

  {
    id: "o1",
    name: "Anisha Shrestha",
    role: "Trip Coordinator",
    category: "Operations & Support",
   
    bio: "Handles reservations, confirmations, itineraries, and traveler communication.",
    avatar: "/images/team/girl-1.jpg",
  },
  {
    id: "o2",
    name: "Bikash Karki",
    role: "Transport & Logistics",
    category: "Operations & Support",

    bio: "Manages transport coordination and ensures smooth trip operations.",
    avatar: "/images/team/boy-4.jpg",
  },

  {
    id: "f1",
    name: "Nirmala Rai",
    role: "Finance Officer",
    category: "Finance & Admin",
  
    bio: "Manages billing, invoices, and supplier payment records.",
    avatar: "/images/team/girl-4.jpg",
  },
  {
    id: "f2",
    name: "Prakash Adhikari",
    role: "Admin & Compliance",
    category: "Finance & Admin",
    
    bio: "Handles permits, documentation, and administrative compliance.",
    avatar: "/images/team/boy-5.jpg",
  },

  {
    id: "i1",
    name: "Kedar Aryal",
    role: "Operations Head – Australia",
    category: "International Representatives",
   
    bio: "Supports Australian travelers and international partnerships.",
    avatar: "/images/team/boy-1.jpg",
  },
  {
    id: "i2",
    name: "Paul Pradeep",
    role: "Trek Fitness Partner – India",
    category: "International Representatives",
 
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
    icon: <Landmark className="h-5 w-5" />,
    subtitle: "Leadership & strategic direction",
  },
  "Trek Leaders": {
    icon: <Mountain className="h-5 w-5" />,
    subtitle: "Certified trekking & cultural guides",
  },
  "Operations & Support": {
    icon: <Briefcase className="h-5 w-5" />,
    subtitle: "Coordination & traveler support",
  },
  "Finance & Admin": {
    icon: <Wallet className="h-5 w-5" />,
    subtitle: "Finance, billing & compliance",
  },
  "International Representatives": {
    icon: <Globe className="h-5 w-5" />,
    subtitle: "International contacts & partners",
  },
};

const CATEGORIES = Object.keys(CATEGORY_META) as TeamCategory[];

/* ================= HERO ================= */

const HERO_IMAGE = "/assets/team.jpg";

/* ================= MAIN ================= */

export default function TeamSection() {
  return (
    <div className="w-full">
      {/* HERO — Nepal mountain */}
      <section className="relative h-[380px] md:h-[480px] w-full overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Nepal Himalayas – Meet Our Team"
          fill
          priority
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-10 md:pb-16">
            
            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white tracking-tight">
              The people behind your experience
            </h1>
            <p className="mt-4 max-w-2xl text-white/95 text-sm md:text-base leading-relaxed">
              Dedicated professionals working together to create meaningful
              journeys across Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT — heading + line, then vertical profile rows */}
      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        {CATEGORIES.map((category) => {
          const members = TEAM.filter((m) => m.category === category);
          if (members.length === 0) return null;

          return (
            <div key={category} className="mb-16 last:mb-0">
              {/* Section heading + icon + separator */}
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-amber-700 bg-amber-50 border border-amber-200/80 transition-colors hover:bg-amber-100 hover:border-amber-300"
                  aria-hidden
                >
                  {CATEGORY_META[category].icon}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-800/90">
                    {category}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {CATEGORY_META[category].subtitle}
                  </p>
                </div>
              </div>
              <Separator className="mt-4 mb-0 h-px bg-border" />

              {/* Profile rows — image left, text right; separator between each */}
              <div className="divide-y divide-border">
                {members.map((member) => (
                  <ProfileRow key={member.id} member={member} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

/* ================= PROFILE ROW (reference layout) ================= */

function ProfileRow({ member }: { member: TeamMember }) {
  return (
    <div
      className="group grid grid-cols-1 md:grid-cols-[minmax(200px,280px)_1fr] gap-6 md:gap-10 py-8 md:py-10 first:pt-8 first:md:pt-10 transition-colors rounded-lg -mx-2 px-2 hover:bg-muted/40"
      role="article"
    >
      {/* Left: image */}
      <div className="relative aspect-[4/5] max-h-[320px] w-full md:max-w-[280px] overflow-hidden rounded-lg border border-border bg-muted shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-amber-200/50">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Right: name, title, bio */}
      <div className="flex flex-col justify-center min-w-0">
        <h3 className="text-xl md:text-2xl font-bold text-amber-800/90 transition-colors group-hover:text-amber-700">
          {member.name}
        </h3>
        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Briefcase className="h-4 w-4 shrink-0 text-amber-600/80" />
          {member.role}
        </p>
       
        <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
      </div>
    </div>
  );
}
