
// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, 
//   HelpCircle, 
//   Send, 
//   X, 
//   ChevronRight, 
//   Clock, 
//   AlertCircle, 
//   CheckCircle 
// } from 'lucide-react';

// interface Subtopic {
//   title: string;
//   description: string;
//   commonQuestions?: string[];
// }

// interface Topic {
//   id: number;
//   title: string;
//   details: string;
//   icon: React.ElementType;
//   subtopics: Subtopic[];
// }

// const HelpCenter = () => {
//   const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
//   const [recentQueries, setRecentQueries] = useState<string[]>([]);

//   const topics: Topic[] = [
//     { 
//       id: 1, 
//       icon: HelpCircle,
//       title: 'Booking & Reservations', 
//       details: 'Learn how to make, modify, and cancel a reservation easily.', 
//       subtopics: [
//         { 
//           title: 'Making a Reservation', 
//           description: 'Steps to book a car online.',
//           commonQuestions: [
//             'How do I create a new reservation?',
//             'What documents do I need?',
//             'Can I book a car for someone else?'
//           ]
//         },
//         { 
//           title: 'Modifying Reservations', 
//           description: 'How to change dates or pick-up locations.',
//           commonQuestions: [
//             'Can I change my reservation date?',
//             'How to switch pick-up location?',
//             'Fees for reservation changes'
//           ]
//         },
//         { 
//           title: 'Canceling Reservations', 
//           description: 'Instructions on canceling a booking.',
//           commonQuestions: [
//             'Cancellation policy',
//             'How to cancel a reservation',
//             'Refund process'
//           ]
//         }
//       ]
//     },
//     // ... (other topics remain the same)
//   ];

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = topics.filter(topic => 
//         topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         topic.subtopics.some(subtopic => 
//           subtopic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           subtopic.description.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//       setFilteredTopics(filtered);
//     } else {
//       setFilteredTopics(topics);
//     }
//   }, [searchQuery]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormStatus('sending');

//     try {
//       // Simulate API call 
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Add to recent queries
//       setRecentQueries(prev => [formData.message, ...prev].slice(0, 5));

//       setFormStatus('success');
//       setTimeout(() => {
//         setIsModalOpen(false);
//         setFormData({ name: '', email: '', message: '' });
//         setFormStatus('idle');
//       }, 2000);
//     } catch (error) {
//       setFormStatus('error');
//       setTimeout(() => setFormStatus('idle'), 2000);
//     }
//   };

//   const renderSubtopics = (subtopics: Subtopic[]) => {
//     return subtopics.map((subtopic, index) => (
//       <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 hover:bg-gray-100 transition">
//         <h4 className="text-xl font-semibold text-gray-800 flex items-center">
//           <HelpCircle className="mr-2 text-blue-500" size={20} />
//           {subtopic.title}
//         </h4>
//         <p className="text-gray-700 mt-2">{subtopic.description}</p>
//         {subtopic.commonQuestions && (
//           <div className="mt-4">
//             <p className="text-sm font-medium text-gray-600 mb-2">Common Questions:</p>
//             <div className="space-y-2">
//               {subtopic.commonQuestions.map((q, idx) => (
//                 <div 
//                   key={idx} 
//                   className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer flex items-center"
//                 >
//                   <ChevronRight size={16} className="mr-1" />
//                   {q}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     ));
//   };

//   const renderTopicDetails = (topicId: number) => {
//     const topic = topics.find((t) => t.id === topicId);
//     if (topic) {
//       return (
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
//             <topic.icon className="mr-3 text-blue-500" size={24} />
//             {topic.title}
//           </h3>
//           <p className="text-gray-700 mb-6">{topic.details}</p>
//           {renderSubtopics(topic.subtopics)}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="w-full h-full mx-auto px-4 py-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
//           Help & Support Center
//         </h1>

//         {/* Search Bar */}
//         <div className="mb-8 relative">
//           <input 
//             type="text" 
//             placeholder="Search help topics, questions, or keywords"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-4 pl-12 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>

//         {/* Topics Grid */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           {(searchQuery ? filteredTopics : topics).map((topic) => (
//             <div
//               key={topic.id}
//               className="bg-white border-2 border-transparent rounded-xl p-6 cursor-pointer 
//               transform transition-all duration-300 hover:border-blue-500 hover:shadow-xl group"
//               onClick={() => setSelectedTopic(topic.id)}
//             >
//               <div className="flex items-center mb-4">
//                 <topic.icon 
//                   className="mr-4 text-blue-500 group-hover:text-blue-700 transition" 
//                   size={32} 
//                 />
//                 <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700">
//                   {topic.title}
//                 </h2>
//               </div>
//               <p className="text-gray-600">{topic.details}</p>
//             </div>
//           ))}
//         </div>

//         {/* Recent Queries Section */}
//         {recentQueries.length > 0 && (
//           <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//             <h3 className="text-xl font-semibold mb-4 flex items-center">
//               <Clock className="mr-2 text-blue-500" size={20} />
//               Recent Queries
//             </h3>
//             <div className="space-y-2">
//               {recentQueries.map((query, index) => (
//                 <div 
//                   key={index} 
//                   className="text-gray-700 bg-gray-100 p-2 rounded-lg"
//                 >
//                   {query}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Topic Details Modal */}
//         {selectedTopic && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//             <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
//               <button 
//                 onClick={() => setSelectedTopic(null)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//               >
//                 <X size={24} />
//               </button>
//               {renderTopicDetails(selectedTopic)}
//               <div className="mt-6 flex justify-between">
//                 <button
//                   onClick={() => setSelectedTopic(null)}
//                   className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Contact Support
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Support Contact Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//             <div className="bg-white p-8 rounded-xl w-96 max-w-full relative">
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//               >
//                 <X size={24} />
//               </button>
//               <h2 className="text-2xl font-semibold text-center mb-6">Contact Support</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Your Name"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Your Email"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   />
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     placeholder="Your Message"
//                     className="w-full p-3 border rounded-lg"
//                     rows={4}
//                     required
//                   />
//                 </div>
//                 <div className="mt-6">
//                   <button
//                     type="submit"
//                     disabled={formStatus === 'sending'}
//                     className={`w-full py-3 rounded-lg text-white flex items-center justify-center ${
//                       formStatus === 'sending' 
//                         ? 'bg-blue-400 cursor-not-allowed' 
//                         : formStatus === 'success' 
//                         ? 'bg-green-500' 
//                         : formStatus === 'error' 
//                         ? 'bg-red-500' 
//                         : 'bg-blue-600 hover:bg-blue-700'
//                     }`}
//                   >
//                     {formStatus === 'sending' && <Clock className="mr-2 animate-spin" />}
//                     {formStatus === 'success' && <CheckCircle className="mr-2" />}
//                     {formStatus === 'error' && <AlertCircle className="mr-2" />}
//                     {formStatus === 'idle' && <Send className="mr-2" />}
//                     {formStatus === 'idle' && 'Send Message'}
//                     {formStatus === 'sending' && 'Sending...'}
//                     {formStatus === 'success' && 'Message Sent!'}
//                     {formStatus === 'error' && 'Send Failed'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

//export defulate help and center



'use client';
import React, { useState } from 'react';

const HelpAndCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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

  const handleFAQToggle = (index:any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleFeedbackChange = (e:any) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e:any) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setFeedback('');
    setTimeout(() => setFeedbackSubmitted(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="min-h-screen p-8 bg-blue-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
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
      </div>
    </div>
  );
};

export default HelpAndCenter;
