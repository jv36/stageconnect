'use client';

import MyCard from "./MyCard";
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const cardData = [
  {
    id: 1,
    image: '/images/concerto.jpg',
    artist: 'Kendrick Lamar',
    location: 'Estádio Cidade de Coimbra, Coimbra',
    date: '02 de Maio de 2025',
  },
  {
    id: 2,
    image: '/images/concerto.jpg',
    artist: 'Fontaines D.C.',
    location: 'Parque da Cidade, Porto',
    date: '15 de Junho de 2025',
  },
  {
    id: 3,
    image: '/images/concerto.jpg',
    artist: 'The Murder Capital',
    location: 'Auditório CCOP, Porto',
    date: '20 de Julho de 2025',
  },
];

export default function Carousel() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
      slides: {
        perView: 1,
        spacing: 16,
      },
    });
  
    return (
      <div ref={sliderRef} className="keen-slider">
        {cardData.map((card) => (
          <div className="keen-slider__slide" key={card.id}>
            <MyCard card={card} />
          </div>
        ))}
      </div>
    );
  }