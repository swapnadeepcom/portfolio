// src/components/Skills/Skills.jsx
import React, { useState } from "react";
import Tilt from "react-parallax-tilt";

// Skill Logos
import htmlLogo from "../../assets/tech_logo/html.png";
import cssLogo from "../../assets/tech_logo/css.png";
import javascriptLogo from "../../assets/tech_logo/javascript.png";
import reactjsLogo from "../../assets/tech_logo/reactjs.png";
import nextjsLogo from "../../assets/tech_logo/nextjs.png";
import tailwindcssLogo from "../../assets/tech_logo/tailwindcss.png";
import shadcnLogo from "../../assets/tech_logo/shadcn.png";

import nodejsLogo from "../../assets/tech_logo/nodejs.png";
import mysqlLogo from "../../assets/tech_logo/mysql.png";
import djangoLogo from "../../assets/tech_logo/django.png";
import flaskLogo from "../../assets/tech_logo/flask.png";
import mongodbLogo from "../../assets/tech_logo/mongodb.png";
import firebaseLogo from "../../assets/tech_logo/firebase.png";

import cLogo from "../../assets/tech_logo/c.png";
import javaLogo from "../../assets/tech_logo/java.png";
import pythonLogo from "../../assets/tech_logo/python.png";

import numpyLogo from "../../assets/tech_logo/numpy.png";
import pandasLogo from "../../assets/tech_logo/pandas.png";
import matplotlibLogo from "../../assets/tech_logo/matplotlib.png";
import seabornLogo from "../../assets/tech_logo/seaborn.png";
import sklearnLogo from "../../assets/tech_logo/sklearn.png";
import mlLogo from "../../assets/tech_logo/ml.png";

import dsaLogo from "../../assets/tech_logo/dsa.png";
import oopLogo from "../../assets/tech_logo/oop.png";

import gitLogo from "../../assets/tech_logo/git.png";
import githubLogo from "../../assets/tech_logo/github.png";
import vscodeLogo from "../../assets/tech_logo/vscode.png";
import postmanLogo from "../../assets/tech_logo/postman.png";
import vercelLogo from "../../assets/tech_logo/vercel.png";
import netlifyLogo from "../../assets/tech_logo/netlify.png";

// Skills Data
const SkillsInfo = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: htmlLogo, link: "https://www.w3schools.com/html/" },
      { name: "CSS", logo: cssLogo, link: "https://www.w3schools.com/css/" },
      { name: "React JS", logo: reactjsLogo, link: "https://react.dev/" },
      { name: "Next JS", logo: nextjsLogo, link: "https://nextjs.org/" },
      { name: "Tailwind CSS", logo: tailwindcssLogo, link: "https://tailwindcss.com/" },
      { name: "Shadcn UI", logo: shadcnLogo, link: "https://ui.shadcn.com/" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node JS", logo: nodejsLogo, link: "https://nodejs.org/en" },
      { name: "MySQL", logo: mysqlLogo, link: "https://www.mysql.com/" },
      { name: "Django", logo: djangoLogo, link: "https://www.djangoproject.com/" },
      { name: "Flask", logo: flaskLogo, link: "https://flask.palletsprojects.com/en/stable/" },
      { name: "MongoDB", logo: mongodbLogo, link: "https://www.mongodb.com/" },
      { name: "Firebase", logo: firebaseLogo, link: "https://firebase.google.com/" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C", logo: cLogo, link: "https://www.geeksforgeeks.org/c/c-programming-language/" },
      { name: "Java", logo: javaLogo, link: "https://www.java.com/en/" },
      { name: "Python", logo: pythonLogo, link: "https://www.python.org/" },
      { name: "JavaScript", logo: javascriptLogo, link: "https://www.w3schools.com/js/" },
    ],
  },
  {
    title: "Data Science & ML",
    skills: [
      { name: "NumPy", logo: numpyLogo, link: "https://numpy.org/" },
      { name: "Pandas", logo: pandasLogo, link: "https://pandas.pydata.org/" },
      { name: "Matplotlib", logo: matplotlibLogo, link: "https://matplotlib.org/" },
      { name: "Seaborn", logo: seabornLogo, link: "https://seaborn.pydata.org/" },
      { name: "Scikit-learn", logo: sklearnLogo, link: "https://scikit-learn.org/stable/" },
      { name: "Machine Learning", logo: mlLogo, link: "https://www.geeksforgeeks.org/machine-learning/machine-learning/" },
    ],
  },
  {
    title: "Core CS",
    skills: [
      { name: "DSA", logo: dsaLogo, link: "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/" },
      { name: "OOP", logo: oopLogo, link: "https://www.geeksforgeeks.org/dsa/introduction-of-object-oriented-programming/" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", logo: gitLogo, link: "https://git-scm.com/" },
      { name: "GitHub", logo: githubLogo, link: "https://github.com/" },
      { name: "VS Code", logo: vscodeLogo, link: "https://code.visualstudio.com/" },
      { name: "Postman", logo: postmanLogo, link: "https://www.postman.com/" },
      { name: "Vercel", logo: vercelLogo, link: "https://vercel.com/" },
      { name: "Netlify", logo: netlifyLogo, link: "https://www.netlify.com/" },
    ],
  },
];

