"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useUser } from "@clerk/nextjs";

// Define types
interface Review {
  id: number;
  name: string;
  role: string;
  date: string;
  rating: number;
  review: string;
  profile: string | StaticImport;
}

interface NewReview {
  name: string;
  role: string;
  rating: number;
  review: string;
}

const Reviews = () => {
  const { user } = useUser();
  
  // 🔹 Start with an empty array (remove previous reviews)

  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== "undefined") {
      const storedReviews = localStorage.getItem("reviews");
      return storedReviews
        ? JSON.parse(storedReviews)
        : [
            {
              id: 1,
              name: "Alex Stanton",
              role: "CEO at Bukalapak",
              date: "21-July-2024",
              rating: 4,
              review:
                "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
              profile: "/Assets/Profill.png",
            },
            {
              id: 2,
              name: "Skylar Dias",
              role: "CEO at Amazon",
              date: "21-July-2024",
              rating: 4,
              review:
                "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
              profile: "/Assets/Profill (1).png",
            },
          ];
    }
    return [];
  });
  const [newReview, setNewReview] = useState<NewReview>({
    name: "",
    role: "",
    rating: 0,
    review: "",
  });


  const [showForm, setShowForm] = useState(false);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  // 🔹 Handle rating selection (stars clickable)
  const handleRatingClick = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userProfile = user?.imageUrl || "/Assets/anonymous.png"; 

    if (newReview.name && newReview.role && newReview.rating && newReview.review) {
      const updatedReviews: Review[] = [
        ...reviews,
        {
          id: reviews.length + 1,
          name: newReview.name, // 🔹 Use user input name
          role: newReview.role,
          date: new Date().toLocaleDateString(),
          rating: newReview.rating,
          review: newReview.review,
          profile: userProfile,
        },
      ];
      setReviews(updatedReviews);
      setNewReview({ name: "", role: "", rating: 0, review: "" });
      setShowForm(false);

      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }
  }, [reviews]);

  return (
    <div className="flex flex-col items-center">
      {/* Reviews Section */}
      <div className="w-[90%] max-w-[960px] bg-white dark:bg-slate-800 shadow-lg p-5 rounded-lg mt-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[20px] font-bold text-gray-800 dark:text-white">Reviews</h2>
          <span className="bg-[#3563E9] text-white px-4 py-1 rounded-lg">{reviews.length}</span>
        </div>
        <div className="flex items-center mb-5">
          <h3 className="text-[16px] font-medium text-gray-800 dark:text-white">Average Rating:</h3>
          <div className="flex ml-2">
            {[...Array(5)].map((_, i) =>
              i < Math.round(averageRating) ? (
                <IoStarSharp key={i} className="text-yellow-500 text-xl" />
              ) : (
                <IoIosStarOutline key={i} className="text-gray-400 text-xl" />
              )
            )}
          </div>
          <span className="ml-2 text-gray-500 dark:text-gray-300">({averageRating.toFixed(1)})</span>
        </div>

        {/* Reviews List */}
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 dark:border-gray-700 py-4 flex flex-col lg:flex-row items-start"
          >
            <div className="flex items-start gap-3">
              {review.profile && (
                <Image
                  src={review.profile}
                  alt="Profile"
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              )}
              <div>
                <h4 className="font-bold text-[16px] text-gray-800 dark:text-white">{review.name}</h4>
                <p className="text-gray-500 dark:text-gray-300 text-[12px]">{review.role}</p>
                <p className="text-gray-400 dark:text-gray-500 text-[12px]">{review.date}</p>
              </div>
            </div>
            <div className="flex flex-col ml-20 items-start">
              <div className="mt-3 lg:mt-0 flex">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <IoStarSharp key={i} className="text-yellow-500 text-xl" />
                  ) : (
                    <IoIosStarOutline key={i} className="text-gray-400 text-xl" />
                  )
                )}
              </div>
              <p className="mt-3 lg:mt-0 text-gray-700 dark:text-gray-300 text-[14px] w-full">{review.review}</p>
            </div>
          </div>
        ))}

        {/* Submit Review Button */}
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-[#3563E9] text-white px-4 py-2 rounded-lg mt-5">
            Submit Your Review
          </button>
        )}

        {/* Review Form */}
        {showForm && (
          <form className="w-full bg-white dark:bg-slate-800 mt-5 p-5 rounded-lg" onSubmit={handleSubmit}>
            <h3 className="text-[18px] font-bold mb-4 text-gray-800 dark:text-white">Submit a Review</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={newReview.name}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white"
              />
              <input
                type="text"
                name="role"
                placeholder="Your Role"
                value={newReview.role}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white"
              />
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white"
              >
                <option value="0">Select Rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} Star{i > 0 && "s"}
                  </option>
                ))}
              </select>
              <textarea
                name="review"
                placeholder="Write your review"
                value={newReview.review}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white"
              ></textarea>
              <button type="submit" className="bg-[#3563E9] text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reviews
