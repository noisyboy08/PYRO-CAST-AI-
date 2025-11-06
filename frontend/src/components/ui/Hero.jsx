import React, { useEffect } from "react"
import { Zap } from "lucide-react"
import { renderCanvas } from "./canvas"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function Hero() {
  
  useEffect(() => {
    // Small delay to ensure canvas element exists
    const timer = setTimeout(() => {
      renderCanvas();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Canvas cleanup is handled by the canvas module
    };
  }, []);

  // Buttons handled via Link + motion.button

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-tight">
          <span className="text-gradient">Pyro Cast AI</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-primary">
          Prediction System
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
          Harness the power of artificial intelligence to predict fire risks with Pyro Cast AI's advanced analytics. 
          Protect communities through advanced machine learning and real-time environmental analysis.
        </p>

        {/* Buttons (Link + motion.button) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-4xl mx-auto">
          <Link to="/predict" className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary btn-lg w-full"
            >
              <Zap className="w-5 h-5" />
              <span>Start Prediction</span>
            </motion.button>
          </Link>
          <Link to="/about" className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-lg w-full"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </div>
      
      {/* Canvas Background */}
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </section>
  );
}
