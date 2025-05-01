import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

interface CardProps {
    card: {
        id: number,
        image: string, 
        artist: string,
        location: string,
        date: string,
    };
}

export default function MyCard({ card }: CardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="140"
            image={card.image}
            alt="concert image"
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
