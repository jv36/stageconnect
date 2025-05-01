'use client';

import { useEventStore } from '@/store/useEventStore';
import { useParams } from 'next/navigation';

export default function EventPage() {
  const { id } = useParams();
  const event = useEventStore((state) => state.selectedEvent);

  if (!event) {
    return <p>Loading or no event data available.</p>;
  }

  return (
    <div>
      <h1>{event.artist}</h1>
      <img src={event.image} alt={event.artist} />
      <p>{event.location}</p>
      <p>{event.date}</p>
    </div>
  );
}
