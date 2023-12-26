import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import { DoneToast } from "../globalElements/AllToasts";
import Navbar from "./Navbar";

export default function SignUp() {
  const localhost = "http://localhost:8000/api";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    toast(<DoneToast text="signed up successfully" />,
      {
        style: { background: 'none', boxShadow: 'none' },
        duration: 2000,
        position: 'top-center',
      })
    const userData = { name, email, phone, password, role };
    axios.post(`${localhost}/register`, userData)
      .then((response) => {
        setTimeout(() => { navigate("/signin") }, 1000);
        toast.remove();
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className="bg-transparent font-poppins">
      <Navbar sign="up" />
      <Toaster />
      <div className="flex flex-col items-center justify-center px-6 py-12 md:py-10 mx-auto">

        <div className="w-full bg-cream-100 rounded shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create your account
            </h1>
            <form onSubmit={signup} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="bg-cream-100 border border-cream-400 placeholder:text-cream-400 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:ring-0 focus:border-cream-400" placeholder="joe smith" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-cream-100 border border-cream-400 placeholder:text-cream-400 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:ring-0 focus:border-cream-400" placeholder="name@email.com" required />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Your phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" className="bg-cream-100 border border-cream-400 placeholder:text-cream-400 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:ring-0 focus:border-cream-400" placeholder="123-456-7890" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-cream-100 border border-cream-400 placeholder:text-cream-400 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:ring-0 focus:border-cream-400" required />
              </div>
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-cream-100 border border-cream-400 rounded-lg sm:flex">
                  <li className="w-full border-b border-cream-400 sm:border-b-0 sm:border-r">
                    <div className="flex items-center ps-3">
                      <input id="radio-customer" onChange={(e) => setRole(e.target.value)} type="radio" value="customer" name="list-radio" className="w-4 h-4 text-cream-500 bg-gray-100 border-cream-400 placeholder:text-cream-400 focus:ring-cream-400 focus:border-cream-500" />
                      <label htmlFor="radio-customer" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer</label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input id="radio-vendor" onChange={(e) => setRole(e.target.value)} type="radio" value="vendor" name="list-radio" className="w-4 h-4 text-cream-500 bg-gray-100 border-cream-400 placeholder:text-cream-400 focus:ring-cream-400 focus:border-cream-500" />
                      <label htmlFor="radio-vendor" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vendor</label>
                    </div>
                  </li>
                </ul>
              </div>

              <button type="submit" className="w-full text-cream-100 bg-cream-600 border rounded-full text-sm px-5 py-2.5 text-center">Sign up</button>
              <p className="text-sm font-light text-creabg-cream-1000">
                Already have an account? <a href="/signin" className="font-medium text-cream-600 hover:underline">Sign In</a>
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}