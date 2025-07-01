import React from "react";
import { motion } from "framer-motion";
import contactImg from "/Contact us-rafiki.png"; 

const ContactUs = () => {
  return (
    <section className="min-h-screen py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Contact <span className="text-pink-400"  >Us</span>
        </h1>
        <p className="text-lg  max-w-2xl mx-auto">
          Have questions, suggestions, or want to collaborate? We’d love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Form Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className=" bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded border-2 border-gray-300  placeholder-gray-400 e"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded  border-2 border-gray-300 placeholder-gray-400 e"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded border-2 border-gray-300  placeholder-gray-400 e"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Right - Image Section with Animation */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="max-w-md w-full rounded-xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
