import { TripData } from "@/app/types/trip-data";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  LucideBookText,
  LucideChevronDown,
  LucideChevronUp,
  LucideCircle,
  LucideClock,
  LucideHandPlatter,
  LucideMinus,
  LucideRulerDimensionLine,
  LucideTent,
} from "lucide-react";

interface TripItineraryProps {
  trip: TripData;
}

export function TripItinerary({ trip }: TripItineraryProps) {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(trip.shortDescription),
          }}
        />
        <div
          id="highlights"
          className=" w-full
            prose-li:before:mask-[url('/icons/highlight.png')]
            prose-li:before:rotate-360
             "
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(trip.highlights[0]),
          }}
        />
        <div
          id="intro"
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(trip.fullDescription),
          }}
        />
      </div>
      <div id="itinerary" className="pb-4">
        <h2 className="font-bold flex gap-2 items-center">
          <LucideBookText className="size-8 text-primary" /> Detailed Itinerary
        </h2>
        <Accordion
          type="single"
          collapsible
          defaultValue="1"
          className="border-l-2 border-dashed border-primary px-4 py-0 my-0"
        >
          <div className="flex flex-col gap-1 ">
            {trip.itinerary.map((day, index) => (
              <AccordionItem
                key={index}
                value={index.toString()}
                className="relative"
              >
                <LucideCircle className="absolute top-7.5 -ml-6.5  size-4 fill-white stroke-primary" />
                <AccordionTrigger className="font-bold text-md p-0 m-0 flex items-center justify-between prose-h3:p-0 prose-h3:m-0 prose-h3:leading-0 hover:no-underline">
                  <h3 className="flex items-center gap-4">{day.title}</h3>
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: day.description }}
                  />

                  {(day?.duration ||
                    (day?.accommodations && day.accommodations?.length > 0) ||
                    day?.ascent ||
                    day?.descent ||
                    day?.distance ||
                    (day?.meals && day.meals?.length > 0)) && (
                    <div className="grid grid-cols-2 gap-1 bg-primary/20 p-2 rounded-sm space-y-1.5 my-4">
                      {day?.duration && (
                        <div className="flex gap-1 items-center">
                          <LucideClock />{" "}
                          <span className="font-medium">Duration:</span>
                          {day.duration}
                        </div>
                      )}
                      {day?.distance && (
                        <div className="flex gap-1 items-center">
                          <LucideRulerDimensionLine />{" "}
                          <span className="font-medium">Distance:</span>
                          {day.distance}
                        </div>
                      )}
                      {day?.ascent && (
                        <div className="flex gap-1 items-center">
                          <LucideChevronUp />{" "}
                          <span className="font-medium">Ascent:</span>
                          {day.ascent}
                        </div>
                      )}
                      {day?.descent && (
                        <div className="flex gap-1 items-center">
                          <LucideChevronDown />{" "}
                          <span className="font-medium">Descent:</span>{" "}
                          {day.descent}
                        </div>
                      )}
                      {day.accommodations && day.accommodations?.length > 0 && (
                        <div className="flex flex-col items-start gap-1">
                          <div className="font-medium gap-1 flex items-center">
                            <LucideTent />
                            Accommodations:
                          </div>
                          <div className="flex gap-1">
                            <LucideMinus />
                            {day.accommodations.join(", ")}
                          </div>
                        </div>
                      )}
                      {day.meals && day.meals?.length > 0 && (
                        <div className="flex flex-col items-start gap-1">
                          <div className="font-medium gap-1 flex items-center">
                            <LucideHandPlatter />
                            Meals:
                          </div>
                          <div className="flex gap-1">
                            <LucideMinus />
                            {day.meals.join(", ")}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
