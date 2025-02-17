'use client';
import React, { useState } from "react";
import Navbar from "../Components/navbar";

const ReimbursementPage = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    amount: string;
    date: string;
    reason: string;
    receipt: File | null;
  }>({
    name: "",
    email: "",
    amount: "",
    date: "",
    reason: "",
    receipt: null,
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      receipt: file,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Reimbursement Request Submitted:", formData);
    setSubmissionSuccess(true);
    setFormData({
      name: "",
      email: "",
      amount: "",
      date: "",
      reason: "",
      receipt: null,
    });
    setTimeout(() => setSubmissionSuccess(false), 3000); // Hide message after 3 seconds
  };

  return (
    <>
    <Navbar/>
      <div className="relative min-h-screen flex items-center justify-center  py-40 dark:bg-slate-900 bg-gray-100">
        <div className="bg-white dark:bg-slate-700 w-full max-w-lg p-8 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold text-center text-blue-500 mb-6">
            Reimbursement Request Form
          </h2>

          {submissionSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
              Your reimbursement request has been submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700  text-lg font-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-300 border  text-gray-700 border-gray-300 rounded-lg"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 mt-2 bg-gray-100  dark:bg-gray-300 border  text-gray-700 border-gray-300 rounded-lg"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-300 border  text-gray-700 border-gray-300 rounded-lg"
                placeholder="Enter reimbursement amount"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold">Date of Expense</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-300 border  text-gray-700 border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold">Reason for Reimbursement</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-300 border  text-gray-700 border-gray-300 rounded-lg"
                rows={4}
                placeholder="Describe the reason for reimbursement"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-semibold">Receipt Upload</label>
              <input
                type="file"
                name="receipt"
                onChange={handleFileChange}
                className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-300 border  text-gray-700 border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 ease-in-out"
                onClick={() => setFormData({ name: "", email: "", amount: "", date: "", reason: "", receipt: null })}
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReimbursementPage
