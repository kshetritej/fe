import { Outfit, Montserrat, Satisfy, Nunito_Sans } from "next/font/google";

export const outfit = Outfit({
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
});

export const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
});

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "600", "500", "200", "1000"],
});
