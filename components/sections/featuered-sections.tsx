import TripCard from "../card/trip-card";

export default async function FeaturedSections() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured?includeActivity=true`,
  );

  const data = await res.json();

  const featured = data?.data;
  console.log("Featured: ", featured);

  return (
    <div className="relative flex flex-col gap-4  justify-center container mx-auto mt-12 p-2">
      {featured.featuredTags.map((tag, index) => {
        return (
          <div key={index} className="space-y-4 min-h-[70vh]">
            <div className="text-3xl font-semibold"> {tag.name}</div>
            <p className="md:max-w-3xl text-xl">{tag.description}</p>
            <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tag.activity.map((activity: any, index: number) => (
                <div key={index}>
                  <TripCard key={activity.id} trip={activity} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
