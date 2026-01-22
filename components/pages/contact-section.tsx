"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <div className="w-full">
      {/* HERO (keep this as it is) */}
      <section className="relative h-[320px] w-full overflow-hidden">
        <img
          src="/images/contact-hero.jpg"
          alt="WalkThrough Nepal - Mountains"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Contact Us
            </h1>
            <p className="mt-2 text-white/90 max-w-2xl">
              Turn your travel dreams into unforgettable memories — reach out to
              plan your next Nepal adventure.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT + FORM */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
          {/* LEFT: Title + Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs tracking-wide text-muted-foreground">
                Find Our Office
              </p>
              <h2 className="mt-2 text-3xl font-bold leading-tight">
                Contact with <br className="hidden sm:block" /> the team
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-sm">
                Have questions about destinations, trekking plans, or local
                guides? Send us a message — we&apos;ll respond soon.
              </p>
            </div>

            <ContactInfo
              icon="📍"
              label="Location"
              value={"Lakeside, Pokhara\nNepal"}
            />

            <ContactInfo
              icon="📞"
              label="Phone No."
              value={"+977 9855227435 (Nepal)\n+1 98X XXX XXXX (USA)"}
            />

            <ContactInfo
              icon="✉️"
              label="Email"
              value={"info@walkthroughnepal.com\nwalkthroughnepal@gmail.com"}
            />
          </div>

          {/* RIGHT: Form Card */}
          <Card className="shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6 md:p-8">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Submitted.");
                }}
              >
                {/* row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Your Name</label>
                    <Input
                      placeholder="Full name"
                      className="focus-visible:ring-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Your Email</label>
                    <Input
                      placeholder="you@email.com"
                      type="email"
                      className="focus-visible:ring-2"
                    />
                  </div>
                </div>

                {/* row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      placeholder="+977 98xxxxxxxx"
                      className="focus-visible:ring-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      placeholder="Trip inquiry / Support / Partnership"
                      className="focus-visible:ring-2"
                    />
                  </div>
                </div>

                {/* row 3 */}
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us your travel plan (dates, region, interests)..."
                    className="min-h-[130px] focus-visible:ring-2"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
          <CardContent className="p-0">
            <iframe
              title="Map - Thamel Kathmandu"
              className="w-full h-[320px] md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Thamel%20Kathmandu&output=embed"
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ContactInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 items-start transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm p-2 rounded-md">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {value}
        </p>
      </div>
    </div>
  );
}
