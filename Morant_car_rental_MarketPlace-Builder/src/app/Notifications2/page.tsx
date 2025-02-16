"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Navbar from "../Components/navbar";

interface CustomNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
  userId?: string;
  isRead: boolean;
}

const Notifications = () => {

  interface FetchedNotification {
    _id: string;
    title: string;
    message: string;
    date: string;
    type: string;
    userId?: string;
  }

  const [notifications, setNotifications] = useState<CustomNotification[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const currentUserId = "123"; // Yeh logged-in user ka actual ID set karna hoga

  useEffect(() => {
    const fetchNotifications = async () => {
      const data: FetchedNotification[] = await client.fetch(
        `*[_type == "notification"] | order(date desc) {
          _id,
          title,
          message,
          date,
          type,
          userId
        }`
      );

      const formattedData: CustomNotification[] = data.map((notification) => ({
        id: notification._id,
        title: notification.title,
        message: notification.message,
        time: new Date(notification.date).toLocaleString(),
        type: notification.type,
        userId: notification.userId,
        isRead: false,
      }));

      setNotifications(formattedData);
    };

    fetchNotifications();

    // Real-time updates from Sanity
    const subscription = client
      .listen<FetchedNotification>(
        `*[_type == "notification"] | order(date desc) {
          _id,
          title,
          message,
          date,
          type,
          userId
        }`
      )
      .subscribe((update) => {
        if (update.result) {
          const newNotification: CustomNotification = {
            id: update.result._id,
            title: update.result.title,
            message: update.result.message,
            time: new Date(update.result.date).toLocaleString(),
            type: update.result.type,
            userId: update.result.userId,
            isRead: false,
          };
          setNotifications((prev) => [newNotification, ...prev]);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Filters
  const generalNotifications = notifications.filter(n => n.type === "general");
  const carBookingNotifications = notifications.filter(n => n.type === "car_booking");
  const userMessages = notifications.filter(n => n.type === "user_message" && n.userId === currentUserId);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 dark:bg-slate-900 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Notifications ({notifications.length})
            </h2>
          </div>

          {/* General Notifications */}
          <h3 className="px-6 py-2 text-gray-700 dark:text-white font-semibold">General Notifications</h3>
          <div className="divide-y dark:divide-gray-700">
            {generalNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} markAsRead={markAsRead} deleteNotification={deleteNotification} />
            ))}
          </div>

          {/* Car Booking Notifications */}
          <h3 className="px-6 py-2 text-gray-700 dark:text-white font-semibold">Car Booking</h3>
          <div className="divide-y dark:divide-gray-700">
            {carBookingNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} markAsRead={markAsRead} deleteNotification={deleteNotification} />
            ))}
          </div>

          {/* User-Specific Messages */}
          <h3 className="px-6 py-2 text-gray-700 dark:text-white font-semibold">Personal Messages</h3>
          <div className="divide-y dark:divide-gray-700">
            {userMessages.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} markAsRead={markAsRead} deleteNotification={deleteNotification} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// **Component for Individual Notification Item**
const NotificationItem = ({ notification, markAsRead, deleteNotification }: { 
  notification: CustomNotification; 
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}) => (
  <div
    className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700 ${
      notification.isRead ? "bg-gray-200 dark:bg-slate-700" : "bg-white dark:bg-slate-800"
    }`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-700 dark:text-white">{notification.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{notification.time}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => markAsRead(notification.id)}
          className="text-blue-500 dark:text-blue-400 hover:underline"
        >
          Mark as Read
        </button>
        <button
          onClick={() => deleteNotification(notification.id)}
          className="text-red-500 dark:text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default Notifications;
