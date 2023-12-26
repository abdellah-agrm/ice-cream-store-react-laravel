import { Tooltip } from 'react-tooltip';
import DeleteProduct from "./DeleteProduct";
import { Chat, Eye } from 'react-bootstrap-icons';
import RatingStars from '../../globalElements/RatingStars';
import { Link } from 'react-router-dom';

export default function MangeProducts({ dataTable }) {
  const imglink = "http://localhost:8000/storage/";

  return (
    <div className="mb-16">
      <div className="container px-4 mx-auto">
        <div className="text-center my-8">
          <h1 className="font-poppins sm:text-3xl text-2xl font-semibold text-cream-600 mb-3">Products <span className="text-gray-900">Management</span></h1>
          <div className="flex justify-center">
            <div className="w-16 h-[3px] rounded-full bg-cream-600 inline-flex"></div>
          </div>
        </div>
        <div className="overflow-x-auto shadow bg-cream-100 border border-cream-300 rounded">
          <table className="w-full table-auto">
            <thead className="bg-cream-100">
              <tr className="text-sm text-left text-gray-500 border-b border-cream-300">
                <th className="px-2 py-4 font-semibold text-center">Image</th>
                <th className="px-2 py-4 font-semibold">Name</th>
                <th className="px-2 py-4 font-semibold">Price</th>
                <th className="px-2 py-4 font-semibold">Stock</th>
                <th className="px-2 py-4 font-semibold">Size</th>
                <th className="px-2 py-4 font-semibold">Rating</th>
                <th className="px-2 py-4 font-semibold">Quantity sold</th>
                <th className="px-2 py-4 font-semibold">Revenue</th>
                <th className="px-2 py-4 font-semibold">Likes</th>
                <th className="px-2 py-4 font-semibold">Reviews</th>
                <th className="px-2 py-4 font-semibold">Views</th>
                <th className="px-2 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                dataTable.map((item, index) => (
                  <tr key={index} className="border-b text-sm border-cream-300">
                    <td className="flex justify-center items-center px-0 py-1 font-medium">
                      <span className="bg-cream-300 flex justify-center items-center w-16 h-16 rounded">
                        <Link to={`/products/${item.ProductID}`}>
                          <img className="w-auto h-12 rounded" src={imglink + item.Image} alt={item.ProductName} data-tooltip-id={`product-${index}`} />
                        </Link>
                        <Tooltip id={`product-${index}`} place='right' style={{ background: '#FFD0D0', padding: '2rem' }}>
                          <img src={imglink + item.Image} className="w-52 h-auto" alt={item.ProductName} />
                        </Tooltip>
                      </span>
                    </td>
                    <td className="px-2 font-medium">{item.ProductName}</td>
                    <td className="px-2 font-medium">${item.ProductPrice}</td>
                    <td className="px-2 font-medium">{item.ProductStock}</td>
                    <td className="px-2 font-medium">{item.ProductSize}</td>
                    <td className="px-2 font-medium"><RatingStars rating={item.ProductRating} size={3} /></td>
                    <td className="px-2 font-medium">{item.TTQuantity}</td>
                    <td className="px-2 font-medium">${item.TTAmount}</td>
                    <td className="px-2 font-medium">{item.TTFav}</td>
                    <td className="px-2 font-medium">
                      <div className='flex items-center'>
                        <Chat className="h-4 w-auto mr-1" /> {item.TTRev}
                      </div>
                    </td>
                    <td className="px-2 font-medium">
                      <div className='flex items-center'>
                        <Eye className='h-4 w-auto mr-1' /> {item.TTView}
                      </div>
                    </td>
                    <td className="px-2 font-medium">
                      <DeleteProduct productid={item.ProductID} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}