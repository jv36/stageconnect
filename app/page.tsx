'use client';
import SliderCarousel from "@/components/Carousel";
import allCountryCodes from "@/utils/countryCodes";
import { Box, Typography } from "@mui/material";
import { Bowlby_One } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from 'react';

const bowlbyOne = Bowlby_One({
  subsets: ['latin'],
  weight: '400',
});

function LoadingCarousel() {
  return <div>Loading concerts...</div>;
}

const classifications = ['Pop', 'Rock', 'Electronic', 'Classical', 'Alternative', 'Country', 'World', 'Metal', 'Rap', 'Jazz'];

function getRandomClassification(): string {
  const randomIndex = Math.floor(Math.random() * classifications.length);
  return classifications[randomIndex];
}

function getCurrentDateInUTCISO() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const day = now.getUTCDate().toString().padStart(2, '0');
  const hours = now.getUTCHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

function HomeContent() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  const currentCountryCode = 
    countryParam && allCountryCodes.some(c => c.code === countryParam)
      ? countryParam
      : 'CZ';

  const [genre, setGenre] = useState<string>('');
  const [genre2, setGenre2] = useState<string>('');

  useEffect(() => {
    let firstGenre = getRandomClassification();
    let secondGenre = getRandomClassification();

    while (secondGenre === firstGenre) {
      secondGenre = getRandomClassification();
    }

    setGenre(firstGenre);
    setGenre2(secondGenre);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Typography className="stage-logo" color="primary" variant="h4" style={{}}>StageConnect</Typography>
        
        
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography variant="h5" color="primary" fontWeight={600}>Popular in {currentCountryCode}</Typography>
          <Suspense fallback={<LoadingCarousel />}>
            <SliderCarousel
                requestParams={{
                  sort: 'relevance,desc',
                  countryCode: currentCountryCode,
                }}
              />
          </Suspense>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography variant="h5" color="primary" fontWeight={600}>Fancy a {genre} concert?</Typography>
          <Suspense fallback={<LoadingCarousel />}>
            <SliderCarousel
                requestParams={{
                  sort: 'random',
                  countryCode: currentCountryCode,
                  classificationName: genre
                }}
              />
          </Suspense>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography variant="h5" color="primary" fontWeight={600}>Most popular {genre2} concerts</Typography>
          <Suspense fallback={<LoadingCarousel />}>
            <SliderCarousel
                requestParams={{
                  sort: 'relevance,desc',
                  countryCode: currentCountryCode,
                  classificationName: genre2
                }}
              />
          </Suspense>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography variant="h5" color="primary" fontWeight={600} >What about some underground gems?</Typography>
          <Suspense fallback={<LoadingCarousel />} >
            <SliderCarousel
                requestParams={{
                  sort: 'relevance,asc',
                  countryCode: currentCountryCode,
                }}
              />
          </Suspense>
        </Box>

      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}