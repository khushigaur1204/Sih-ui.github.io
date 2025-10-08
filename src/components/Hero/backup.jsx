import React from "react";
import Navbar from "../Navbar/Navbar";
import Iridescence from "../Iridescence/Iridescence";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Iridescence Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.25, // subtle
        }}
      >
        <Iridescence
          color={[0, 1, 1]} // cyan-green ocean theme
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
          zIndex: 1,
        }}
      />

      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
      </div>

      {/* Hero Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 100px)",
          padding: "1.5rem 1rem",
          textAlign: "center",
          marginTop: "60px",
          boxSizing: "border-box",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          Transform Ocean <br />
          <span
            style={{
              color: "#ffffff", // white base
              textShadow: "0 0 10px rgba(0,255,100,0.7)", // neon glow accent
            }}
          >
            Carbon Credits
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            maxWidth: "650px",
            margin: "0 auto 1.5rem",
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.7,
            padding: "0 1rem",
          }}
        >
          The world’s first comprehensive Blue Carbon MRV Platform. Verify,
          trade, and scale ocean carbon restoration projects with transparent
          blockchain technology.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "0 auto 2rem",
            padding: "0 1rem",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <button
            style={{
              background: "linear-gradient(90deg,#00ff99,#00ccff)",
              border: "none",
              padding: "0.9rem 2rem",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#000",
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(0,255,150,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "0.3s ease",
            }}
          >
            Get Started <FaArrowRight />
          </button>

          <button
            style={{
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.3)",
              padding: "0.9rem 2rem",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#fff",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "#00ff99";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            Learn More
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "800px",
            padding: "0 1rem",
            margin: "1rem auto 0",
            width: "100%",
          }}
        >
          {[
            { number: "45.7K", label: "tons CO₂" },
            { number: "247", label: "Projects" },
            { number: "89", label: "NGOs" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "0.8rem 1.2rem",
                minWidth: "120px",
                flex: "1 1 auto",
                textAlign: "center",
                maxWidth: "160px",
              }}
            >
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#fff", // white base
                  textShadow: "0 0 8px rgba(0,255,100,0.7)", // neon glow
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
