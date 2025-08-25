import React, { Suspense, useRef } from "react";
import ReactTypingEffect from "react-typing-effect";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function GamingPC() {
  const { scene } = useGLTF("/models/gaming_desktop_pc.glb"); // path from public folder
  const ref = useRef();

  // Rotate the model continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // adjust speed (0.01 = slow, 0.05 = fast)
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.5}
    />
  );
}

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 justify-center items-center text-center px-6"
    >
      {/* Left - Hero Text */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
          Hi, I am
        </h1>
        <h2 className="text-[50px] font-bold text-white mb-4 leading-tight">
          Swapnadeep Roy
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec]">
          I am a{" "}
          <ReactTypingEffect
            text={[
              "Fullstack Developer",
              "Machine Learning Engineer",
              "Software Developer",
              "Data Science Enthusiast",
              "Coder",
            ]}
            speed={100}
            eraseSpeed={50}
            typingDelay={500}
          />
        </h3>
      </div>

      {/* Right - 3D Model */}
      <div className="w-full h-[600px] md:h-[700px]">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <GamingPC />
            </Stage>
            <OrbitControls enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;