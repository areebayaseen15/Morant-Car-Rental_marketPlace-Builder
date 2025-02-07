"use client";

import { useState } from "react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Car Added!",
      message: "Check out the latest Ford Mustang available now.",
      date: " 10:00 AM",
      type: "info",
      category: "New Cars",
      isRead: false,
    },
    {
      id: 2,
      title: "Limited Time Offer",
      message: "Get 20% off on rentals for the next 24 hours.",
      date: " 02:00 PM",
      type: "success",
      category: "Discounts",
      isRead: false,
    },
    {
      id: 3,
      title: "Service Reminder",
      message: "Your car rental subscription is due for renewal.",
      date: " 08:00 AM",
      type: "warning",
      category: "Reminders",
      isRead: true,
    },
    {
      id: 4,
      title: "Special Offer",
      message: "There's a special offer on car rentals for this week!",
      date: " 10:00 AM",
      type: "warning",
      category: "Promotions",
      isRead: false,
    },
    {
      id: 5,
      title: "New Luxury Cars",
      message: "New luxury cars available for rent. Check them out!",
      date: "03:45 PM",
      type: "info",
      category: "New Cars",
      isRead: false,
    },
  ]);

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Remove a notification
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 py-10 px-6">
      <div className="container mx-auto max-w-3xl">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
          Notifications
        </h1>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-xl font-semibold text-gray-500">
              🎉 You are all caught up! No new notifications.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`relative p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl ${
                  notification.isRead
                    ? "bg-gray-50 border-l-4 border-gray-300"
                    : "bg-white border-l-4 border-blue-500"
                }`}
              >
                {/* Notification Details */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {notification.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.category} • {notification.date}
                    </p>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* New Notification Badge */}
                {!notification.isRead && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
