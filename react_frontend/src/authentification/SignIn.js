import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import { DoneToast } from "../globalElements/AllToasts";
import Navbar from "./Navbar";

export default function SignIn() {
  const localhost = "http://localhost:8000/api";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async (e) => {
    e.preventDefault();
    toast(<DoneToast text="signed in successfully" />,
      {
        style: { background: 'none', boxShadow: 'none' },
        duration: 2000,
        position: 'top-center',
      })
    const userData = { email, password };
    axios.post(`${localhost}/login`, userData)
      .then((response) => {
        localStorage.setItem('token', response.data.auth_token);

        // stock user data :
        axios.get(`${localhost}/user`, { headers: { 'Authorization': `Bearer ${response.data.auth_token}` } })
          .then((res) => {
            localStorage.setItem('userID', res.data.UserID);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('role', res.data.role);
            navigate("/home");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className="bg-transparent font-poppins">
      <Navbar sign="in" />
      <Toaster />
      <div className="flex flex-col items-center justify-center px-6 py-28 md:py-16 mx-auto">

        <div className="w-full bg-cream-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form onSubmit={signin} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email"
                  className="bg-cream-100 border border-cream-400 placeholder:text-cream-400 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-0 focus:border-cream-400" placeholder="name@email.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••"
                  className="bg-cream-100 border border-cream-400 placeholder:text-cream-400 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-0 focus:border-cream-400" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-cream-100" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-creabg-cream-1000">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium hover:underline">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-cream-100 bg-cream-600 border rounded-full text-sm px-5 py-2.5 text-center">Sign in</button>
              <p className="text-sm font-light text-creabg-cream-1000">
                Don’t have an account yet? <a href="/signup" className="font-medium text-cream-600 hover:underline">Sign up</a>
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}