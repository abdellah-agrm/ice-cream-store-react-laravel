import { useEffect, useState } from "react";
import axios from "axios";
import { SuitHeartFill } from "react-bootstrap-icons";

export default function TopRightHeart({ productID }) {
  const localhost = "http://localhost:8000/api";
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');
  const [isFavorite, setIsFavorite] = useState("");

  useEffect(() => {
    axios.post(`${localhost}/customer/isfavorite/${productID}`, {"user_id": userID}, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => setIsFavorite(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {
        isFavorite === "yes" ?
          (<span className="absolute top-0 right-0 p-1.5 text-center text-sm text-cream-100">
            <SuitHeartFill className="w-6 h-auto text-cream-600" />
          </span>) : ""
      }
    </>
  )
}