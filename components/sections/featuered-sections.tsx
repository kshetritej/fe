import TripCard from "../card/trip-card";

export default async function FeaturedSections() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/activity`);

  const data = await res.json();

  const trips = data?.data;

  return (
    <div className="relative flex flex-col gap-4  min-h-[70vh] justify-center container mx-auto mt-12 p-2">
      {/*<Image
        height={200}
        width={200}
        src="/assets/everest.jpg"
        alt=""
        className="border-4 border-gray-200 absolute top-4 right-8 -rotate-12"
      />*/}
      <div className="uppercase text-primary text-sm">
        travel design services
      </div>
      <div className="text-3xl font-semibold">
        Your Travel Dreams,
        <br />
        Professionally Tailored
      </div>
      <p className="max-w-2xl">
        Ready to explore without the stress? We craft adventures, getaways, and
        luxury cruises perfectly matched to your style. Whether you crave
        culture, thrills, or relaxation, we handle every detail for a seamless,
        unforgettable trip. Let’s plan your next journey.
      </p>
      {/*<Button className="w-fit">Learn More</Button>*/}
      <div className="grid  md:grid-cols-3 gap-4">
        {trips.map((trip: any, index: number) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
