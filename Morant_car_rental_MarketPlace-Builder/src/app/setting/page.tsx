"use client";

import { UserProfile } from "@clerk/nextjs";
import Navbar from "../Components/navbar";

const SettingsPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-6 max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-600 dark:text-blue-400">
          Account Settings
        </h1>
        <div className="flex justify-center">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
