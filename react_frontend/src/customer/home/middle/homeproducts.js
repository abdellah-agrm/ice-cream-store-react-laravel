import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {LoadingPage} from "../../../globalElements/LoadingPage";
import Products from "../../products/allProducts/Products";

export default function HomeProducts() {
  const localhost = "http://localhost:8000/api";
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true)
  const [mostOrdered, setMostOrdered] = useState([]);

  useEffect(() => {
    axios.get(`${localhost}/customer/mostordered`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setMostOrdered(res.data.slice(0, 8));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen flex flex-wrap justify-center items-start py-2 px-4" id="products">
      <div className="mb-2">
        <div className="text-center">
          <h1 className="sm:text-4xl text-2xl font-medium title-font text-gray-900 mb-4">Our <span className="text-cream-600">Popular</span> Ice Creams</h1>
          <p className="text-lg leading-relaxed mx-auto text-gray-500s">
            Join us in savoring these crowd-pleasers that embody the essence of our delectable offerings
          </p>
        </div>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-cream-600 inline-flex"></div>
        </div>
        <Products allProducts={mostOrdered} />
        <div className="w-full flex justify-end px-5">
          <Link to="/products" className="group inline-flex items-center justify-center rounded-md text-lg font-semibold text-cream-500 transition-all duration-200 ease-in-out focus:shadow">
            See More
            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-1 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}