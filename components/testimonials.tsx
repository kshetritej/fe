import { satisfy } from "@/lib/font";
import { cn } from "@/lib/utils";
import TestimonialCard from "./testimonial-card";
import { Button } from "./ui/button";
import Image from "next/image";
import { ChevronRight, LucideCircle, LucideStar } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Will Hooton",
    review: `Annapurna Sanctuary-
    What an amazing experience, we trekked to Anapurna basecamp in middle of February and it was awesome. Definitely a bit snowy and icy so you will need crampons and there is no plastic so bring a water bottle and purification tablets.
    I loved this trip AJ the owner was super accommodating even booking the entire trip the night before and helping us explore more local areas, they really can make whatever trip you would like and are not pushy at all. Good value too.
    The trip itself was lovely, amazing views but lots of stairs, like a lot of stairs. Somedays I didn't know when they would end. If you don't like stairs look at some other treks, we chose this one because of the time of year but of course there were some highlights. Lespar was awesome and the last day towards Basecamp was incredible. I will come back with these guys to do Monasalu.
    Finally a huge shout out to our guide Krishna, he was a bloody legend start to finnish. So kind, genuine and sorted everything for us. Very knowledgeable and he felt like a genuine friend. 10/10 guide ☺️ We looked at a few companies but this was the best one in town for sure. Thankyou guys so much and thank you Krishna.`,
  },
  {
    name: "Swornim Mandal",
    review: `We had an amazing experience on our Annapurna Base Camp trek thanks to Sisir. He was incredibly supportive throughout the journey, always checking on us and making sure we were safe and comfortable. His knowledge of the trail, weather, and surroundings gave us a lot of confidence, especially on difficult days.

    What stood out the most was his attitude — always positive, patient, and eager to help with anything we needed. He didn’t just guide us to ABC, he made the whole journey enjoyable and stress-free. Highly recommend him and the agency to anyone planning this trek.`,
  },
  {
    name: "Lukas",
    review: `I had a wonderful 4-day trek with Essence Tours. They proposed a different route than the usual one, so we were on more natural trails and almost didn‘t see any other hikers in the first two days (which was great for me). I was very happy with the guide, Sujan. We had very interesting and funny conversations as well as good moments in silence. He chose only the best places for the nights and for food. He understood what was important to me (and what not), and was always concerned to make this trek a great experience to me. The nature, the breathtaking views and the perfect weather did the rest.`,
  },
  {
    name: "Genevieve Griffiths",
    review: `No words could describe how incredible our experience with Essence was. We showed up a day before booking our trek and had our private guide arranged within hours for a 12 day Annapurna Circuit trek from Chame to Ghorepani and Hille.
    Raj, our guide, was perfect - so experienced and knowledgeable with all things Altitude, Annapurna and Medical and such a fun person to get to know for the 12 days! We felt in very safe hands at all times and would highly highly recommend Essence to anyone looking to trek with experienced guides around Pokhara :)`,
  },
  {
    name: "Ali Marsland",
    review: `I really enjoyed my hike with Essence Tours. We started with sunrise at Sarangkot, which was a beautiful way to begin the day. Then we drove to Kande and walked up to Australian Camp. The trail was interesting and not too challenging, and the views from the top were absolutely worth it.

    We continued on through the peaceful Dhampus village, before heading back down. My guide, Santosh, was friendly, helpful, and kept a nice steady pace throughout. Overall, a lovely day out in nature with great scenery and just the right level of difficulty.`,
  },
  {
    name: "Nathan S.",
    review: `Woww!! What an amazing expérience !! We did 12 days Annapurna circuit, staying with perfect homestay, most spectacular mountain views of my life and our Guide Raji is perfect, with knowledge about Népal, geography, we really creat a funny and secure environment.`,
  },
  {
    name: "Gwyn O'Sullivan",
    review: `I came across essence trekking with no information they provided me with everything I needed, every step of the way. Everyone including guides porters and managers were so helpful. Not only professional yet great friends. I highly recommend essence tours and trekking for a variety of experiences in Nepal. Whatever you need, they’ve got you covered!`,
  },
  {
    name: "vuv won",
    reviews: `I recently completed the ABC (Annapurna Base Camp) trek with Essence Tours and Travel, and I couldn’t be more satisfied with the experience. From the very beginning, everything was handled with great care and professionalism.
    Ajay Raj, the manager, is an absolutely amazing person. He managed every detail perfectly – from permits and transportation to accommodations and overall coordination. His dedication and personal touch made the trip smooth and stress-free.
    Our guide Pukar was equally impressive – highly experienced, professional, and friendly. His knowledge of the trail, safety awareness, and supportive attitude added so much value to the trek.
    If you’re planning a trekking adventure in Nepal, I highly recommend Essence Tours and Travel. They are truly reliable and make sure your journey is memorable for all the right reasons`,
  },
];

