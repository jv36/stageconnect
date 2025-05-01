'use client'

import React, { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import MyCard from "./MyCard"
import axios from "axios"
import { TextField } from "@mui/material" // Import TextField
import { Button } from "@mui/material"     // Import Button
import { Alert } from "@mui/material";

interface RawConcert {
  id: string;
  images: { url: string }[];
  name: string;
  _embedded: {
    venues: { name: string }[];
  };
  dates: {
    start: {
      localDate: string;
    };
  };
}

interface DisplayConcert {
  id: string;
  image: string;
  artist: string;
  location: string;
  date: string;
}

async function getConcerts(countryCode: string, page: number = 0, size: number = 10): Promise<RawConcert[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events?classificationName=music&countryCode=${countryCode}&page=${page}&size=${size}&apikey=${apiKey}`
    );
    return response.data?._embedded?.events || [];
  } catch (error) {
    console.error('Error fetching concerts:', error);
    return [];
  }
}


export default function Carousel({ countryCode }: { countryCode: string }) { // Receive countryCode as a prop
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [concertData, setConcertData] = useState<DisplayConcert[]>([]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 1,
      spacing: 8,
    },
    renderMode: "performance",
  })

  useEffect(() => {
    async function fetchInitialConcerts() {
      // Number of concerts to fetch
      const concerts = await getConcerts(countryCode, 0, 5);
      const formattedConcerts: DisplayConcert[] = concerts.map(concert => ({
        id: concert.id,
        image: concert.images?.[0]?.url || '/images/concerto.jpg',
        artist: concert.name,
        location: concert._embedded?.venues?.[0]?.name || 'Location not available',
        date: concert.dates?.start?.localDate || 'Date not available',
      }));
      setConcertData(formattedConcerts);
    }

    fetchInitialConcerts();
  }, [countryCode]);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = concertData.map((concert) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = concert.image;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
  
      await Promise.all(promises);
      setLoaded(true);
    };
  
    if (concertData.length > 0) {
      preloadImages();
    }
  }, [concertData]);
  

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [concertData]);  


  return (
    <>
    <div className="carousel-wrapper min-h-[200px]">
        <div ref={sliderRef} className="keen-slider">
          {concertData.map((card) => (
            <div className="keen-slider__slide" key={card.id}>
              <MyCard card={card} />
            </div>
          ))}
        </div>
    </div>

    {
    loaded && instanceRef.current && instanceRef.current.track.details && concertData.length > 0 && (
        <div className="dots">
          {Array.from({ length: instanceRef.current.track.details.slides.length }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={"dot" + (currentSlide === idx ? " active" : "")}
            ></button>
          ))}
        </div>
      )
    }

    

  </>
  );

}


