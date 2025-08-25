import React from "react";
// Education Section Logos
import cemkLogo from '../../assets/education_logo/cemk_logo.png';
import kolaLogo from '../../assets/education_logo/kola_logo.png';
import gopalLogo from '../../assets/education_logo/gopal_logo.png';

export const education = [
  {
    id: 0,
    img: cemkLogo,
    school: "College of Engineering and Management, Kolaghat",
    date: "Aug 2021 – June 2025",
    grade: "8.16 CGPA",
    desc: "Pursuing B.Tech in Computer Science from College of Engineering and Management, Kolaghat. Gained strong knowledge in Data Structures, Algorithms, Web Development, and Machine Learning. Applied these skills in projects such as AI Finance Platform, Crop Recommendation System, and Spam Detection System.",
    degree: "Bachelor of Technology - B.Tech (Computer Science)",
  },
  {
    id: 1,
    img: kolaLogo,
    school: "Kola Union High School, Kolaghat",
    date: "2019 – 2021",
    grade: "91%",
    desc: "Completed Higher Secondary education under West Bengal Council of Higher Secondary Education (Science Stream). Studied Physics, Chemistry, Mathematics, and Computer Science, building a strong foundation in logical reasoning and problem-solving.",
    degree: "Higher Secondary (WBCHSE) - Science",
  },
  {
    id: 2,
    img: gopalLogo,
    school: "Gopalnagar Kaliprasanna Kerr Institution, Kolaghat",
    date: "2013 – 2019",
    grade: "85.7%",
    desc: "Completed Secondary education under West Bengal Board of Secondary Education with a focus on Science and Mathematics. This stage strengthened my academic discipline and problem-solving mindset.",
    degree: "Secondary (WBBSE)",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 px-[8vw] md:px-[12vw] font-sans bg-skills-gradient clip-path-custom-3"
    >
      {/* Section Title */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-white tracking-wide">EDUCATION</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4 rounded"></div>
        <p className="text-gray-400 mt-4 text-lg font-medium max-w-2xl mx-auto">
          My education has been a journey of learning and development. Here are the highlights of my academic background.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 bg-purple-600 h-full rounded-full"></div>

        {/* Education Cards */}
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={`relative flex flex-col sm:flex-row items-center mb-20 ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >
            {/* Connector Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-purple-500 border-4 border-white w-6 h-6 rounded-full z-10 shadow-lg"></div>

            {/* Card */}
            <div
              className={`w-full sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-400/30 bg-gray-900 backdrop-blur-lg 
              transform transition duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(130,69,236,0.6)]
              ${index % 2 === 0 ? "sm:ml-16" : "sm:mr-16"}`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} // animation direction
            >
              {/* Image + Text */}
              <div className="flex items-center space-x-6">
                {/* Logo */}
                <div className="w-24 h-16 bg-white rounded-md overflow-hidden shadow-md">
                  <img
                    src={edu.img}
                    alt={edu.school}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Degree + School */}
                <div>
                  <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                  <h4 className="text-md text-gray-300">{edu.school}</h4>
                  <p className="text-sm text-gray-400 mt-2 italic">{edu.date}</p>
                </div>
              </div>

              {/* Grade + Description */}
              <p className="mt-4 text-gray-300 font-semibold">Grade: {edu.grade}</p>
              <p className="mt-3 text-gray-400 leading-relaxed">{edu.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
