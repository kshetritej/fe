"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="w-full">
      {/* =======================
          1) HERO (Image + Overlay)
      ======================= */}
      <section className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
        <img
          src="/images/contact-hero.jpg"
          alt="Walkthrough Nepal - About Us"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-10 md:pb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              About Us
            </h1>
            <p className="mt-3 text-white/90 max-w-2xl text-sm md:text-base">
              Turn your travel dreams into unforgettable memories. We connect
              travelers with trusted local guides and authentic experiences
              across Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* =======================
          2) OUR STORY
      ======================= */}
      <section className="bg-[#fbf7ef]">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Our Story</h2>
            <div className="mx-auto mt-2 h-[2px] w-16 bg-foreground/30" />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left text */}
            <div>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                Born from a love for Nepal’s mountains, culture, and local
                hospitality, Walkthrough Nepal was created to make travel
                planning simple and trustworthy.
                <br />
                <br />
                We work with verified local guides and suppliers so travelers
                can explore iconic trekking routes, vibrant cities, and hidden
                cultural gems—safely, comfortably, and with genuine local
                insight.
              </p>

              <Button className="mt-6">Discover Our Trips</Button>
            </div>

            {/* Right images (3 rounded rectangles) */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
              <StoryImage src="/images/story-1.jpg" alt="Local guide" />
              <StoryImage src="/images/story-2.jpg" alt="Nepal culture" />
              <StoryImage src="/images/story-3.jpg" alt="Himalayan trek" />
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          3) WHO WE ARE
      ======================= */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold">Who We Are</h2>
        <div className="mt-2 h-[2px] w-16 bg-foreground/30" />

        <div className="mt-6 space-y-3 text-sm md:text-base text-foreground/80 leading-relaxed">
          <p>
            At Walkthrough Nepal, we elevate the travel experience by combining
            local expertise with reliable planning. Our focus is to help
            travelers explore Nepal with confidence—whether it’s trekking, a
            cultural tour, or a wildlife adventure.
          </p>
          <p>
            We believe every journey should feel authentic, safe, and memorable.
            That’s why we work with trusted partners and highlight real
            experiences that represent Nepal genuinely.
          </p>
        </div>

        {/* Responsive grid: 1 col -> 2 cols -> 3 cols */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={MapPin}
            title="Expertise & Local Knowledge"
            desc="We work with local guides and trusted suppliers who know Nepal’s routes, culture, and safety requirements."
          />
          <FeatureCard
            icon={Compass}
            title="Personalized Trips"
            desc="From day tours in Pokhara to multi-day treks, we help match experiences with your interests, time, and comfort level."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Hassle-Free & Reliable"
            desc="Clear trip details, transparent inclusions/exclusions, and support throughout the journey for a smooth travel experience."
          />
        </div>
      </section>

      {/* =======================
          4) WHY US
      ======================= */}
      <section className="border-t bg-[#fbf7ef]">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold">
            Why Walkthrough Nepal?
          </h2>
          <div className="mt-2 h-[2px] w-16 bg-foreground/30" />

          <div className="mt-6 text-sm md:text-base text-foreground/80 leading-relaxed max-w-4xl">
            <p>
              We are passionate about delivering unforgettable journeys across
              Nepal—from Himalayan viewpoints and famous trekking trails to
              cultural heritage sites and wildlife experiences.
            </p>
            <p className="mt-3">
              Our goal is to make planning easy, keep experiences authentic, and
              ensure every traveler feels supported—from booking to the final
              drop-off.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ====== Small reusable parts ====== */

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="
        group
        h-[180px] w-[120px]
        sm:h-[220px] sm:w-[140px]
        md:h-[260px] md:w-[160px]
        overflow-hidden rounded-2xl border bg-white
        shadow-sm
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
      />
      {/* subtle top highlight on hover */}
      <div className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: React.ElementType;
}) {
  return (
    <Card
      className="
        group
        shadow-sm
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      <CardContent className="p-6">
        {/* Icon bubble + hover glow */}
        <div
          className="
            mb-4 flex h-11 w-11 items-center justify-center rounded-full
            bg-muted
            transition
            group-hover:scale-[1.03]
          "
        >
          <Icon className="h-5 w-5 text-foreground" />
        </div>

        <h3 className="font-semibold text-lg">{title}</h3>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>

        {/* tiny hover line to make it feel designed */}
        <div className="mt-5 h-[1px] w-0 bg-foreground/20 transition-all duration-300 group-hover:w-16" />
      </CardContent>
    </Card>
  );
}
