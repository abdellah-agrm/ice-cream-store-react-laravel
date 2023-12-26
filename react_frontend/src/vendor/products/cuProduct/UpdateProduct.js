import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chat, ChevronDown, CurrencyDollar, Eye, Upload } from "react-bootstrap-icons";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import { DoneToast } from "../../../globalElements/AllToasts";
import Navbar from "../../../globalElements/header/Navbar";
import Footer from "../../../globalElements/footer/Footer";
import { LoadingPage } from "../../../globalElements/LoadingPage";
import RatingStars from "../../../globalElements/RatingStars";
import ViewsCounter from "../../../globalElements/ViewsCounter";

export default function UpdateProduct() {
  const { id } = useParams();
  const localhost = "http://localhost:8000/api";
  const imglink = "http://localhost:8000/storage/";
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const token = localStorage.getItem('token');

  // -------------------- Data : -------------------- 
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDetails, setProductDetails] = useState("");
  const [productStock, setProductStock] = useState("");
  const [image, setImage] = useState(null);
  const [productSize, setProductSize] = useState("");

  useEffect(() => {
    axios.get(`${localhost}/vendor/products/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setProductName(res.data[0].ProductName);
        setProductDetails(res.data[0].ProductDetails);
        setProductPrice(res.data[0].ProductPrice);
        setProductStock(res.data[0].ProductSize);
        setProductStock(res.data[0].ProductStock);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const CreateProduct = async (e) => {
    e.preventDefault();
    const formData = {
      "ProductName": productName, "ProductPrice": parseFloat(productPrice),
      "ProductDetails": productDetails, "Image": image,
      "ProductSize": productSize, "ProductStock": parseInt(productStock)
    };
    console.log(formData);

    axios.put(`${localhost}/vendor/products/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((res) => {
        console.log(res.data);
        toast(<DoneToast text="The Product added to cart successfully" />,
          {
            style: { background: 'none', boxShadow: 'none' },
            duration: 2000,
            position: 'top-center',
          });
        // setTimeout(() => { navigate("/home") }, 2000)
      })
      .catch((err) => console.error(err));
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="bg-cream-100 text-gray-600 font-poppins body-font overflow-hidden">
      <Navbar />
      <Toaster />
      <div className="container px-5 py-12 mx-auto">
        <form onSubmit={CreateProduct} className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="flex justify-center items-center lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded bg-cream-300">
            <label htmlFor="productImage" className="flex justify-center items-center cursor-pointer w-full h-full">
              <img src={imglink + product.Image} className="h-48 lg:h-60 sm:h-52 w-auto mx-auto" alt={product.Image} />
            </label>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-3 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-0.5">Product Name</h2>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="border-[1px] border-cream-300 placeholder:text-cream-300 rounded outline-none text-gray-900 text-sm px-3 py-2 w-full font-normal mb-1 focus:ring-0 focus:border-cream-300" placeholder="Write product name here..." required />
            <div className="flex mb-4">
              <span className="flex items-center">
                <RatingStars rating={product.ProductRating} size={4} />
                <span className="text-gray-600 ml-3">{product.ReviewsNb} Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <Eye className="h-5 w-auto" /> <p className="text-sm leading-5 px-1 mr-3"> <ViewsCounter productID={id} /></p>
                <Chat className="h-5 w-auto" /> <p className="text-sm leading-5 px-1"> {product.ReviewsNb}</p>
              </span>
            </div>
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-0.5">Product Description</h2>
            <textarea value={productDetails} onChange={(e) => setProductDetails(e.target.value)} className="leading-4 border-[1px] border-cream-300 placeholder:text-cream-300 rounded outline-none text-gray-900 text-sm px-3 py-2 w-full font-normal mb-1 focus:ring-0 focus:border-cream-300" placeholder="Write product description here..." rows={5} required>
            </textarea>

            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-0.5">Product Image</h2>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border border-cream-300 rounded cursor-pointer bg-white hover:bg-cream-400  text-cream-500 hover:text-white hover:border-0">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-auto h-7 mb-2" />
                  <p className="m-0 text-xs"><span className="font-semibold">Click to upload</span> the product image</p>
                </div>
                <input id="dropzone-file" type="file" onChange={(e) => setImage(e.target.files[0])} className="hidden" accept="image/jpeg, image/jpg, image/png" required />
              </label>
            </div>

            <div className="flex justify-between w-full my-4 items-center pb-3 border-b-2 border-gray-100">
              <div className="flex items-center">
                <span className="mr-3">Stock</span>
                <div className="relative">
                  <input type="number" value={productStock} onChange={(e) => setProductStock(e.target.value)} className="w-24 sm:w-36 md:w-32 lg:28 xl:w-40 font-medium text-base text-gray-900 border-[1px] border-cream-300 rounded outline-none px-2 py-2 focus:ring-0 focus:border-cream-300" required />
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={productSize} onChange={(e) => setProductSize(e.target.value)} className="w-28 sm:w-36 md:w-32 lg:28 xl:w-40 rounded border appearance-none border-cream-300 py-2 outline-none text-base pl-3 pr-10 focus:ring-0 focus:border-cream-300" required>
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
                <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="title-font font-medium text-xl text-gray-900 border-[1px] border-cream-300 rounded outline-none pl-8 pr-2 py-1.5 w-32 focus:ring-0 focus:border-cream-300" required />
                <CurrencyDollar className="absolute top-1/2 left-1 text-gray-900 transform -translate-y-1/2 h-6 w-auto" />
              </div>
              <button type="submit" className="flex items-center ml-auto px-4 py-2 font-semibold bg-cream-200 text-cream-600 hover:text-cream-200 hover:bg-cream-600 outline-none rounded-full">Submit</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  )
}