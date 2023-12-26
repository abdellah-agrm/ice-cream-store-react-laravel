import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { X } from "react-bootstrap-icons";
import RatingStars from "../../globalElements/RatingStars";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { LoadingPage2 } from "../../globalElements/LoadingPage";
import DestroyBtn from "./DestroyBtn";

export default function ShoppingCart({ CloseSideBar }) {
  const imglink = "http://localhost:8000/storage/";
  const localhost = "http://localhost:8000/api";
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get(`${localhost}/shoppingcart/${userID}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  const totalAmountSum = orders.reduce((sum, item) => sum + parseFloat(item.AllTotalAmount), 0);

  const RefreshNow = () => {
    setRefresh(!refresh);
  }

  if (isLoading) { return <LoadingPage2 /> };

  return (
    <div className="ShoppingCart_div font-poppins fixed top-0 bottom-0 right-0 z-10 w-full max-w-lg overflow-y-scroll bg-cream-100 border border-cream-600 rounded">
      <div className="p-6 bg-cream-100 md:pt-4 md:pb-6 md:px-6">
        <div className="flex justify-end">
          <button onClick={CloseSideBar} className="text-cream-600">
            <X className="h-auto w-8" />
          </button>
        </div>
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold ">Shopping Cart</h2>
          <span className="inline-flex items-center justify-center w-7 h-7 ml-2 text-sm font-bold bg-cream-500 rounded-full text-cream-100">{orders.length}</span>
        </div>
        {orders.map((item, index) => (
          <div key={index} className="block pb-6 mb-6 -mx-4 border-b border-gray-200 md:flex">
            <div className="w-full px-4 md:pr-2 mb-6 md:w-1/3 md:mb-0">
              <Link to={`/products/${item.ProductID}`}>
                <div className="flex rounded w-full bg-cream-300 py-6 h-52 md:h-32 md:w-32">
                  <img src={imglink + item.Image} alt={item.ProductName} className="w-auto mx-auto" />
                </div>
              </Link>
            </div>
            <div className="w-full py-0 md:py-0 px-4 md:px-3 md:2/3">
              <div className="flex justify-between">
                <div className="">
                  <h2 className="text-xl font-bold">{item.ProductName}</h2>
                  <RatingStars rating={item.ProductRating} size={4} />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <DestroyBtn User_id={item.user_id} Product_id={item.ProductID} Refresh={RefreshNow} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm mt-5">
                <div className="">
                  <p className="flex items-end font-medium text-gray-600">Price :</p>
                  <p className="flex items-end font-medium text-gray-600">Quantity :</p>
                  <p className="flex items-end font-medium text-gray-600">Total :</p>
                </div>
                <div className="">
                  <p className="flex items-end font-medium text-gray-600">${item.ProductPrice.toFixed(2)}</p>
                  <p className="flex items-end font-medium text-gray-600">{item.TotalQuantity}</p>
                  <p className="flex items-end font-medium text-gray-600">${item.AllTotalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-between text-base">
          <div className="flex flex-row justify-between text-sm">
            <p>Shipping</p>
            <p className={`${totalAmountSum > 50 ? 'line-through text-cream-600' : ''}`}>$7.00</p>
          </div>
          <div className="flex flex-row justify-between text-sm">
            <p>Total amount</p>
            <p>${totalAmountSum.toFixed(2)}</p>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <p>Subtotal</p>
            <p>${totalAmountSum > 50 ? totalAmountSum.toFixed(2) : ((totalAmountSum + 7).toFixed(2))}</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-cream-600 px-6 py-4 text-lg font-semibold text-cream-100 transition-all duration-200 ease-in-out focus:shadow hover:bg-cream-500">
            Checkout
            <ArrowSmallRightIcon className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" />
          </button>
        </div>
        <div className="flex items-center justify-center mt-6">
          <p><span className="">or,</span>
            <a href="/products" className="pl-1 text-cream-500 hover:underline">Continue Shopping
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}