"use client";

import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Profile = () => {
  return (
    <div >
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-12 h-12 relative right-2 bottom-1",
                userButtonBox:"w-10 h-11 relative top-2 left-1", 
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Profile;
