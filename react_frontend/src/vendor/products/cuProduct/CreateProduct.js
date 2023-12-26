import React, { useState } from "react";
import axios from "axios";
import { Chat, ChevronDown, CurrencyDollar, Eye, Star, Upload } from "react-bootstrap-icons";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { DoneToast } from "../../../globalElements/AllToasts";
import Navbar from "../../../globalElements/header/Navbar";
import Footer from "../../../globalElements/footer/Footer";
import RatingStars from "../../../globalElements/RatingStars";

export default function CreateProduct() {
  const navigate = useNavigate();
  const localhost = "http://localhost:8000/api";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('userID');

  const CreateProduct = (e) => {
    e.preventDefault();
    const productData = {
      "ProductName": name, "ProductPrice": parseFloat(price),
      "ProductDetails": description, "Image": image,
      "ProductSize": size, "ProductStock": parseInt(stock),
      "user_id": parseInt(user_id)
    };

    axios.post(`${localhost}/vendor/products`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((res) => {
        toast(<DoneToast text="The Product added to cart successfully" />,
          {
            style: { background: 'none', boxShadow: 'none' },
            duration: 2000,
            position: 'top-center',
          });
        setTimeout(() => { navigate("/products") }, 2000)
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className="bg-cream-100 text-gray-600 font-poppins body-font overflow-hidden">
      <Toaster />
      <section className="min-h-screen">
        <Navbar />
        <div className="container px-5 py-12 mx-auto">
          <form onSubmit={CreateProduct} className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="flex justify-center items-center lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded bg-cream-300">
              <label htmlFor="productImage" className="flex justify-center items-center cursor-pointer w-full h-full">
                <div className="flex flex-col justify-center">
                  <Upload className="text-cream-600 h-10 lg:h-16 sm:h-12 w-auto" />
                  <p className="mt-3 text-cream-600 text-center text-xs sm:text-sm"><span className="font-semibold">Click to upload</span> the product image</p>
                </div>
                <input id="productImage" type="file" onChange={(e) => setImage(e.target.files[0])} className="hidden" accept="image/jpeg, image/jpg, image/png" required />
              </label>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-0.5">Product Name</h2>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-[1px] border-cream-300 placeholder:text-cream-300 rounded outline-none focus:ring-0 focus:border-cream-300 text-gray-900 text-sm px-3 py-2 w-full font-normal mb-1" placeholder="Write product name here..." required />
              <div className="flex mb-4">
                <span className="flex items-center">
                  <RatingStars rating={0} size={4} />
                  <span className="text-gray-600 ml-3">0 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <Eye className="h-5 w-auto" /> <p className="text-sm leading-5 px-1 mr-3"> 0</p>
                  <Chat className="h-5 w-auto" /> <p className="text-sm leading-5 px-1"> 0</p>
                </span>
              </div>
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-0.5">Product Description</h2>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="leading-4 border-[1px] border-cream-300 placeholder:text-cream-300 rounded outline-none text-gray-900 focus:ring-0 focus:border-cream-300 text-sm px-3 py-2 w-full font-normal mb-1" placeholder="Write product description here..." rows={5} required>
              </textarea>
              <div className="flex justify-between w-full my-4 items-center pb-3 border-b-2 border-gray-100">
                <div className="flex items-center">
                  <span className="mr-3">Stock</span>
                  <div className="relative">
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-24 sm:w-36 md:w-32 lg:28 xl:w-40 font-medium text-base text-gray-900 border-[1px] border-cream-300 rounded outline-none focus:ring-0 focus:border-cream-300 px-2 py-2" required />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => setSize(e.target.value)} className="w-28 sm:w-36 md:w-32 lg:28 xl:w-40 rounded border appearance-none border-cream-300 py-2 outline-none focus:ring-0 focus:border-cream-300 text-base pl-3 pr-10" required>
                      <option value="250Ml">250 Ml</option>
                      <option value="500Ml">500 Ml</option>
                      <option value="1Liter">1 Liter</option>
                      <option value="2Liter">2 Liter</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <ChevronDown className="h-auto w-3 font-bold" />
                    </span>
                  </div>
                </div>

              </div>
              <div className="flex">
                <div className="relative">
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="title-font font-medium text-xl text-gray-900 border-[1px] border-cream-300 rounded outline-none focus:ring-0 focus:border-cream-300 pl-8 pr-2 py-1.5 w-32" required />
                  <CurrencyDollar className="absolute top-1/2 left-1 text-gray-900 transform -translate-y-1/2 h-6 w-auto" />
                </div>
                <button type="submit" className="flex items-center ml-auto px-4 py-2 font-semibold bg-cream-200 text-cream-600 hover:text-cream-200 hover:bg-cream-600 outline-none rounded-full">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </section>
  )
}