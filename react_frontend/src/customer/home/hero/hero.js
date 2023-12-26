import React, { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import SimpleSlider from './slides';
import { ArrowSmallLeftIcon, ArrowSmallRightIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import ScrollToTop from '../../../globalElements/ScrollToTop';

export default function Hero() {
  const sliderRef = useRef(null);

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section className="bg-cream-100 text-gray-600 body-font" id="hero">
      <ScrollToTop/>
      <div className="container mx-auto flex px-8 py-8 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <SimpleSlider ref={sliderRef} />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <TypeAnimation sequence={[
            "Experience the delight of Vanilla",
            1000,
            "Experience the delight of Peanut",
            1000,
            "Experience the delight of Chocolate",
            1000,
            "Experience the delight of Cookie",
            1000,
            "Experience the delight of Hazelnut",
            1000,
            "Experience the delight of Lemon",
            1000,
            "Experience the delight of Mango",
            1000,
          ]}
            speed={50}
            repeat={Infinity}
            className="font-poppins text-3xl sm:text-5xl mb-4 font-extrabold text-cream-600"
          />
          <p className="mb-5 text-xl font-poppins text-cream-500 leading-normal">
            We've got a little something for everyone. So why wait? Embark on a sweet journey with us today,
            and experience the magic of ice cream like never before. After all, life is short,
            and there's always room for ice cream!
          </p>
          <div className="flex justify-between gap-2 w-full">
            <div>
              <button onClick={goToPrevSlide} className="mr-2 rounded-full text-cream-600 p-2 border-2 border-cream-600 hover:bg-cream-600 hover:text-cream-100">
                <ArrowSmallLeftIcon className='w-8 h-auto' />
              </button>
              <button onClick={goToNextSlide} className="rounded-full text-cream-600 p-2 border-2 border-cream-600 hover:bg-cream-600 hover:text-cream-100">
                <ArrowSmallRightIcon className='w-8 h-auto' />
              </button>
            </div>
            <Link to="/products" className="flex flex-row font-medium text-cream-600 bg-cream-100 border-2 border-cream-600 hover:bg-cream-600 hover:text-cream-100 py-2 px-4 rounded-full text-lg">
              <ShoppingCartIcon className='w-6 h-auto mr-1' /> Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}