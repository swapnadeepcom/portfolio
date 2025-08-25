import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  // Smooth scroll function
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      <div className="container mx-auto text-center">
        {/* Name + LinkedIn */}
        <div className="flex justify-center items-center space-x-4">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-500">
            Swapnadeep Roy
          </h2>
          <a
            href="https://www.linkedin.com/in/tarun-kaushik-553b441a4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl hover:text-purple-500 transition-transform transform hover:scale-125"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Navigation Links - Responsive */}
        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-6">
          {[
            { name: "Home", id: "hero" },
            { name: "About", id: "about" },
            { name: "Skills", id: "skills" },
            { name: "Experience", id: "experience" },
            { name: "Projects", id: "projects" },
            { name: "Education", id: "education" },
            { name: "Contact", id: "contact" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleScroll(item.id)}
              className="hover:text-purple-500 text-sm sm:text-base my-1"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-sm text-gray-400 mt-6">
          © 2025 Swapnadeep Roy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
