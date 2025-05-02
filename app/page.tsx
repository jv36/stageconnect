'use client'
import Carousel from "@/components/Carousel";
import MyCard from "@/components/MyCard";
import allCountryCodes from "@/utils/countryCodes";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');

  // Determine the country code directly from the URL parameter,
  // defaulting to 'CZ' if no valid parameter is found.
  const currentCountryCode: string =
    countryParam && allCountryCodes.some(c => c.code === countryParam)
      ? countryParam
      : 'CZ';

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Typography variant="h5" color="primary" fontWeight={600}>Popular in {currentCountryCode}</Typography>
        <Carousel countryCode={currentCountryCode} />

        <Typography variant="h5" color="primary" fontWeight={600}>Fancy a Pop concert?</Typography>
        <Carousel countryCode={currentCountryCode} />

        <Typography variant="h5" color="primary" fontWeight={600} >Global Stars</Typography>
        <Carousel countryCode={currentCountryCode} />

        <Typography variant="h5" color="primary" fontWeight={600}>Big Venues</Typography>
        <Carousel countryCode={currentCountryCode} />
      </main>
    </div>
  );
}