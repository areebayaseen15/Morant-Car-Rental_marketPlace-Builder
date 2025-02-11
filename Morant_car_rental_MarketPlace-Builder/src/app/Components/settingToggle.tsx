"use client";

import { useState } from "react";
import { UserProfile, UserButton } from "@clerk/nextjs";
import { IoIosSettings } from "react-icons/io";

const SettingsToggle = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative">
      <div
        className="w-11 h-11 rounded-full border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[10px] py-[10px] cursor-pointer"
        onClick={() => setShowSettings(!showSettings)}
      >
        <IoIosSettings className="text-gray-600 w-6 h-6 hover:text-blue-500 cursor-pointer" />
      </div>

      {/* Clerk Settings Modal */}
      {showSettings && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-[300px] z-50">
          <UserProfile />
        </div>
      )}
    </div>
  );
};

export default SettingsToggle;
