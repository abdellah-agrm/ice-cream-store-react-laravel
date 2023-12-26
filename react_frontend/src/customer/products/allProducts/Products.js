import { Link } from "react-router-dom";
import RatingStars from "../../../globalElements//RatingStars";
import AddToCart from "../productPage/AddToCart";
import TopRightHeart from "./TopRightHeart";

export default function Products({ allProducts }) {
  const imglink = "http://localhost:8000/storage/";

  return (
    <div className="font-poppins flex flex-wrap justify-center items-start py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {
          allProducts.map((item, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg m-1.5 w-[260px] border border-cream-300 bg-cream-100 shadow">
              <Link to={`/products/${item.ProductID}`} className="relative h-56 mx-3 mt-3 flex justify-center items-center bg-cream-300 overflow-hidden rounded-xl">
                <img className="h-28 w-28 md:h-36 md:w-36" src={imglink + item.Image} alt={item.ProductName} />
                <TopRightHeart productID={item.ProductID} />
              </Link>
              {parseInt(item.ProductStock) < 1 ? (<span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-cream-600 text-center text-sm text-cream-100">Sold out</span>) : ""}
              <div className="mt-3 px-4 pb-4">
                <Link to={`/products/${item.ProductID}`}>
                  <h5 className="text-lg font-semibold tracking-tight text-slate-900">{item.ProductName}</h5>
                </Link>
                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded text-cream-100 bg-cream-500 px-2.5 py-0.5 text-xs font-semibold">{item.ProductRating}.0</span>
                  <RatingStars rating={item.ProductRating} size={4}/>
                </div>
                <div className="flex items-center justify-between">
                  <p><span className="text-2xl font-bold text-slate-900">${item.ProductPrice.toFixed(2)}</span></p>
                  <AddToCart order={item} />
                </div>
              </div>
            </div>
          ))}

      </div>
    </div>
  );
}