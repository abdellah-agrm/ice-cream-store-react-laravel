import axios from "axios";
import { toast } from "react-hot-toast";
import { PencilSquare, Trash3, X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { DoneToast } from "../../globalElements/AllToasts";

export default function DeleteProduct({ productid }) {
  const localhost = "http://localhost:8000/api/vendor/products/";
  const token = localStorage.getItem('token');

  const confirmDelete = () => {
    toast((t) => (
      <div className="relative p-4 text-center bg-cream-100 rounded-lg shadow sm:p-5">
        <button onClick={() => toast.dismiss(t.id)} type="button" className="text-gray-900 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 ml-auto inline-flex items-center">
          <X className="w-6 h-6" />
        </button>
        <Trash3 className="text-cream-600 w-11 h-11 mb-3.5 mx-auto" />
        <p className="mb-4 text-gray-900">Are you sure you want to delete this comment?</p>
        <div className="flex justify-center items-center space-x-4">
          <button onClick={() => handleDelete() && toast.dismiss(t.id)} type="submit" className="py-2 px-3 text-sm font-medium text-center text-cream-100 bg-cream-600 rounded-lg hover:bg-cream-500">
            Yes, I'm sure
          </button>
          <button onClick={() => toast.dismiss(t.id)} type="button" className="py-2 px-3 text-sm font-medium border border-cream-600 text-cream-600 bg-cream-100 rounded-lg focus:z-10">
            No, cancel
          </button>
        </div>
      </div>),
      {
        style: { background: 'none', boxShadow: 'none' },
        duration: 5000,
        position: 'top-center',
      });
  }

  const handleDelete = async () => {
    axios.delete(localhost + productid, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(() => {
        toast(<DoneToast text="The order deleted successfully" />,
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
    <div className="flex gap-1">
      <Link to={`/update/${productid}`} className="bg-cream-500 hover:bg-cream-600 inline-flex text-cream-100 font-poppins font-medium p-2 rounded">
        <PencilSquare className="h-5 w-auto" />
      </Link>
      <button onClick={confirmDelete} className="bg-cream-500 hover:bg-cream-600 text-cream-100 font-poppins font-medium p-2 rounded">
        <Trash3 className="h-5 w-auto" />
      </button>
    </div>
  )
}