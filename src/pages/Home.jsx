import { motion } from "framer-motion";
import LinkChecker from "../components/LinkChecker";
import { FaShieldAlt, FaRobot, FaBolt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-black text-white w-full min-h-screen">
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 bg-gradient-to-br from-black via-gray-900 to-black w-full">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent px-4 w-full"
        >
          Secure Your Digital World
        </motion.h1>

        <p className="mt-4 sm:mt-6 text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg px-4 w-full">
          AI-powered phishing detection using advanced transformer deep learning
          models.
        </p>

        <div className="mt-8 sm:mt-12 w-full max-w-3xl px-4">
          <LinkChecker />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-950 w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-12 md:mb-16 px-4">
          Why PhishGuard AI?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto w-full px-4">
          <div className="p-4 sm:p-6 md:p-8 bg-black border border-green-500/30 rounded-xl hover:shadow-[0_0_30px_rgba(0,255,150,0.3)] transition w-full">
            <FaRobot className="text-green-400 text-3xl sm:text-4xl mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">Transformer AI Model</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Deep learning based URL classification with high accuracy.
            </p>
          </div>

          <div className="p-4 sm:p-6 md:p-8 bg-black border border-blue-500/30 rounded-xl hover:shadow-[0_0_30px_rgba(0,150,255,0.3)] transition w-full">
            <FaShieldAlt className="text-blue-400 text-3xl sm:text-4xl mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">Real-Time Detection</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Instant phishing analysis with confidence score output.
            </p>
          </div>

          <div className="p-4 sm:p-6 md:p-8 bg-black border border-purple-500/30 rounded-xl hover:shadow-[0_0_30px_rgba(150,0,255,0.3)] transition w-full sm:col-span-2 lg:col-span-1">
            <FaBolt className="text-purple-400 text-3xl sm:text-4xl mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">Fast & Secure</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Built with React + FastAPI for scalable deployment.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-black text-center w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-10 px-4">Our Impact</h2>

        <div className="flex justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 flex-wrap text-green-400 text-xl sm:text-2xl md:text-3xl font-bold px-4">
          <div className="min-w-[80px] sm:min-w-[100px]">
            98%<p className="text-gray-400 text-xs sm:text-sm font-normal mt-1">Accuracy</p>
          </div>
          <div className="min-w-[80px] sm:min-w-[100px]">
            10K+
            <p className="text-gray-400 text-xs sm:text-sm font-normal mt-1">URLs Analyzed</p>
          </div>
          <div className="min-w-[80px] sm:min-w-[100px]">
            24/7<p className="text-gray-400 text-xs sm:text-sm font-normal mt-1">Monitoring</p>
          </div>
        </div>
      </section>
    </div>
  );
}
