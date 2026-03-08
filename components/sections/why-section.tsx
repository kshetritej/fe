import Image from "next/image";

export default function WhySection() {
  return (
    <div className="relative min-h-[30vh] bg-gray-100 p-2 flex flex-col items-center  text-center justify-center">
      <Image
        height={200}
        width={200}
        src="/assets/everest.jpg"
        alt=""
        className="border-4 border-gray-200 absolute top-12 left-8 -rotate-12 hidden lg:block"
      />
      <Image
        height={100}
        width={100}
        src="/assets/everest.jpg"
        alt=""
        className="border-4 border-gray-200 absolute top-2 left-12 rotate-12 hidden lg:block"
      />
      <div className="max-w-3xl flex flex-col gap-1">
        <div className="text-primary">Access the Extraordinary</div>
        <div className="text-foreground text-3xl font-light">
          Curated Travel, Crafted for You
        </div>
        <div>
          We create seamless, personalized travel for explorers, culture
          enthusiasts, and adventure seekers. From weekend escapes to luxury
          cruises or bucket-list journeys, we handle every detail. Travel with
          ease, confidence, and a touch of wonder—wherever your dreams take you.
        </div>
      </div>
      <Image
        height={150}
        width={150}
        src="/assets/everest.jpg"
        alt=""
        className="border-4 border-gray-200 absolute top-12 right-8 -rotate-12 hidden lg:block"
      />
      <Image
        height={100}
        width={100}
        src="/assets/everest.jpg"
        alt=""
        className="border-4 border-gray-200 absolute top-2 left-12 rotate-12 hidden lg:block"
      />
    </div>
  );
}
