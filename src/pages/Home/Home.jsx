import React from "react";
import Hero from "./Hero";
import ExtraSection1 from "./ExtraSection1";
import ExtraSection2 from "./ExtraSection2";
import { Link, useLoaderData } from "react-router";
import ShowAllPost from "./ShowAllPost";
import { Helmet } from "react-helmet-async";
const Home = () => {
  const posts = useLoaderData();
  return (
    <div>
      <Helmet>
      <title>SERVE NOW || Home</title>
    </Helmet>
      <Hero></Hero>
      <div>
        <h2 className="text-5xl font-bold text-center text-pink-600 lg:mt-10 mt-2 py-4">
          Volunteer Needs Now
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Explore the latest opportunities where your help is needed the most.
        </p>

        <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ShowAllPost key={post._id} post={post} />
          ))}
        </div>
        <div className="flex justify-center items-center">
            <Link to='/all-post'>
          <button className="btn btn-secondary">Show More</button>
          </Link>
        </div>
      </div>

      <ExtraSection1></ExtraSection1>
      <ExtraSection2></ExtraSection2>
    </div>
  );
};

export default Home;
