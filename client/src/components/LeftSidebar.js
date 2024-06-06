import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { GiBuyCard } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";
import { FaRegistered } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { MdMedicalServices } from "react-icons/md";

const Navbar = () => {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await axios.get("https://two-wheeler-gilt.vercel.app/api/user/logout");
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && user.length > 10) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-[#78350f] fixed z-[1003] p-4 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="rounded hover:bg-black hover:text-white flex items-center p-2"
          >
            <IoHomeSharp />
            <span className="ml-2">Home</span>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <HiOutlineX size={24} />
            ) : (
              <HiOutlineMenu size={24} />
            )}
          </button>
        </div>
        <div
          className={`md:flex items-center space-x-4 ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <Link
            to="/aboutus"
            className="rounded hover:bg-black hover:text-white flex items-center p-2"
          >
            <FaInfoCircle />
            <span className="ml-2">About Us</span>
          </Link>
          <Link
            to="/services"
            className="rounded hover:bg-black hover:text-white flex items-center p-2"
          >
            <MdMedicalServices />
            <span className="ml-2">Services</span>
          </Link>
          {isLoggedIn ? (
            <Link
              to="/addServices"
              className="rounded hover:bg-black hover:text-white flex items-center p-2"
            >
              <RiAdminFill />
              <span className="ml-2">Admin Dashboard</span>
            </Link>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <Link
              to="/contactus"
              className="rounded hover:bg-black hover:text-white flex items-center p-2"
            >
              <IoMdContact />
              <span className="ml-2">Contact Us</span>
            </Link>
          ) : (
            <></>
          )}
          <Link
            to="/feedback"
            className="rounded hover:bg-black hover:text-white flex items-center p-2"
          >
            <MdFeedback />
            <span className="ml-2">Feedback</span>
          </Link>
          {isLoggedIn ? (
            <div className="rounded hover:bg-black hover:text-white flex items-center p-2">
              <RiLogoutCircleFill />
              <button onClick={handleLogout} className="ml-2">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded hover:bg-black hover:text-white flex items-center p-2"
              >
                <RiLoginCircleFill />
                <span className="ml-2">Login</span>
              </Link>
              <Link
                to="/register"
                className="rounded hover:bg-black hover:text-white flex items-center p-2"
              >
                <GiBuyCard />
                <span className="ml-2">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
