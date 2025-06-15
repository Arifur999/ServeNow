import React from "react";
import Hero from "./Hero";
import ExtraSection1 from "./ExtraSection1";
import ExtraSection2 from "./ExtraSection2";
import { Link, useLoaderData } from "react-router"; 
import ShowAllPost from "./ShowAllPost";
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';

const Home = () => {
  const posts = useLoaderData();

  return (
    <div>
      <Helmet>
        <title>SERVE NOW || Home</title>
      </Helmet>

      {/* Hero section */}
      <Hero />

      {/* Animated Volunteer Post Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-5xl font-bold text-center text-pink-600 lg:mt-10 mt-2 py-4">
          Volunteer Needs Now
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Explore the latest opportunities where your help is needed the most.
        </p>

        <motion.div
          className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {posts.map((post) => (
            <ShowAllPost key={post._id} post={post} />
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center items-center mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link to="/all-post">
            <button className="btn btn-secondary">Show More</button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Extra sections */}
      <ExtraSection1 />
      <ExtraSection2 />
    </div>
  );
};

export default Home;
