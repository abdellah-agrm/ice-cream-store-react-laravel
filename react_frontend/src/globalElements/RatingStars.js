import React from 'react';
import { StarFill, Star } from 'react-bootstrap-icons';

export default function RatingStars({ rating, size }) {
  const maxStars = 5;
  const filledStars = Math.min(rating, maxStars);
  const emptyStars = maxStars - filledStars;

  const renderStars = (count, isFilled) => {
    const starIcon = isFilled ? <li><StarFill className={`w-${size} h-auto mr-0.5 text-cream-500`} /></li> : <li><Star className={`w-${size} h-auto mr-0.5 text-cream-500`} /></li>;
    return Array.from({ length: count }, (_, index) => <span key={index}>{starIcon}</span>);
  };

  return (
    <ul className="flex">
      {renderStars(filledStars, true)}
      {renderStars(emptyStars, false)}
    </ul>
  );
};
