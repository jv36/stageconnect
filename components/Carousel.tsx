'use client'

import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import MyCard from "./MyCard"

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
]

/*
https://app.ticketmaster.com/discovery/v2/events?classificationName=music&countryCode=PT&apikey=
*/

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

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
  })

  return (
    <div className="carousel-wrapper">
      <div ref={sliderRef} className="keen-slider">
        {cardData.map((card) => (
          <div className="keen-slider__slide" key={card.id}>
            <MyCard card={card} />
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="dots">
          {Array.from({ length: instanceRef.current.track.details.slides.length }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={"dot" + (currentSlide === idx ? " active" : "")}
            ></button>
          ))}
        </div>
      )}
    </div>
  )
}
