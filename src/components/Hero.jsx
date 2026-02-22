import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center py-20 px-6 bg-linear-to-b from-black to-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-green-400"
      >
        URL Phishing Detection
      </motion.h2>

      <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
        Advanced Transformer-Based AI Model to Detect Malicious URLs in Real
        Time.
      </p>
    </div>
  );
}
