import React, { useState, useEffect } from 'react';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 100); 
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button className={`${isVisible ? 'opacity-100' : 'opacity-0'} 
      fixed right-4 bottom-4 z-50 transition-opacity duration-300 ease-in-out bg-cream-100 text-cream-600 hover:text-cream-500 rounded-full`}
      onClick={scrollToTop}>
      <ArrowUpCircleFill className='h-10 w-auto'/>
    </button>
  );
};

export default ScrollToTop;
