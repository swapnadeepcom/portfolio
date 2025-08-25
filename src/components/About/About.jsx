import React from 'react';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/profile2.png';

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen pt-40 px-[7vw] md:px-[7vw] lg:px-[12vw] font-sans flex flex-col md:flex-row items-center md:items-start"
    >
      {/* Left Side - Text */}
      <div className="md:w-3/5 text-center md:text-left pr-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          About Me
        </h2>

        <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto md:mx-0">
          I am a versatile Full-Stack Developer and Machine Learning Enthusiast with a strong foundation in designing and engineering scalable, high-performance web applications. Proficient across the entire software development lifecycle, I bring expertise in modern frameworks and technologies—particularly the MERN stack—while seamlessly integrating data-driven intelligence through machine learning methodologies. My professional ethos centers around crafting elegant, efficient, and user-centric solutions that merge technical precision with innovation. With a continuous drive for growth, I thrive in dynamic environments that challenge me to push boundaries, optimize performance, and contribute to transformative digital experiences.
        </p>

        {/* Resume Button */}
        <a
          href="https://drive.google.com/file/d/1EpbPwb92Piulyj_pQ-IEm_FnGK87jb6H/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white py-3 px-8 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105"
          style={{
            background: 'linear-gradient(90deg, #8245ec, #a855f7)',
            boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
          }}
        >
          DOWNLOAD CV
        </a>
      </div>

      {/* Right Side - Profile Image */}
      <div className="md:w-2/5 flex justify-center md:justify-end mt-8 md:mt-0">
        <Tilt>
          <img
            src={profileImage}
            alt="profile"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-[#8245ec]"
          />
        </Tilt>
      </div>
    </section>
  );
};

export default About;
