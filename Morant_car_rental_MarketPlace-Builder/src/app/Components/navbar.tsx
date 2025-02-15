"use client"

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaHeart } from "react-icons/fa";
import { AiFillBell } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import Link from "next/link";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkMode";
import SettingsToggle from "./settingToggle";
import { UserProfile } from "@clerk/nextjs";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white  dark:bg-slate-800 text-black dark:text-white fixed top-0 left-0 w-full z-50 shadow-md dark:shadow-lg">
      <div className="xl:max-w-[1440px] h-[124px] flex flex-col md:flex-row gap-2 items-center justify-between px-4 py-4 mx-auto">
        <div className="flex justify-between items-center w-full">
          <Link
            href="/"
            className={`${plusJakartaSans.className} cursor-pointer lg:ml-[50px] text-[24px] md:text-[32px] leading-[48px] tracking-[-3%] font-bold text-blue-500`}
          >
            <div>MORENT</div>
          </Link>
        
{/* Mobile Profile Image */}
<div className="flex gap-5 ">

<Link href="/AnalyticDashboard">

<div className="rounded-full md:hidden  mt-2 ">
          <Profile/>
        </div>

        </Link>
          {/* Toggle Button for Mobile */}
          <button
            className="md:hidden text-gray-600 dark:text-white"
            onClick={toggleMenu}
          >
            ☰
          </button>
</div>

        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex gap-5 justify-center space-y-10  md:hidden w-full bg-white px-4 py-2">
              <Link href="/wishlist">
              <div className="w-11 h-11 mt-10 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
                <FaHeart className="dark:bg-black text-gray-600 dark:text-blue-600 w-6 h-6 hover:text-blue-500 cursor-pointer" />
              </div>
              </Link>


            <Link href="/notification">
              <div className="relative w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
                <AiFillBell className="dark:bg-black text-gray-600 dark:text-blue-600 w-6 h-6 hover:text-red-500 cursor-pointer" />
                <span className="absolute top-2 right-2 bg-red-500 w-2 h-2 rounded-full"></span>
              </div>
            </Link>

            <Link href="/setting">
              <div className="w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
                <IoIosSettings className="dark:bg-black text-gray-600 dark:text-blue-600 w-6 h-6 hover:text-blue-500 cursor-pointer" />
              </div>
            </Link>

          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/wishlist">
            <div className="w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
              <FaHeart className="dark:bg-black text-gray-600 dark:text-blue-600 w-6 h-6 hover:text-red-500 cursor-pointer" />
            </div>
          </Link>

          <Link href="/Notifications2">
            <div className="relative w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
              <AiFillBell className="dark:bg-black text-gray-600 dark:text-blue-600 w-6 h-6 hover:text-red-500 cursor-pointer" />
              <span className="absolute top-2 right-2 bg-red-500 w-2 h-2 rounded-full"></span>
            </div>
          </Link>

          <Link href="/setting">
            <div className="w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px]">
              <IoIosSettings className="dark:bg-black text-gray-600 dark:text-blue-600 w-6 h-6 hover:text-blue-500 cursor-pointer" />
            </div>
          </Link>

          <Link href="/AnalyticDashboard">
          <div className="rounded-full mt-2">
            <Profile />
          </div>
          </Link>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
