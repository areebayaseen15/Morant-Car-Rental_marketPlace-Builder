'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Navbar from '../Components/navbar';

const HelpAndCenter = () => {
  const { user } = useUser(); // Get user info from Clerk
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackList, setFeedbackList] = useState<{ username: string; imageUrl: string; text: string }[]>([]);

  useEffect(() => {
    // Load feedback from localStorage on mount
    const storedFeedback = localStorage.getItem('feedbacks');
    if (storedFeedback) {
      setFeedbackList(JSON.parse(storedFeedback));
    }
  }, []);

  const faqs = [
    {
      question: "How do I make a reservation?",
      answer: "To make a reservation, simply select your desired car, choose your rental dates, and complete the booking form. You will receive a confirmation email once your reservation is successful."
    },
    {
      question: "What is the cancellation policy?",
      answer: "You can cancel your reservation up to 24 hours before the scheduled pick-up time without any charges. Cancellations made within 24 hours may incur a fee."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You will need a valid driver's license, a credit card in your name, and proof of insurance. Additional identification may be required based on your location."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental period by contacting our customer service team. Additional charges may apply based on the extended duration."
    },
  ];

  const handleFAQToggle = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.fullName || !user.imageUrl) {
      alert('Please log in to submit feedback.');
      return;
    }

    const newFeedback = { 
      username: user.fullName, 
      imageUrl: user.imageUrl, // Clerk profile image
      text: feedback 
    };

    const updatedFeedbackList = [...feedbackList, newFeedback];

    setFeedbackList(updatedFeedbackList);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbackList));

    setFeedbackSubmitted(true);
    setFeedback('');
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  // Function to delete feedback
  const handleDeleteFeedback = (index: number) => {
    const updatedFeedbackList = feedbackList.filter((_, i) => i !== index);
    setFeedbackList(updatedFeedbackList);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbackList));
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-5 py-20 md:p-20  bg-blue-50 mt-36">
        <div className="max-w-4xl lg:mx-auto bg-white rounded-lg shadow-lg p-10">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Help and Support Center</h1>

          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 mb-6 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-4">
              {faqs.filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase())).map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleFAQToggle(index)}
                    className="w-full text-left p-4 bg-blue-100 rounded-lg shadow-sm hover:bg-blue-200 transition duration-200"
                  >
                    <h3 className="text-lg font-medium text-blue-600">{faq.question}</h3>
                  </button>
                  {openFAQ === index && (
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-2">If you have any questions or need assistance, feel free to reach out to us:</p>
            <p className="text-gray-600">Email: Morent@carrental.com</p>
            <p className="text-gray-600">Phone: +1 (800) 123-4567</p>
            <p className="text-gray-600">Business Hours: Mon - Fri, 9 AM - 5 PM</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Feedback</h2>
            {feedbackSubmitted && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                Thank you for your feedback!
              </div>
            )}
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Your feedback or question..."
                className="w-full p-4 mb-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit Feedback
              </button>
            </form>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Recent Feedback</h2>
            {feedbackList.length === 0 ? (
              <p className="text-gray-600">No feedback submitted yet.</p>
            ) : (
              <ul className="space-y-4">
                {feedbackList.map((fb, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-lg shadow flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={fb.imageUrl} alt={fb.username} className="w-10 h-10 rounded-full border border-blue-500" />
                      <div>
                        <p className="font-medium text-blue-600">{fb.username}:</p>
                        <p className="text-gray-700">{fb.text}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteFeedback(index)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpAndCenter;
