'use client';
import Carousel from "@/components/Carousel";
import allCountryCodes from "@/utils/countryCodes";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';

function LoadingCarousel() {
  return <div>Loading concerts...</div>; // Simple loading indicator
}

export default function Home() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  const currentCountryCode: string =
    countryParam && allCountryCodes.some(c => c.code === countryParam)
      ? countryParam
      : 'CZ';

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Typography variant="h5" color="primary" fontWeight={600}>Popular in {currentCountryCode}</Typography>
        <Suspense fallback={<LoadingCarousel />}>
          <Carousel countryCode={currentCountryCode} />
        </Suspense>

        <Typography variant="h5" color="primary" fontWeight={600}>Fancy a Pop concert?</Typography>
        <Suspense fallback={<LoadingCarousel />}>
          <Carousel countryCode={currentCountryCode} />
        </Suspense>

        <Typography variant="h5" color="primary" fontWeight={600} >Global Stars</Typography>
        <Suspense fallback={<LoadingCarousel />} >
          <Carousel countryCode={currentCountryCode} />
        </Suspense>

        <Typography variant="h5" color="primary" fontWeight={600}>Big Venues</Typography>
        <Suspense fallback={<LoadingCarousel />}>
          <Carousel countryCode={currentCountryCode} />
        </Suspense>
      </main>
    </div>
  );
}