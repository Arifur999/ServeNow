import React from 'react';
import { FaHandsHelping, FaGlobe, FaUsers } from 'react-icons/fa';

const ExtraSection2 = () => {
    return (
        <div>

    <section className="py-16  text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-500">Our Mission</h2>
        <p className="mb-10 0 text-lg">
          ServeNow is dedicated to connecting volunteers with meaningful opportunities to create real impact. Together, we empower change, support communities, and build a better tomorrow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className=" shadow-md">
            <FaHandsHelping className="text-4xl text-pink-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Community Support</h3>
            <p className=" mt-2">Connecting you with local causes that need your help the most.</p>
          </div>
          <div className=" shadow-md">
            <FaGlobe className="text-4xl text-pink-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Global Impact</h3>
            <p className=" mt-2">Making a difference beyond borders, one volunteer at a time.</p>
          </div>
          <div className=" shadow-md">
            <FaUsers className="text-4xl text-pink-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Empowering People</h3>
            <p className=" mt-2">Giving you the tools and platform to become a force for good.</p>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default ExtraSection2;