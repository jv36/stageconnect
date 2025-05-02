'use client';

import { useEventStore } from '@/store/useEventStore';
import { useParams } from 'next/navigation';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

export default function EventPage() {
  const { id } = useParams();
  const event = useEventStore((state) => state.selectedEvent);

  const [open, setOpen] = useState(false);  // State to control modal visibility

  if (!event) {
    return <p>Loading or no event data available.</p>;
  }

  const handleSeatmap = () => {
    setOpen(true);  // Open the modal
  };

  const handleClose = () => {
    setOpen(false);  // Close the modal
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-start min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 w-full max-w-[600px] mx-auto items-start">
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
            maxWidth: '600px',
          }}
        />
        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="h5" fontWeight={500}>
            {event.date}
          </Typography>
          <Typography variant="h5" fontWeight={500}>
            {event.location}
          </Typography>
        </Box>
        <Stack padding={2} borderRadius={2} bgcolor="teal">
          <Typography>12 people are going</Typography>


        </Stack>
        <Stack display="flex" flexDirection="row">
          <Button>I'M GOING!</Button>
          <Button>GROUP CHAT</Button>
          <Button onClick={handleSeatmap}>SEATMAP</Button>
        </Stack>
      </main>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Image
            src={event.seatmap}  // Use a placeholder if no seatmap
            alt="Seatmap"
            width={600}
            height={400}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
