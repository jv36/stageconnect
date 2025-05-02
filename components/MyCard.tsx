// MyCard component
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, styled } from '@mui/material';
import { useEventStore } from '@/store/useEventStore';

interface CardProps {
  card: {
    id: string;
    image: string;
    artist: string;
    location: string;
    date: string;
    seatmap: string;
  };
}

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  color: '#FF9A00',
  fontWeight: 600,
  variant: 'h5',
  component: 'div',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem', // Adjust for smaller screens
  },
}));

export default function MyCard({ card }: CardProps) {
  const router = useRouter();
  const setSelectedEvent = useEventStore((state) => state.setSelectedEvent);

  const handleCardClick = () => {
    setSelectedEvent(card);
    router.push(`/event/${card.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, maxHeight: 300 }} onClick={handleCardClick}>
      <CardActionArea sx={{ backgroundColor: '#1B003A' }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden', // Clip the zoomed image
            height: 200, // Fixed height for all images
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Cover the entire box, may crop
              transform: 'scale(1)', // Initial scale
            }}
            image={card.image}
            alt="concert image"
            loading="lazy"
          />
        </Box>

        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}> {/* Flexbox for centering */}
          <ResponsiveTypography align="center">{card.artist}</ResponsiveTypography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}