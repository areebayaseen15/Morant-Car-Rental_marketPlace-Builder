"use client"

import React from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
  
const Profile = () => {
  return (
    <div>
        <div className=" rounded-full cursor-pointer mt-2 w-12 h-12 border-[1px] border-[#C3D4E9] border-opacity-[80%] px-[7px] py-[7px]">
          <SignedOut >
           
            <SignInButton />
          </SignedOut>
          <SignedIn>

           

            <UserButton />

          </SignedIn>
          </div>

    </div>
  )
}

export default Profile
