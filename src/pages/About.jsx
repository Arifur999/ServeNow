import React from "react";
import aboutImg from "/About us page-cuate.png"; 

const About = () => {
  return (
    <section className="min-h-screen py-16 px-6 md:px-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">About 
         <span className="text-pink-400"> ServeNow</span>
        </h1>
        <p className="text-lg  max-w-2xl mx-auto">
          Empowering communities through meaningful volunteering and impactful action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg  mb-4 leading-relaxed">
            At <span className="font-semibold ">ServeNow</span>, we believe in the power of people helping people.
            We aim to bridge the gap between volunteers and the causes that need them the most.
            Whether it's education, environment, health, or social services — ServeNow is here to connect you with the right opportunity.
          </p>
          <p className="text-lg ">
            Together, we can make a difference — one step, one post, one helping hand at a time.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={aboutImg}
            alt="About ServeNow"
            className="rounded-xl shadow-xl w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
