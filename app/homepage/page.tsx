"use client";
import TourCard from "@/components/TourCard";
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  Heart,
  MapPin,
  Phone,
  Share2,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function HomePage() {
  const tours = [
    {
      id: 1,
      title: "Pokhara Adventure",
      description:
        "Explore lakes, mountains, and adventure activities in Pokhara.",
      image: "/assets/pokhara.jpg",
      duration: "5 Days",
      transport: "Tourist Bus",
      plan: "Family Friendly",
      rating: 4.8,
      price: 25000,
    },
    {
      id: 2,
      title: "Kathmandu Heritage Tour",
      description:
        "Discover UNESCO World Heritage cultural and historical sites.",
      image: "/assets/kathmandu12.jpg",
      duration: "3 Days",
      transport: "Private Vehicle",
      plan: "Family Friendly",
      rating: 4.6,
      price: 18000,
    },
    {
      id: 3,
      title: "Everest Region Trek",
      description:
        "Experience breathtaking Himalayan views and Sherpa culture.",
      image: "/assets/mountain.jpg",
      duration: "12 Days",
      transport: "Flight + Trek",
      plan: "Group Plan",
      rating: 4.9,
      price: 120000,
    },
  ];
  const featuredtours = [
    {
      id: 1,
      title: "Pokhara Adventure",
      description:
        "Explore lakes, mountains, and adventure activities in Pokhara.",
      image: "/assets/pokhara.jpg",
      duration: "5 Days",
      transport: "Tourist Bus",
      plan: "Family Friendly",
      rating: 4.8,
      price: 25000,
    },
    {
      id: 2,
      title: "Kathmandu Heritage Tour",
      description:
        "Discover UNESCO World Heritage cultural and historical sites.",
      image: "/assets/kathmandu12.jpg",
      duration: "3 Days",
      transport: "Private Vehicle",
      plan: "Family Friendly",
      rating: 4.6,
      price: 18000,
    },
    {
      id: 3,
      title: "Everest Region Trek",
      description:
        "Experience breathtaking Himalayan views and Sherpa culture.",
      image: "/assets/mountain.jpg",
      duration: "12 Days",
      transport: "Flight + Trek",
      plan: "Group Plan",
      rating: 4.9,
      price: 120000,
    },
    {
      id: 4,
      title: "Everest Region Trek",
      description:
        "Experience breathtaking Himalayan views and Sherpa culture.",
      image: "/assets/mountain.jpg",
      duration: "12 Days",
      transport: "Flight + Trek",
      plan: "Group Plan",
      rating: 4.9,
      price: 120000,
    },
    {
      id: 5,
      title: "Everest Region Trek",
      description:
        "Experience breathtaking Himalayan views and Sherpa culture.",
      image: "/assets/mountain.jpg",
      duration: "12 Days",
      transport: "Flight + Trek",
      plan: "Group Plan",
      rating: 4.9,
      price: 120000,
    },
  ];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="relative w-full h-[700px] shadow-xl shadow-blue-200">
        <Image
          src="/assets/homeimg2.jpg"
          alt="homeimg"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 px-4 flex flex-col items-center justify-center bg-black/40">
          <h1 className="text-3xl md:text-4xl mb-6 text-center text-white font-serif">
            Discover Your Next Trip!
          </h1>

          <div className="flex w-full max-w-xl bg-white rounded-xl overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Search trip destination..."
              className="flex-1 px-6 py-4 text-gray-700 outline-none"
            />
            <button className="px-8 bg-gray-400 text-white font-semibold hover:bg-gray-600 transition cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
          Explore Popular Cities of Nepal
        </h2>
        <p className="max-w-3xl text-gray-600 text-sm leading-relaxed ">
          Discover the beauty of Nepal’s most popular cities, from the vibrant
          streets of Kathmandu to the serene lakes of Pokhara. Plan your next
          adventure and create memories that last a lifetime.
        </p>
        <ul className="flex mt-10 gap-6 text-sm flex-wrap justify-center">
          <li className="border px-10 py-3 rounded-2xl border-blue-200 hover:bg-blue-200 duration-300 transition cursor-pointer ">
            Pokhara
          </li>
          <li className="border px-10 py-3 rounded-2xl border-blue-200 hover:bg-blue-200 duration-300 transition cursor-pointer ">
            Kathmandu
          </li>
          <li className="border px-10 py-3 rounded-2xl border-blue-200 hover:bg-blue-200 duration-300 transition cursor-pointer ">
            Bharatpur
          </li>
          <li className="border px-10 py-3 rounded-2xl border-blue-200 hover:bg-blue-200 duration-300 transition cursor-pointer ">
            Lalitpur
          </li>
          <li className="border px-10 py-3 rounded-2xl border-blue-200 hover:bg-blue-200 duration-300 transition cursor-pointer ">
            Annapurna Region
          </li>
          <li className="border px-10 py-3 rounded-2xl border-blue-200 hover:bg-blue-200 duration-300 transition cursor-pointer ">
            Everest Region (Khumbu)
          </li>
        </ul>
        <div className="relative w-full max-w-6xl h-[600px] mt-7 bg-black/40 flex flex-col items-center justify-end">
          <Image
            src="/assets/kathmandu.jpg"
            alt="ktm"
            fill
            className="object-cover "
          />
          <div className="absolute border bg-white translate-y-25 px-25 py-8 shadow-2xl">
            <h1 className="font-bold mb-2 text-5xl ">Kathmandu</h1>
            <p className="max-w-2xl ">
              Boudhanath Temple is one of the largest and most sacred Buddhist
              stupas in Kathmandu, known for its prayer flags, monasteries, and
              peaceful spiritual atmosphere.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-22">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">
          Popular Tour Packages
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-2 bg-blue-50 shadow-2xl">
        <div className="relative  w-full h-[650px]">
          <Image
            src="/assets/trending1.jpg"
            alt="Mount Everest Trek"
            fill
            className="object-cover p-10"
          />
        </div>

        <div className="flex flex-col justify-center bg-blue/90 p-10 space-y-5">
          <span className="w-fit px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-full">
            🔥 Trending Now
          </span>

          <h1 className="text-4xl font-serif font-bold">
            Mount Everest Base Camp Trek
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span>Khumbu Region, Nepal</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={18} className="text-yellow-500" />
            <span className="font-semibold">4.9</span>
            <span className="text-gray-500">(2,300+ reviews)</span>
          </div>
          <p className="text-gray-700 leading-relaxed max-w-xl">
            The Mount Everest Base Camp Trek is one of Nepal’s most iconic
            adventures, offering breathtaking Himalayan views, Sherpa culture,
            and unforgettable mountain landscapes.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <button className="px-8 py-3 bg-blue-200 text-gray-600 rounded-xl font-semibold hover:bg-blue-300 duration-300 transition cursor-pointer">
              Book Now
            </button>

            <button className="p-3 border rounded-full hover:bg-gray-100 hover:text-white duration-300 transition cursor-pointer">
              <Heart size={20} />
            </button>

            <button className="p-3 border rounded-full hover:bg-gray-100 transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">
              Featured Destinations
            </h1>
            <p className="text-gray-600 max-w-xl text-sm">
              Handpicked destinations showcasing Nepal’s most popular and
              unforgettable travel experiences, perfect for your next adventure.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full border hover:bg-blue-100 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full border hover:bg-blue-100 transition"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4"
        >
          {featuredtours.map((tour) => (
            <div key={tour.id} className="flex-shrink-0">
              <TourCard {...tour} />
            </div>
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-2 bg-gray-300 shadow-2xl">
        <div className="flex flex-col justify-center bg-blue/90 p-10 space-y-5">
          <h1 className="text-4xl font-serif font-bold">
            Smart City Tour Mobile App
          </h1>

          <p className="text-gray-700 leading-relaxed max-w-xl">
            Discover Nepal’s smart city tours at your fingertips! Our mobile app
            lets you explore top destinations, plan trips, and book tours
            seamlessly from your phone.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-200 text-gray-600 rounded-xl font-semibold hover:bg-blue-300 duration-300 transition cursor-pointer">
              <Apple size={20} />
              Download from iOS
            </button>

            <button className="flex items-center gap-2 px-6 py-3 bg-blue-200 text-gray-600 rounded-xl font-semibold hover:bg-blue-300 duration-300 transition cursor-pointer">
              <Phone size={20} />
              Download from Android
            </button>
          </div>
        </div>
        <div className="relative  w-full h-[650px]">
          <Image
            src="/assets/travel3.jpg"
            alt="Mount Everest Trek"
            fill
            className="object-cover p-10"
          />
        </div>
      </div>
      <div className="text-center py-20 bg-gray-100">
        <h1 className="text-4xl font-serif font-bold mb-4">
          Ready for Your Next Adventure?
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg">
          Explore Nepal’s most amazing destinations with our smart city tours.
          Plan your trips, book tours, and create unforgettable memories all in
          one place!!
        </p>
        <button className="mt-8 px-8 py-3 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-300 hover:text-gray-600 duration-300 transition cursor-pointer">
          Explore Now
        </button>
      </div>
    </section>
  );
}
