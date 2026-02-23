import Link from "next/link";
import { TRIPS, type TripCard } from "@/components/data/itinerary/trips.mock";

export default function TreksPage() {
  return (
    <main className="w-full bg-white">
      <div className="mx-auto max-w-295 px-4 py-10 md:px-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Itineraries</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TRIPS.map((t: TripCard) => (
            <Link
              key={t.slug}
              href={`/treks/${t.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="h-36 rounded-xl bg-slate-100" />
              <div className="mt-4 text-sm font-bold text-slate-900">
                {t.title}
              </div>
              <div className="mt-2 text-sm text-slate-600">
                From {t.currencySymbol}
                {t.startingFrom.toLocaleString()} • {t.durationDays} Days
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
