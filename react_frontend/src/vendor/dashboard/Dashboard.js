import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { LoadingPage } from "../../globalElements/LoadingPage";
import CardsStats from "./CardsStats";
import MangeProducts from "./ManageProducts";
import Navbar from "../../globalElements/header/Navbar";
import Footer from "../../globalElements/footer/Footer";
import ScrollToTop from "../../globalElements/ScrollToTop";

export default function Dashboard() {
  const localhost = "http://localhost:8000/api";
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get(`${localhost}/cardstats/${userID}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setCardData(res.data);
      })
      .catch((err) => console.error(err));
    axios.get(`${localhost}/vendorstats/${userID}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setTableData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);


  if (isLoading) {
    return <LoadingPage />
  }
  return (
    <section className="bg-cream-100 font-poppins">
      <Toaster />
      <div className="min-h-screen">
        <Navbar />
        <ScrollToTop />
        <CardsStats dataCard={cardData} />
        <MangeProducts dataTable={tableData} />
      </div>
      <Footer />
    </section>
  );
}
