import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import Footer from "./footer/Footer";
import Navbar from "./header/Navbar";

export default function NotFound() {
  return (
    <section className="bg-cream-100">
      <div className="min-h-screen">
      <Navbar/>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-28 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-2 text-7xl tracking-tight font-semibold lg:text-9xl text-cream-600">404</h1>
          <p className="mb-3 text-3xl tracking-tight font-semibold text-cream-600 md:text-4xl">Something's missing.</p>
          <p className="mb-3 text-base font-medium text-gray-700">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <a href="/home" className="inline-flex text-cream-100 bg-cream-600 hover:bg-cream-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-0.5">
            Back to Homepage
            <ArrowSmallRightIcon className="ml-2 w-5 h-auto"/>  
          </a>
        </div>
      </div>
      </div>
      <Footer/>
    </section>
  )
}