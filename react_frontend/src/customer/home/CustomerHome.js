import HeaderTop from "../../globalElements/header/HeaderTop";
import Navbar from "../../globalElements/header/Navbar";
import Hero from "./hero/hero";
import Qualities from "./middle/qualities";
import HomeProducts from "./middle/homeproducts";
import JoinUs from "./middle/JoinUs";
import StoryAroundUs from "./middle/StoryAroundUs";
import Footer from "../../globalElements/footer/Footer";
import ContactUs from "./middle/ContactUs";
import { Toaster } from "react-hot-toast";

export default function CustomerHome(){
  return(
    <section className="bg-cream-100 text-gray-900">
      <HeaderTop/>
      <Navbar/>
      <Toaster/>
      <Hero/>
      <Qualities/>
      <HomeProducts/>
      <JoinUs/>
      <StoryAroundUs/>
      <ContactUs/>
      <Footer/>
    </section>
  )
}