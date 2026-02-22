import { motion } from "framer-motion";
import { FaBrain, FaShieldAlt, FaCode, FaRocket } from "react-icons/fa";

export default function About() {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-20 max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-300 w-full"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-green-400 font-bold mb-4 sm:mb-6 text-center px-4">
          About PhishGuard AI
        </h2>

        <div className="space-y-4 sm:space-y-6 text-sm sm:text-base w-full">
          <p className="leading-relaxed">
            PhishGuard AI is an advanced browser extension that uses hybrid
            Transformer-based Deep Learning models to classify URLs as phishing
            or legitimate in real-time. Built with modern web technologies and
            integrated with a Python backend for scalable AI inference.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 w-full">
            <div className="bg-white/5 border border-green-500/30 p-4 sm:p-6 rounded-xl w-full">
              <FaBrain className="text-green-400 text-2xl sm:text-3xl mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-green-400">
                Hybrid AI Models
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                Combines multiple deep learning approaches for higher accuracy
                and reliability.
              </p>
            </div>

            <div className="bg-white/5 border border-blue-500/30 p-4 sm:p-6 rounded-xl w-full">
              <FaShieldAlt className="text-blue-400 text-2xl sm:text-3xl mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-blue-400">
                Real-Time Protection
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                Instant URL analysis with detailed explainability features for
                transparency.
              </p>
            </div>

            <div className="bg-white/5 border border-purple-500/30 p-4 sm:p-6 rounded-xl w-full">
              <FaCode className="text-purple-400 text-2xl sm:text-3xl mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-purple-400">
                Modern Stack
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                Built with React, Vite, Tailwind CSS, and Python FastAPI
                backend.
              </p>
            </div>

            <div className="bg-white/5 border border-yellow-500/30 p-4 sm:p-6 rounded-xl w-full">
              <FaRocket className="text-yellow-400 text-2xl sm:text-3xl mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-yellow-400">
                User Experience
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                Responsive design that works seamlessly across all devices and
                screen sizes.
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-black/30 border border-gray-700 rounded-xl w-full">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-green-400">
              How It Works
            </h3>
            <ol className="list-decimal list-inside space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm md:text-base">
              <li>Enter or paste a URL you want to check</li>
              <li>Our hybrid AI model analyzes the URL structure and features</li>
              <li>Get instant results with confidence scores</li>
              <li>Review detailed explanations of why a URL is flagged</li>
              <li>Make informed decisions about website safety</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
