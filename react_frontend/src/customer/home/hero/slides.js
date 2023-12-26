import React, { forwardRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Slide } from './slide';

const SimpleSlider = forwardRef((_, ref) => {
  const slideData = [
    {
      img: "/images/products/vanilla.png",
      color: "#f6d561",
    },
    {
      img: "/images/products/brittle.png",
      color: "#f0a65b",
    },
    {
      img: "/images/products/choclate.png",
      color: "#5d2b22",
    },
    {
      img: "/images/products/cookie.png",
      color: "#eaa754",
    },
    {
      img: "/images/products/hazelnut.png",
      color: "#f2c183",
    },
    {
      img: "/images/products/lemon.png",
      color: "#f4e15b",
    },
    {
      img: "/images/products/mango.png",
      color: "#f3bd0f",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Slider ref={ref} className='h-auto w-auto object-cover object-center mx-auto' {...settings}>
      {
        slideData.map((item, index) => (
          <Slide key={index} image={item.img} bgcolor={item.color} />
        ))
      }
    </Slider>
  );
});

export default SimpleSlider;