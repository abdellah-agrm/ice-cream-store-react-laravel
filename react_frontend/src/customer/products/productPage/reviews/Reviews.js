import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import TimeAgo from 'react-timeago';
import axios from "axios";
import Comment from "./Comment";
import RatingStars from "../../../../globalElements/RatingStars";
import DeleteBtn from "./DeleteBtn";

export default function Reviews({ productID }) {
  const localhost = "http://localhost:8000/api";
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${localhost}/customer/specificreviews/${productID}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [productID, token]);
 

  return (
    <section className="py-10 lg:py-16 font-poppins">
      <Toaster />
      <div className="max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
        <h2 className="px-2 pb-2 mb-8 text-lg font-semibold border-b border-cream-300">Add a review</h2>
        <Comment productID={productID} />
        <div className="mt-10">
          <h2 className="px-2 pb-2 mb-8 text-lg font-semibold border-b border-cream-300">Reviews</h2>
          <div className="flex flex-col justify-center w-full">
            {
              reviews.map((item, index) =>
              (<div key={index} className="mx-auto p-3 mb-4 max-w-5xl w-full border border-cream-300 rounded-md bg-cream-200">
                <div className="block">
                  <div>
                    <div className="flex flex-wrap items-start justify-between mb-1">
                      <div className="mb-2 md:mb-0">
                        <h2 className="capitalize text-lg font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-xs text-gray-600"><TimeAgo date={item.updated_at} /></p>
                      </div>
                      <div className="mt-1.5">
                        <RatingStars rating={item.Rating} size={4}/>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">{item.Comment}</p>
                    <div className="flex justify-end items-center my-1">
                      {item.user_id === parseInt(userID) ? (<DeleteBtn reviewID={item.ReviewID} />) : ''}
                    </div>
                  </div>
                </div>
              </div>))
            }
          </div>
        </div>
      </div>
    </section>
  )
}