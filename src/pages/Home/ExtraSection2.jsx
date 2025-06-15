import React from 'react';
import { FaHandsHelping, FaGlobe, FaUsers } from 'react-icons/fa';
import { motion } from "framer-motion";

const ExtraSection2 = () => {
     return (
    <div>
      <motion.section
        className="py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-pink-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="mb-10 text-lg text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ServeNow is dedicated to connecting volunteers with meaningful
            opportunities to create real impact. Together, we empower change,
            support communities, and build a better tomorrow.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <FaHandsHelping className="text-4xl text-pink-500 mb-4 mx-auto" />,
              title: "Community Support",
              desc: "Connecting you with local causes that need your help the most.",
            },{
              icon: <FaGlobe className="text-4xl text-pink-500 mb-4 mx-auto" />,
              title: "Global Impact",
              desc: "Making a difference beyond borders, one volunteer at a time.",
            },{
              icon: <FaUsers className="text-4xl text-pink-500 mb-4 mx-auto" />,
              title: "Empowering People",
              desc: "Giving you the tools and platform to become a force for good.",
            }].map((item, idx) => (
              <motion.div
                key={idx}
                className="shadow-md rounded-lg p-6 bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ExtraSection2;