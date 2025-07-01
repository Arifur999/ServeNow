import React, { useState } from "react";
import { motion } from "framer-motion";
import faqImg from "/FAQs-rafiki.png"; // ✅ ঠিক path রাখো

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is ServeNow?",
      answer:
        "ServeNow is a platform to connect volunteers with various social service opportunities like education, healthcare, environment and more.",
    },
    {
      question: "Do I need to sign up to join an event?",
      answer:
        "Yes, you need to create an account to join and manage volunteering events or post your own needs.",
    },
    {
      question: "Is ServeNow free to use?",
      answer:
        "Absolutely! ServeNow is completely free for both volunteers and organizers.",
    },
    {
      question: "Can I cancel my volunteering after applying?",
      answer:
        "Yes, you can cancel it from your dashboard. But we encourage you to inform the organizer in advance.",
    },
  ];

  return (
    <section className="min-h-screen py-16 px-6 md:px-20 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked <span className="text-pink-400">Questions</span>
        </h1>
        <p className="text-lg  max-w-2xl mx-auto">
          Here are some common queries about ServeNow. Feel free to reach out if you have more!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left - Accordion with animation */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4 order-2 md:order-1"
        >
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-500 rounded-lg shadow-md"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center focus:outline-none"
              >
                <span>{item.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 ">{item.answer}</div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Right - Image with animation */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center order-1 md:order-2"
        >
          <img
            src={faqImg}
            alt="FAQ Illustration"
            className="max-w-md w-full rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
