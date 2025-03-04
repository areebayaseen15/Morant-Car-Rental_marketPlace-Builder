"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import Link from "next/link";
import ProductListing from '@/app/Components/ProductList2';

export default function Hero() {
  const [pickup, setPickup] = useState({ location: "", date: "", time: "" });
  const [dropoff, setDropoff] = useState({ location: "", date: "", time: "" });

  const cities = ["Select City", "Garden", "Bahria Town", "Sadar", "Clifton", "Defence", "North Nazimabad"];

  return (
    <div className="overflow-hidden w-full mt-10 lg:mt-0 bg-[#F6F7F9] dark:bg-gray-900 text-black dark:text-white">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 mx-auto gap-4 p-8 pt-40">
        {/* First Card */}
        <div className="bg-[#54A6FF] dark:bg-blue-700 max-w-[640px] h-[360px] text-white rounded-[10px] flex flex-col items-start justify-between p-5 relative">
          <div className="flex-1">
            <h1 className="mb-4 font-medium text-[32px] leading-10 tracking-tight text-left">
              The Best Platform <br /> for Car Rental
            </h1>
            <p className="mb-4 text-base font-medium tracking-tight">
              Ease of doing car rental safely and <br /> reliably. Of course at a low price.
            </p>
            <Link href="/Payment">
              <button className="bg-[#3563E9] dark:bg-blue-800 w-[120px] h-11 text-base font-medium tracking-tight hover:bg-[#54A6FF] text-white px-5 rounded-[4px]">
                Rental Car
              </button>
            </Link>
          </div>
          <div className="absolute bottom-4 left-4">
            <Image src="/Assets/car-01.png" alt="Car 1" height={400} width={500} className="lg:ml-0 xl:ml-28" />
          </div>
        </div>

        {/* Second Card */}
        <div className="hidden md:flex bg-[#3563E9] dark:bg-blue-800 max-w-[640px] h-[360px] text-white rounded-[10px] flex-col items-start justify-between p-5 relative">
          <div className="flex-1">
            <h1 className="mb-4 font-medium text-[32px] leading-10 tracking-tight text-left">
              Easy way to rent a <br /> car at a low price
            </h1>
            <p className="mb-4 text-base font-medium tracking-[-3%]">
              Providing cheap car rental services <br /> and safe and comfortable facilities.
            </p>
            <Link href="/Payment">
              <button className="bg-[#54A6FF] dark:bg-blue-700 w-[120px] h-11 text-base font-medium tracking-tight hover:bg-blue-700 text-white px-5 rounded-[4px]">
                Rental Car
              </button>
            </Link>
          </div>
          <div className="absolute bottom-4 right-40">
            <Image src="/Assets/car-2.png" alt="Car 1" height={450} width={560} className="lg:ml-10 xl:ml-28" />
          </div>
        </div>
      </div>

      {/* 🚗 Pickup and Drop-off Cards with Arrow Button in Between */}
      <div className="flex flex-col lg:flex-row mx-20 items-center lg:justify-center lg:gap-6 md:mt-10 mt-0 lg:mx-10">
        {/* Pick-Up Card */}
        <div className="lg:items-start md:w-[500px] md:items-center w-[350px] lg:mx-w-[600px] xl:mx-w-[582px] bg-white dark:bg-slate-800 rounded-[10px] shadow-xl px-4 py-4">
          <div className="flex gap-3">
            <Image src="/Assets/mark.png" alt="mark" width={20} height={20} />
            <h3 className="text-[16px] lg:text-xl font-semibold text-gray-800 dark:text-white">Pick-Up</h3>
          </div>
          <div className="mt-5 flex flex-row justify-between gap-3 items-center">
            {/* Location Input */}
            <div>
              <h1 className="text-[#1A202C] dark:text-white font-extrabold text-[16px] leading-[24px]">Location</h1>
              <select
                className="w-full p-2 border-r rounded-md text-[#90A3BF] dark:text-gray-300 font-bold bg-gray-100 dark:bg-slate-700"
                value={pickup.location}
                onChange={(e) => setPickup({ ...pickup, location: e.target.value })}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Input */}
            <div>
              <h1 className="text-[#1A202C] dark:text-white mx-10 lg:mx-auto font-extrabold text-[16px] leading-[24px]">Date</h1>
              <input
                type="date"
                value={pickup.date}
                onChange={(e) => setPickup({ ...pickup, date: e.target.value })}
                className="w-full p-2 border-r rounded-md text-[#90A3BF] dark:text-gray-300 font-bold bg-gray-100 dark:bg-slate-700"
              />
            </div>

            {/* Time Input */}
            <div>
              <h1 className="text-[#1A202C] dark:text-white font-extrabold text-[16px] leading-[24px]">Time</h1>
              <input
                type="time"
                value={pickup.time}
                onChange={(e) => setPickup({ ...pickup, time: e.target.value })}
                className="w-20 lg:w-full p-2 border-r rounded-md text-[#90A3BF] dark:text-gray-300 font-bold bg-gray-100 dark:bg-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Arrow Button Between Cards */}
        <div className="flex justify-center items-center lg:flex-col">
          <div className="flex bg-[#3563E9] dark:bg-blue-800 w-[70px] h-[70px] lg:w-[80px] lg:h-[80px] hover:bg-[#2b4699] justify-center items-center rounded-xl">
            <IoArrowUp className="text-white text-2xl w-[64px] h-[64px]" />
            <IoArrowDown className="text-white text-2xl w-[64px] h-[64px]" />
          </div>
        </div>

        {/* Drop-Off Card */}
        <div className="lg:items-start md:w-[500px] md:items-center w-[350px] lg:mx-w-[600px] xl:mx-w-[582px] bg-white dark:bg-slate-800 rounded-[10px] shadow-xl px-4 py-4">
          <div className="flex gap-3">
            <Image src="/Assets/mark.png" alt="mark" width={20} height={20} />
            <h3 className="text-[16px] lg:text-xl font-semibold text-gray-800 dark:text-white">Drop-Off</h3>
          </div>
          <div className="mt-5 flex flex-row justify-between gap-3 items-center">
            {/* Location Input */}
            <div>
              <h1 className="text-[#1A202C] dark:text-white font-extrabold text-[16px] leading-[24px]">Location</h1>
              <select
                className="w-full p-2 border-r rounded-md text-[#90A3BF] dark:text-gray-300 font-bold bg-gray-100 dark:bg-slate-700"
                value={dropoff.location}
                onChange={(e) => setDropoff({ ...dropoff, location: e.target.value })}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Input */}
            <div>
              <h1 className="text-[#1A202C] dark:text-white mx-10 lg:mx-auto font-extrabold text-[16px] leading-[24px]">Date</h1>
              <input
                type="date"
                value={dropoff.date}
                onChange={(e) => setDropoff({ ...dropoff, date: e.target.value })}
                className="w-full p-2 border-r rounded-md text-[#90A3BF] dark:text-gray-300 font-bold bg-gray-100 dark:bg-slate-700"
              />
            </div>

            {/* Time Input */}
            <div>
              <h1 className="text-[#1A202C] dark:text-white font-extrabold text-[16px] leading-[24px]">Time</h1>
              <input
                type="time"
                value={dropoff.time}
                onChange={(e) => setDropoff({ ...dropoff, time: e.target.value })}
                className="w-20 lg:w-full p-2 border-r rounded-md text-[#90A3BF] dark:text-gray-300 font-bold bg-gray-100 dark:bg-slate-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🚘 Filtered Product Listing */}
      <ProductListing pickup={pickup.location} dropoff={dropoff.location} />
    </div>
  );
}
