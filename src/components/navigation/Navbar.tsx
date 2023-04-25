import React from "react";
import { AiFillHome } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      {/* Desktop view */}
      <nav className="hidden sm:flex sm:fixed top-0 left-0 right-0 p-5 items-center justify-between bg-black">
        <Link to="/" className="flex items-center gap-2  cursor-pointer">
          <HiPencil className="w-7 h-7 text-gray-300" />
          <span className="text-lg text-gray-300">Account Note</span>
        </Link>
        {/* Link lists */}
        <ul>
          <li>
            <Link
              className="p-2 border-solid border-[1px] border-gray-400 rounded-md text-gray-300 "
              to="/new-account"
            >
              Add Account
            </Link>
          </li>
        </ul>
      </nav>
      {/* Mobile view */}
      <nav className="fixed sm:hidden bottom-0 left-[50%] translate-x-[-50%] w-full p-5 bg-black">
        <ul className="flex items-center justify-evenly">
          <li>
            <Link to="/">
              <AiFillHome className="w-7 h-7 text-gray-300" />
            </Link>
          </li>
          <li>
            <Link to="/new-account">
              <IoMdAddCircle className="w-7 h-7 text-gray-300" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
