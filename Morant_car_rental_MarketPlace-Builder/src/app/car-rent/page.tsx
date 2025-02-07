"use client";
import { useState } from "react";
import Navbar from "../Components/navbar";
import Link from "next/link";
import Image from "next/image";

const CarRent = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [carType, setCarType] = useState("");

  const cars = [
    { id: 1, name: "Nissan GT-R", price: "$100", image: "/nissan.png" },
    { id: 2, name: "Tesla Model S", price: "$150", image: "/tesla.png" },
    { id: 3, name: "BMW 5 Series", price: "$120", image: "/bmw.png" },
  ];

  const handleFormSubmit = (e:any) => {
    e.preventDefault();
    alert("Car rented successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Car Rent Page</h1>
        <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="pickupLocation" className="block text-gray-700 font-semibold">Pick-Up Location</label>
            <input
              type="text"
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Pick-Up Location"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dropoffLocation" className="block text-gray-700 font-semibold">Drop-Off Location</label>
            <input
              type="text"
              id="dropoffLocation"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Drop-Off Location"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="pickupDate" className="block text-gray-700 font-semibold">Pick-Up Date</label>
              <input
                type="date"
                id="pickupDate"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="dropoffDate" className="block text-gray-700 font-semibold">Drop-Off Date</label>
              <input
                type="date"
                id="dropoffDate"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="carType" className="block text-gray-700 font-semibold">Select Car</label>
            <select
              id="carType"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full px-4 py-2 border text-gray-700 rounded-md"
            >
              <option value="">Select a car</option>
              {cars.map((car) => (
                <option key={car.id} value={car.name}>
                  {car.name} - {car.price} per day
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md">Rent Now</button>
        </form>
      </div>
    </div>
  );
};

export default CarRent;