export default function Testimonials() {
  return (
    <div className="bg-emerald-950 text-white my-12 py-12 px-4">
      <div
        className={cn(
          "text-xl md:text-2xl font-semibold text-primary text-shadow-2xs text-center",
          satisfy.className,
        )}
      >
        Happy Travellers
      </div>
      <div className="text-xl md:text-3xl text-center font-black uppercase">
        {" "}
        TRUSTED BY EXPLORERS
      </div>
      <div className="flex gap-4 max-w-7xl mx-auto overflow-x-scroll py-4">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name + index}
            name={testimonial.name}
            review={testimonial.review}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto py-8 flex justify-between flex-wrap gap-4">
        <div className="flex gap-8 flex-wrap">
          <Link
            href={
              "https://www.tripadvisor.ie/Attraction_Review-g293891-d34042144-Reviews-Essence_Treks-Pokhara_Gandaki_Zone_Western_Region.html"
            }
            target="_blank"
          >
            <div className="flex gap-4">
              <Image
                src={"/assets/tripadvisoricon.png"}
                width={50}
                height={100}
                alt=""
                className="object-contain"
              />
              <div>
                <p className="font-bold text-lg md:text-xl">Tripadvisor</p>
                <div className="flex gap-1 items-center font-bold">
                  {Array.from({ length: 5 }).map((_, l) => (
                    <LucideCircle
                      key={l}
                      fill="green"
                      className="size-4"
                      stroke="green"
                    />
                  ))}
                  Reviews 5/5
                </div>
              </div>
            </div>
          </Link>
          <Link
            href={
              "https://www.google.com/search?sca_esv=ae95eeef493796b7&sxsrf=ANbL-n7LBYQTXDVhf4DZYFqZtmmCtiS0eg:1773915236506&si=AL3DRZFIhG6pAqfNLal55wUTwygCG0fClF3UxiOmgw9Hq7nbWW69MEiZvU5e10x2mJ4gcivbI3k1hbjGYLhzGj-V2cm6KV2fnoNne5TGw9saosfyIF9gOofvJHEbem49cx5s80sWpCVz_pf71VEmfNsGGUuwCbhXOmvSVzLsX9eK7O-H8EYlWrd2P0NIYnI2YewziZckUBXc&q=Essence+Tours+and+Travels+%26+Treks+and+Expedition+Pvt.+LTD.+Reviews&sa=X&ved=2ahUKEwjYkKKc3auTAxV83TgGHYcrLMsQ0bkNegQIVRAH&biw=1462&bih=837&dpr=2"
            }
            target="_blank"
          >
            <div className="flex gap-4">
              <Image
                src={"/assets/googleicon.png"}
                width={50}
                height={100}
                alt=""
                className="object-contain"
              />
              <div>
                <p className="font-bold text-lg md:text-xl">Google</p>
                <div className="flex gap-1 items-center font-bold">
                  {Array.from({ length: 5 }).map((_, l) => (
                    <LucideStar
                      key={l}
                      fill="orange"
                      className="size-4"
                      stroke="orange"
                    />
                  ))}
                  Reviews 4.9/5
                </div>
              </div>
            </div>
          </Link>
        </div>
        <Button className="w-fit rounded-xs font-bold">
          More about us <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
