"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Profile = () => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/AnalyticDashboard"); // Redirect to dashboard
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div>
        {/* Show Sign In Button when user is signed out */}
        <SignedOut>
          <SignInButton />
        </SignedOut>

        {/* Custom Clickable Profile */}
        <SignedIn>
          <div className="cursor-pointer" onClick={handleProfileClick}>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12 relative right-2 bottom-1",
                  userButtonBox: "w-10 h-11 relative top-2 left-1",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Profile;