// SkillCube component
const SkillCube = ({ skill }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleHover = () => {
    setRotation({
      x: rotation.x + (Math.floor(Math.random() * 2) + 1) * 360,
      y: rotation.y + (Math.floor(Math.random() * 2) + 1) * 360,
    });
  };

  return (
    <a
      href={skill.link}
      target="_blank"
      rel="noopener noreferrer"
      className="cube-card"
      onMouseEnter={handleHover}
    >
      <div
        className="cube-content"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {["front", "back", "left", "right", "top", "bottom"].map((face) => (
          <div
            key={face}
            className={`cube-face cube-${face} flex flex-col items-center justify-center`}
          >
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="w-10 h-10 mb-2 drop-shadow-[0_0_10px_rgba(130,69,236,0.8)]"
            />
            <span className="text-xs text-gray-100 font-semibold tracking-wide text-center block">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </a>
  );
};

const Skills = () => (
  <section
    id="skills"
    className="py-24 px-[6vw] md:px-[8vw] lg:px-[10vw] font-sans bg-skills-gradient clip-path-custom"
  >
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">SKILLS</h2>
      <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
      <p className="text-gray-400 mt-4 text-lg font-semibold">
        A collection of my technical skills and expertise honed through various
        projects and experiences
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 py-10">
      {SkillsInfo.map((category) => (
        <Tilt
          key={category.title}
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          scale={1.03}
          transitionSpeed={700}
          gyroscope={true}
        >
          <div
            className="bg-gray-900 backdrop-blur-md px-5 sm:px-8 py-6 sm:py-6 
            rounded-2xl border border-white/10 
            shadow-[0_0_20px_1px_rgba(130,69,236,0.15)] 
            transition-all duration-500 hover:shadow-[0_0_30px_6px_rgba(130,69,236,0.35)] hover:scale-[1.02]"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-5 text-center">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full justify-items-center">
              {category.skills.map((skill) => (
                <SkillCube key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </Tilt>
      ))}
    </div>

    <style>{`
      .cube-card {
        width: 110px;
        height: 110px;
        perspective: 1200px;
        display: block;
      }
      .cube-content {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 1s ease-in-out;
      }
      .cube-face {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(145deg, #1f1f1f, #2d2d2d);
        border: 2px solid rgba(130,69,236,0.4);
        border-radius: 14px;
        box-shadow: 0 0 18px rgba(130,69,236,0.4);
        backface-visibility: hidden;
      }
      .cube-front  { transform: rotateY(  0deg) translateZ(55px); }
      .cube-back   { transform: rotateY(180deg) translateZ(55px); }
      .cube-left   { transform: rotateY(-90deg) translateZ(55px); }
      .cube-right  { transform: rotateY( 90deg) translateZ(55px); }
      .cube-top    { transform: rotateX( 90deg) translateZ(55px); }
      .cube-bottom { transform: rotateX(-90deg) translateZ(55px); }
    `}</style>
  </section>
);

export default Skills;
