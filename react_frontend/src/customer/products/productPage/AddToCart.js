import React, { useState } from "react";
import axios from "axios";
import { Dash, Plus, X } from "react-bootstrap-icons";
import { DoneToast } from "../../../globalElements/AllToasts";
import { toast, Toaster } from "react-hot-toast";
import { ArrowSmallRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function AddToCart({ order }) {
  const imglink = "http://localhost:8000/storage/";
  const localhost = "http://localhost:8000/api";
  const user_id = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const click = (action) => {
    if (action === "plus") {
      setQuantity(parseInt(quantity) + 1);
    } else {
      setQuantity(parseInt(quantity) - 1);
    }
  }

  const checkout = async (e) => {
    const data = { "OrderQuantity": quantity, "user_id": user_id, "product_id": order.ProductID }
    axios.post(`${localhost}/customer/orders`, data, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        toast(<DoneToast text="The order completed successfully" />,
          {
            style: { background: 'none', boxShadow: 'none' },
            duration: 2000,
            position: 'top-center',
          });
        setTimeout(() => { window.location.reload() }, 2000);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Toaster />
      <button onClick={() => setShowModal(true)} className="flex ml-auto items-center bg-cream-300 text-cream-600 hover:bg-cream-200 rounded-md px-3 py-2 text-center text-sm font-medium outline-none disabled:text-cream-400" 
      disabled={order.ProductStock < 1 || userRole === "vendor"}>
        <ShoppingCartIcon className="mr-2 h-6 w-6" />
        Add to cart
      </button>
      {showModal ? (
        <div className="bg-cream-600/30 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative animate-fade-up animate-duration-[1500ms] animate-ease-out w-auto my-6 mx-auto max-w-3xl">
            <div className="mx-auto max-w-md pt-20">
              <div className="rounded-xl bg-cream-100 shadow-lg">
                <div className="px-4 py-4 sm:px-5 sm:py-6">
                  <div className="flow-root">
                    <ul className="-my-8">
                      <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="shrink-0 relative">
                          <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-cream-500 text-sm font-medium text-cream-100 shadow">{quantity}</span>
                          <div className="h-28 w-28 bg-cream-300 max-w-full rounded-lg">
                            <img className="p-3" src={imglink + order.Image} alt={order.ProductName} />
                          </div>
                          <button onClick={() => setShowModal(false)} type="button" className="absolute top-1 right-1 block sm:hidden text-base font-semibold text-right rounded text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                            <X className="h-6 w-6" />
                          </button>
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="p-0">
                              <p className="text-base font-semibold text-gray-900">{order.ProductName}</p>
                              <p className="mx-0 mt-1 mb-0 text-base font-semibold text-gray-900">${order.ProductPrice}</p>

                              <div className="flex flex-row h-6 w-full rounded-lg relative bg-transparent mt-1">
                                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={0} className="quantity bg-cream-100 p-0 w-11 border-0 flex items-center focus:outline-none outline-none focus:ring-0 focus:border-transparent text-center font-semibold text-md hover:text-black focus:text-black text-gray-700" />
                                <button onClick={() => click("plus")} className="w-6 h-6 disabled:bg-cream-200 bg-cream-500 text-cream-100 hover:bg-cream-400 rounded-full" disabled={order.ProductStock - 1 < quantity}>
                                  <Plus className="mx-auto text-cream-100" />
                                </button>
                                <button onClick={() => click("sub")} className="w-6 h-6 ml-1 disabled:bg-cream-200 bg-cream-500 text-cream-100 hover:bg-cream-400 rounded-full" disabled={quantity < 1}>
                                  <Dash className="mx-auto text-cream-100" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-4 flex sm:mt-0 items-start justify-end">
                              <button onClick={() => setShowModal(false)} type="button" className="sm:block hidden w-0 pr-6 text-base font-semibold text-right rounded text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                <X className="h-6 w-6" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-b py-8">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{parseInt(order.ProductStock) - quantity}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Quantity</p>
                      <p className="text-lg font-semibold text-gray-900">{quantity}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">USD</span> {(quantity * order.ProductPrice).toFixed(2)}</p>
                  </div>

                  <div className="mt-6 text-center">
                    <button onClick={checkout} type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-cream-600 px-6 py-4 text-lg font-semibold text-cream-100 transition-all duration-200 ease-in-out focus:shadow hover:bg-cream-500">
                      Checkout
                      <ArrowSmallRightIcon className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : ""}
    </>
  )
}