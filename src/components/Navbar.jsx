import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { IoMdNotificationsOff } from "react-icons/io";
import { FcAdvertising } from "react-icons/fc";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 shadow-md py-4 px-6 bg-white dark:bg-gray-900 dark:text-white  z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">E-Shop</div>

        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          </Link>

          <button className="text-lg font-medium text-blue-600  text-decoration-none">
            Login
          </button>
          <DarkModeToggle />

          <button className="" onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-full right-4 w-full md:w-[300px] bg-white dark:bg-gray-800 shadow-md py-4 px-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col gap-4 text-gray-700 dark:text-white font-bold">
            <li className="hover:text-blue-600 cursor-pointer flex items-center gap-5">
              <RxLapTimer /> 24/7 Support
            </li>
            <li className="hover:text-blue-600 cursor-pointer flex items-center gap-5">
              <IoMdNotificationsOff /> Notifications
            </li>
            <li className="hover:text-blue-600 cursor-pointer flex items-center gap-5">
              <FcAdvertising /> Advertise with Us
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
