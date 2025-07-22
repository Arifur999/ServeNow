import React from "react";
import { motion } from "framer-motion";

const ExtraSection1 = () => {

const teamMembers = [
  {
    name: "Ayesha Rahman",
    role: "Community Outreach Lead",
    photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    name: "Nayeem Hossain",
    role: "Volunteer Coordinator",
    photo: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
  },
  {
    name: "Tania Akter",
    role: "Events & Campaign Manager",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  },
  {
    name: "Fahim Rahman",
    role: "Partnership & Sponsorship Lead",
    photo: "https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg",
  },
  {
    name: "Jannat Karim",
    role: "UX/UI Designer",
    photo: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg",
  },
  {
    name: "Ashfaq Ahmed",
    role: "Backend Developer",
    photo: "https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg",
  },
  {
    name: "Simran Kabir",
    role: "Frontend Developer",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    name: "Tanvir Hasan",
    role: "Marketing & Communication",
    photo: "https://images.pexels.com/photos/3931553/pexels-photo-3931553.jpeg",
  },
];



    return (
    <div>
      <motion.section
        className="py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-4 text-pink-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Meet Our Core Team
          </motion.h2>
          <motion.p
            className="mb-12 max-w-xl mx-auto "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Behind ServeNow is a group of passionate individuals dedicated to
            empowering volunteers, organizing impactful campaigns, and building
            bridges between communities and causes.
          </motion.p>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm mt-1 ">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ExtraSection1;