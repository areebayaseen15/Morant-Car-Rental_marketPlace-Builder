"use client";

import { useAuth, SignIn } from "@clerk/nextjs";
import Navbar from "../Components/navbar";
import { UserProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">
            Please sign in to access account settings
          </h1>
          <SignIn />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-6 max-w-4xl mt-40">
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
