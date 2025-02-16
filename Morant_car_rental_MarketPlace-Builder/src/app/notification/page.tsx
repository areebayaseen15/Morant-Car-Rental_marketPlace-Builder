"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import { FaHome, FaCar, FaChartBar, FaEnvelope, FaCalendarAlt, FaCog, FaQuestionCircle, FaChartArea } from "react-icons/fa";
import { BsMoonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import Link from 'next/link';

const Notifications = () => {
  interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
  }

  interface FetchedNotification {
    _id: string;
    title: string;
    message: string;
    date: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data: FetchedNotification[] = await client.fetch(
        `*[_type == "notification"] | order(date desc) {
          _id,
          title,
          message,
          date
        }`
      );

      const formattedData: Notification[] = data.map((notification) => ({
        id: notification._id,
        title: notification.title,
        message: notification.message,
        time: new Date(notification.date).toLocaleString(),
        isRead: false, // Initialize as unread
      }));

      setNotifications(formattedData);
    };

    fetchNotifications();

    // GROQ Subscription for real-time updates
    const subscription = client
      .listen<FetchedNotification>(
        `*[_type == "notification"] | order(date desc) {
          _id,
          title,
          message,
          date
        }`
      )
      .subscribe((update) => {
        if (update.result) {
          const newNotification: Notification = {
            id: update.result._id,
            title: update.result.title,
            message: update.result.message,
            time: new Date(update.result.date).toLocaleString(),
            isRead: false,
          };
          setNotifications((prev) => [newNotification, ...prev]);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); // Add dark mode globally
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark mode
    }
  }, [darkMode]);

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

  return (
    <div>
      <Navbar />
      <div className="mt-32 max-w-[1440px] mx-auto p-4 flex flex-col lg:flex-row gap-6 dark:bg-slate-700 bg-[#F6F7F9]">
        {/* Sidebar Toggle Button for Small Screens */}
        <button
          className="lg:hidden mb-4 p-2 bg-blue-600 text-white rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        {/* Sidebar/Main Menu */}
        <div className={`lg:w-[286px] w-full dark:bg-slate-900 bg-white p-4 rounded-lg flex flex-col justify-between shadow-md ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <div>
            <h2 className="text-sm font-semibold text-[#94A7CB] dark:text-white opacity-40 mb-4">MAIN MENU</h2>
            <ul className="space-y-6 font-medium text-base text-[#94A7CB] dark:text-white">
              <li className="flex items-center gap-4 bg-[#3563E9] text-white px-4 py-2 rounded-md">
                <FaHome />
                <Link href="/UserDashboard">Dashboard</Link>
              </li>
              <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
                <FaCar />
                <Link href="/car-rent">Car Rent</Link>
              </li>
              <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
                <FaChartBar />
                <Link href="/insight">Insight</Link>
              </li>
              <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
                <FaChartArea />
                <Link href="/reimburse">Reimburse</Link>
              </li>
              <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
                <FaEnvelope />
                <Link href="inbox">Inbox</Link>
              </li>
              <li className="flex items-center gap-4 hover:bg-[#3563E9] hover:text-white px-4 py-2 rounded-md">
                <FaCalendarAlt />
                <Link href="/calendar">Calendar</Link>
              </li>
            </ul>
          </div>

          {/* Preferences */}
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-[#94A7CB] dark:text-white opacity-40 mb-4">PREFERENCE</h2>
            <ul className="space-y-8 font-medium text-base text-[#94A7CB] dark:text-white">
              <li className="flex items-center gap-4 hover:text-[#3B82F6] dark:text-white">
                <FaCog />
                <Link href="/setting">Settings</Link>
              </li>
              <li className="flex items-center gap-4 hover:text-[#3B82F6]">
                <FaQuestionCircle />
                <Link href="/help-center">Help & Center</Link>
              </li>
              <li className="flex items-center justify-between cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                <div className="flex items-center gap-4">
                  <BsMoonFill />
                  <span>Dark Mode</span>
                </div>
                <div className="w-10 h-5 flex items-center bg-gray-300 dark:bg-blue-600 rounded-full p-1">
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ${darkMode ? "translate-x-5" : ""}`}
                  ></div>
                </div>
              </li>
            </ul>
          </div>

          {/* Log Out */}
          <div className="mt-auto">
            <button className="flex items-center gap-2 text-[#94A7CB] dark:text-red-600 hover:text-[#3B82F6]">
              <CiLogout />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6">
          {/* Notifications List */}
          <div className="flex-1 p-6 rounded-lg shadow-md dark:bg-slate-900 bg-white">
            <h2 className="text-lg font-bold mb-4">Notifications</h2>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className={`p-4 mb-4 rounded-lg ${notification.isRead ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-900'}`}>
                  <h3 className="text-md font-semibold">{notification.title}</h3>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                  {!notification.isRead && (
                    <button
                      className="mt-2 text-blue-500 hover:underline"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
