import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import {
  CheckCircle2,
  MessageCircle,
  Phone,
  ChevronRight,
  LucideSend,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
export default function PricingCardSidebar({
  price,
  maxPrice,
  title,
}: {
  price: number;
  maxPrice: number;
  title: string;
}) {
  return (
    <Card className="sticky top-16 border border-primary/60 rounded-sm">
      <CardContent className="">
        <div className="space-y-6">
          <p className="font-bold text-xl">{title}</p>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              PRICE PER PERSON
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">${price}</span>
              {/*<span className="text-xl text-muted-foreground line-through">
                ${maxPrice}
              </span>*/}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              (Price varies by group size)
            </p>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div>For questions or booking inquiries</div>
          <div className="space-y-3">
            <Link href={"/contact"}>
              <Button
                className="w-full h-12 text-base font-semibold shadow-sm"
                size="lg"
              >
                <LucideSend />
                Contact us
              </Button>
            </Link>
          </div>
          <Separator />
          {/* Expert Contact */}
          <div>
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              Speak to an Expert
            </p>
            <Link
              href={`https://wa.me/9779841328947`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3  bg-primary/5 hover:bg-primary/10 transition-colors group rounded-sm"
            >
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary/90">WhatsApp</p>
                <p className="text-xs text-primary/70 truncate">
                  {siteConfig.whatsAppNumber || "+977-9804148802"}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary/70 shrink-0" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
