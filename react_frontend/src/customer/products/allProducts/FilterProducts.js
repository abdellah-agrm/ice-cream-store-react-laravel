import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "flowbite-react";
import Products from "./Products";
import { LoadingPage } from "../../../globalElements/LoadingPage";
import Footer from "../../../globalElements/footer/Footer";
import Navbar from "../../../globalElements/header/Navbar";
import ScrollToTop from "../../../globalElements/ScrollToTop";

export default function FilterProducts() {
  const localhost = "http://localhost:8000/api";
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${localhost}/vendor/products`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const searchData = product.filter(data => data.ProductName.toLowerCase().includes(search.toLowerCase()));

  const sortBy = (data, order) => {
    const sortedData = [...data];
    if (order === 'high2low') {
      sortedData.sort((a, b) => b.ProductPrice - a.ProductPrice);
    } else if (order === 'low2high') {
      sortedData.sort((a, b) => a.ProductPrice - b.ProductPrice);
    } else if (order === 'newest') {
      sortedData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (order === 'oldest') {
      sortedData.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    }
    setProduct(sortedData);
  };

  if (isLoading) { return <LoadingPage /> };

  return (
    <section className="bg-cream-100 font-poppins">
      <Navbar />
      <ScrollToTop />
      <div className="min-w-screen bg-cream-300 px-4 mx-auto lg:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-2 p-4">

          <div className="col-span-2 relative w-full mb-2 md:mb-0">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="text" id="simple-search" value={search} onChange={(e) => setSearch(e.target.value)} className="block w-full p-1.5 pl-10 text-base text-gray-900 rounded-full border-none focus:ring-0 focus:outline-none bg-cream-100 outline-none" placeholder="Search" required />
              </div>
            </form>
          </div>

          <div className="w-full md:w-auto items-center">
            <div className="flex justify-between gap-2">
              <div className="relative w-1/2">
                <Dropdown label="" dismissOnClick={false} renderTrigger={() => (
                  <button type="button" className="inline-flex justify-center w-full rounded-full px-4 py-2 bg-cream-100 text-sm font-medium text-gray-900 outline-none">
                    Most
                    <svg className="h-4 w-auto mt-1 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                )}>
                  <Dropdown.Item href="">Most favorited</Dropdown.Item>
                  <Dropdown.Item href="">Most rated</Dropdown.Item>
                  <Dropdown.Item href="">Most ordered</Dropdown.Item>
                </Dropdown>
              </div>

              <div className="relative w-1/2">
                <Dropdown label="" dismissOnClick={false} renderTrigger={() => (
                  <button type="button" className="inline-flex justify-center w-full rounded-full px-4 py-2 bg-cream-100 text-sm font-medium text-gray-900 outline-none">
                    Sort by
                    <svg className="h-4 w-auto mt-1 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                )}>
                  <Dropdown.Item onClick={() => sortBy(product, "low2high")}>Price: Low to high</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortBy(product, "high2low")}>Price: High to low</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortBy(product, "newest")}>Newest products</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortBy(product, "lowest")}>Oldest products</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products allProducts={searchData.length < 0 ? product : searchData} />
      <Footer />
    </section>
  )
}