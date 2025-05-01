'use client';

import { useEventStore } from '@/store/useEventStore';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Image from 'next/image';

export default function EventPage() {
  const { id } = useParams();
  const event = useEventStore((state) => state.selectedEvent);

  if (!event) {
    return <p>Loading or no event data available.</p>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-start justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
            <Typography variant='h4' fontWeight={600}>{event.artist}</Typography>
            <Image
  src={event.image}
  alt={event.artist}
  width={0}
  height={0}
  sizes="100vw"
  className="w-full h-auto"
  style={{
    objectFit: 'cover',
  }}
/>

          </main>
        </div>

  );
}