// MyCard component
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';
import { useEventStore } from '@/store/useEventStore';

interface CardProps {
  card: {
    id: string;
    image: string;
    artist: string;
    location: string;
    date: string;
  };
}

export default function MyCard({ card }: CardProps) {
  const router = useRouter();
  const setSelectedEvent = useEventStore((state) => state.setSelectedEvent);

  const handleCardClick = () => {
    setSelectedEvent(card);
    router.push(`/event/${card.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
      <CardActionArea>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="140"
            image={card.image}
            alt="concert image"
            loading="lazy"
          />
        </Box>

        <CardContent>
          <Typography gutterBottom fontWeight="600" variant="h5" component="div">
            {card.artist}
          </Typography>
          <Typography fontWeight="light" component="div">
            {card.location}
          </Typography>
          <Typography fontWeight="500" component="div">
            {card.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
