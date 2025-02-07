"use client";

import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      <p className="mt-4">Hello, {user?.firstName || "User"}!</p>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
     
    </div>
  );
};

export default Dashboard;
