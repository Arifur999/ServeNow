import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router'; 
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const Hero = () => {
  return (
    <div className="h-[70vh] max-h-[70vh] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full"
      >
        {/* Text Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-1/4 md:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center px-4"
        >
          <h1 className="text-2xl md:text-5xl font-bold text-white drop-shadow-md">
            Empower Your Community With{" "}
            <span className="text-pink-400">
              <Typewriter
                words={["ServeNow", "Real Action", "Volunteer Power"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="mt-2 text-sm md:text-lg text-white drop-shadow-md">
            Join hands, make a difference — connect with causes that matter.
          </p>
          <MotionLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            to="/all-post"
            className="inline-block mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold shadow-md transition"
          >
            Get Started
          </MotionLink>
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Navigation, Pagination, Autoplay]}
          className="w-full h-full"
        >
          {["/bn1.jpeg", "/bn2.jpeg", "/bn3.jpeg", "/bn4.jpeg", "/bn5.jpeg"].map(
            (img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <img
                    src={img}
                    alt={`slide-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Soft Black Overlay */}
                  <div className="absolute inset-0 bg-black/30 z-10"></div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default Hero;
