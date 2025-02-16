"use client";
import { useUser } from "@clerk/clerk-react"; // Clerk for user authentication
import { client } from "@/sanity/lib/client"; // Sanity client
import { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "../Components/navbar";

interface WishlistItem {
  _id: string;
  name: string;
  image: string;
  pricePerDay: number;
  type: string;
}

const Wishlist = () => {
  const { user } = useUser(); // current logged-in user
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]); 

  // Fetch wishlist data on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const userId = user.id;

        try {
          const result = await client.fetch(
            `*[_type == "user" && clerkId == $clerkId][0]{
              wishlist[]->{
                _id,
                name,
                image,
                pricePerDay,
                type
              }
            }`,
            { clerkId: userId }
          );

          setWishlist(result?.wishlist || []); // Set wishlist data
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  // Function to remove item from wishlist
  const removeFromWishlist = async (carId: string) => {
    if (user) {
      const userId = user.id;

      try {
        // Fetch the user's document ID
        const userDoc = await client.fetch(
          `*[_type == "user" && clerkId == $clerkId][0]`,
          { clerkId: userId }
        );

        if (userDoc) {
          // Remove the car from the wishlist array
          await client
            .patch(userDoc._id)
            .unset([`wishlist[_ref=="${carId}"]`])
            .commit();

          // Update the wishlist state
          setWishlist((prev) => prev.filter((item) => item._id !== carId));
          alert("Car removed from wishlist!");
        }
      } catch (error) {
        console.error("Error removing item from wishlist:", error);
        alert("Failed to remove car from wishlist. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar/>
      
      <h1 className="text-2xl mt-40 font-bold mb-4 text-center">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <Image
                src={urlFor(item.image).url()}
                alt={item.name}
                width={200}
                height={150}
                className="object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.type}</p>
              <p className="text-lg font-bold text-blue-600">
                {item.pricePerDay}
              </p>
              {/* Delete from Wishlist button */}
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete from Wishlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
