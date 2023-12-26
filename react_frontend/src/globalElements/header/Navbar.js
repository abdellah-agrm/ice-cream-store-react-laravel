import React, { useEffect, useState } from "react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Cart3, PersonCircle, SuitHeart } from "react-bootstrap-icons";
import { Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ShoppingCart from "../../customer/shoppingCart/ShoppingCart";
import { LoadingPage3 } from "../LoadingPage";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const [open, setOpen] = useState(false);

  const signout = () => {
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <header className="bg-transparent">
      <div className="container px-3 md:px-0 mx-auto">
        <div className="relative flex items-center justify-between py-2">
          <Logo />
          <Navigation open={open} setOpen={setOpen} />
          {userRole === "customer" ? (<CustomerControls signout={signout} />) : (<VendorControls signout={signout} />)}
        </div>
      </div>
    </header>
  );
};

const Logo = () => (
  <div>
    <h1 className="text-4xl font-black font-dmserif text-gray-800">IceCream</h1>
  </div>
);

const Navigation = ({ open, setOpen }) => (
  <div className="flex-grow">
    <button onClick={() => setOpen(!open)} id="navbarToggler" className={` ${open && "navbarTogglerActive"} absolute right-0 block -translate-y-1/2 rounded-lg py-[6px] lg:hidden`}>
      <EllipsisVerticalIcon className="h-6 md:h-8 w-auto text-gray-700" />
    </button>
    <nav id="navbarCollapse" className={`absolute z-10 right-4 top-full bg-cream-100 w-full max-w-[250px] rounded-lg shadow p-2 border-[1px] lg:border-0 border-cream-300 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${!open && "hidden"} `}>
      <ul className="block lg:flex justify-center">
        <ScrollLink activeClassNaclassName="active" to="hero" spy={true} smooth={true} duration={500}>
          <ListItem NavLink="/home">Home</ListItem>
        </ScrollLink>
        <ScrollLink activeClassNaclassName="active" to="products" spy={true} smooth={true} duration={1000}>
          <ListItem NavLink="/home">Our products</ListItem>
        </ScrollLink>
        <ScrollLink activeClassNaclassName="active" to="aboutus" spy={true} smooth={true} duration={1500}>
          <ListItem NavLink="/home">Our story</ListItem>
        </ScrollLink>
        <ScrollLink activeClassNaclassName="active" to="contactus" spy={true} smooth={true} duration={2000}>
          <ListItem NavLink="/home">Contact us</ListItem>
        </ScrollLink>
      </ul>
    </nav>
  </div>
);

const ListItem = ({ children, NavLink }) => (
  <li className="lg:hover:bg-cream-100 hover:bg-cream-300">
    <Link to={NavLink} className="flex p-2 cursor-pointer text-base font-semibold font-poppins text-gray-700 lg:mx-2 lg:inline-flex delay-150 duration-300 hover:translate-y-0 hover:scale-100 lg:hover:scale-110">
      {children}
    </Link>
  </li>
);
// Customer :
const CustomerControls = ({ signout }) => {
  const userId = localStorage.getItem('userID');
  const [sideBar, setSideBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countFav, setCountFav] = useState(0);
  const [countOr, setCountOr] = useState(0);
  const closeSideBar = () => {
    setSideBar(false);
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/Counternav/${userId}`)
      .then((res) => {
        setCountOr(res.data.countOrder.length);
        setCountFav(res.data.countFavorite);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return (
      <LoadingPage3 />
    )
  }

  return (
    <div className="flex justify-between gap-2 md:gap-3 sm:flex lg:pr-0">
      <button type="button" onClick={() => setSideBar(!sideBar)} className="relative inline-flex items-center text-sm font-medium text-center text-gray-700">
        <Cart3 className="h-auto w-7" />
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-cream-100 bg-cream-500 rounded-full -top-2 -end-3">{countOr}</div>
      </button>

      <Link to="/myfavorites" onClick={() => setSideBar(!sideBar)} className="relative inline-flex items-center text-sm font-medium text-center text-gray-700">
        <SuitHeart className="h-auto w-7" />
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-cream-100 bg-cream-500 rounded-full -top-2 -end-3">{countFav}</div>
      </Link>

      <Dropdown label="" dismissOnClick={false} renderTrigger={() => <PersonCircle className="h-auto w-7 cursor-pointer text-gray-700" />}>
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item onClick={signout}><span className="font-semibold text-cream-600">Sign out</span></Dropdown.Item>
      </Dropdown>
      {sideBar ? (<ShoppingCart CloseSideBar={closeSideBar} />) : ''}
    </div>
  )
};

// Vendor :
const VendorControls = ({ signout }) => {
  const userId = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({});

  const stats = [
    {
      'title': 'Total products',
      'stats': statsData.ttProd ?? 0
    }, {
      'title': 'Total quantity',
      'stats': statsData.ttQuantity ?? 0
    }, {
      'title': 'Total revenue',
      'stats': "$" + (statsData.ttAmount ?? 0.00)
    }, {
      'title': 'Total likes',
      'stats': statsData.ttFav ?? 0
    }
  ];

  useEffect(() => {
    axios.get(`http://localhost:8000/api/cardstats/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => {
        setStatsData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) { return (<LoadingPage3 />) };

  return (
    <div className="flex justify-between gap-2 md:gap-3 sm:flex lg:pr-0">
      <Dropdown label="" dismissOnClick={false} renderTrigger={() => <BuildingStorefrontIcon className="h-auto w-7 cursor-pointer text-gray-700" />}>
        <div className="w-">
          {stats.map((item, index) => (
            <Dropdown.Item key={index}>
              <div className="flex flex-row">
                <p className="text-xs pr-2">{item.title} :</p>
                <p className="text-xs float-right font-semibold">{item.stats}</p>
              </div>
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown>

      <Dropdown label="" dismissOnClick={false} renderTrigger={() => <PersonCircle className="h-auto w-7 cursor-pointer text-gray-700" />}>
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="/createproduct">New product</Dropdown.Item>
        <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
        <Dropdown.Item onClick={signout}><span className="font-semibold text-cream-600">Sign out</span></Dropdown.Item>
      </Dropdown>
    </div>
  )
};

export default Navbar;
