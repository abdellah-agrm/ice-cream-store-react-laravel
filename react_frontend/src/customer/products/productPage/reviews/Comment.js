import React, { useState } from 'react';
import axios from 'axios';
import { StarFill, Star } from 'react-bootstrap-icons';
import { toast } from "react-hot-toast";
import { DoneToast } from '../../../../globalElements/AllToasts';

export default function Comment({ productID }) {
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const localhost = "http://localhost:8000/api";
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const postReview = async (e) => {
    e.preventDefault();
    const review = { 'Rating': rating, 'Comment': comment, 'user_id': userID, 'product_id': productID };
    axios.post(`${localhost}/customer/reviews`, review, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setComment("");
        setRating(0);
        toast(<DoneToast text="Review added successfully" />,
          {
            style: { background: 'none', boxShadow: 'none' },
            duration: 2000,
            position: 'top-center',
          });
        setTimeout(() => { window.location.reload() }, 2000)
      })
      .catch((err) => console.error(err));
  }

  return (
    <form onSubmit={postReview} className="w-full">
      <div className='max-w-5xl mb-1 mx-auto'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button type="button" key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}>
              {index <= (hover || rating) ?
                <StarFill className="w-auto h-5 text-cream-500" />
                : <Star className="w-auto h-5 text-cream-500" />}
            </button>
          );
        })}
      </div>
      <div className='flex justify-center w-full mx-auto'>
        <div className='max-w-5xl w-full'>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="leading-4 mx-auto px-3 mb-1 w-full border-[1px] border-cream-300 placeholder:text-cream-300 rounded text-gray-900 text-sm font-normal focus:outline-none focus:ring-0 focus:border-cream-300" placeholder="Write your feedback here..." rows={5} required></textarea>
          <button type='submit' className="flex ml-auto px-4 py-2 font-semibold bg-cream-200 text-cream-600 hover:text-cream-200 hover:bg-cream-600 rounded-full">Submit</button>
        </div>
      </div>
    </form>
  )
}
