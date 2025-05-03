'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import MyCard from './MyCard';
import axios from 'axios';

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
  seatmap: {
    staticUrl: string;
  };
}

interface DisplayConcert {
  id: string;
  image: string;
  artist: string;
  location: string;
  date: string;
  seatmap: string;
}

interface SliderCarouselProps {
  requestParams: Record<string, string | number | undefined>;
}

async function getConcerts(params: Record<string, string | number | undefined>, page: number = 0, size: number = 5): Promise<RawConcert[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
    const baseUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&page=${page}&size=${size}`;
    const queryParams = new URLSearchParams();

    for (const key in params) {
      if (params[key] !== undefined) {
        queryParams.append(key, params[key]!.toString());
      }
    }

    const apiUrl = `${baseUrl}&${queryParams.toString()}`;

    const response = await axios.get(apiUrl);
    console.log('data for', params, response.data?._embedded?.events);
    return response.data?._embedded?.events || [];
  } catch (error) {
    console.error('Error fetching concerts for', params, error);
    return [];
  }
}

export default function SliderCarousel({ requestParams }: SliderCarouselProps) {
  const [concertData, setConcertData] = useState<DisplayConcert[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchInitialConcerts() {
      const concerts = await getConcerts(requestParams, 0, 10);
      const formattedConcerts: DisplayConcert[] = concerts.map((concert) => ({
        id: concert.id,
        image: concert.images?.[0]?.url || '/images/concerto.jpg',
        artist: concert.name,
        location: concert._embedded?.venues?.[0]?.name || 'Location not available',
        date: concert.dates?.start?.localDate || 'Date not available',
        seatmap: concert.seatmap?.staticUrl || '/images/seatmap.jpg',
      }));
      setConcertData(formattedConcerts);
    }

    fetchInitialConcerts();
  }, [requestParams]); // Re-fetch when requestParams change

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
      setIsLoaded(true);
    };

    if (concertData.length > 0) {
      preloadImages();
    }
  }, [concertData]);

  return (
    <div className="carousel-wrapper min-h-[200px]">
      {isLoaded && concertData.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={8}
          navigation={false}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => `<span class="${className} custom-swiper-bullet"></span>`,
          }}
          modules={[Pagination]}
          className="!overflow-visible"
        >
          {concertData.map((card) => (
            <SwiperSlide
              key={card.id}
              className="relative pb-8 flex items-center justify-center"
              style={{ minHeight: 'auto' }}
            >
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '0' }}>
                <MyCard card={card} />
              </div>
              <div className="swiper-pagination absolute bottom-0 left-0 w-full flex justify-center items-center"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Loading concerts...</p>
      )}
    </div>
  );
}