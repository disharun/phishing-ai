import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { phishingAPI } from "../services/api";
import { FaShieldAlt, FaExclamationTriangle, FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function LinkChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");
    setShowExplanation(false);

    try {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      const response = await phishingAPI.checkURL(fullUrl);
      
      setResult({
        status: response.is_phishing ? "Phishing" : "Safe",
        confidence: response.confidence || 0,
        explanation: response.explanation || {},
        features: response.features || {},
        modelType: response.model_type || "Hybrid",
      });
    } catch (err) {
      setError(err.message || "Failed to check URL. Please ensure the backend is running.");
      console.error("Phishing check error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleScan();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-green-500/40 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(0,255,150,0.2)] w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full">
        <input
          type="text"
          placeholder="https://example.com"
          className="flex-1 bg-black/50 text-white border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-xs sm:text-sm md:text-base w-full min-w-0"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button
          onClick={handleScan}
          disabled={loading}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base whitespace-nowrap w-full sm:w-auto"
        >
          {loading ? "Scanning..." : "Scan URL"}
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-900/40 border border-red-500 rounded-lg text-red-300 text-xs sm:text-sm break-words"
        >
          {error}
        </motion.div>
      )}

      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="mt-6 mx-auto border-4 border-green-400 border-t-transparent rounded-full w-10 h-10"
        />
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 sm:mt-6 p-3 sm:p-4 md:p-6 rounded-xl w-full ${
              result.status === "Safe"
                ? "bg-green-900/40 border border-green-500"
                : "bg-red-900/40 border border-red-500"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {result.status === "Safe" ? (
                  <FaShieldAlt className="text-green-400 text-2xl sm:text-3xl" />
                ) : (
                  <FaExclamationTriangle className="text-red-400 text-2xl sm:text-3xl" />
                )}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {result.status === "Safe"
                      ? "✅ This URL is Safe"
                      : "⚠️ Phishing Detected"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    {result.modelType} Model
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm sm:text-base text-gray-300">Confidence Score</span>
                <span className="text-lg sm:text-xl font-bold">{result.confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    result.status === "Safe"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                />
              </div>
            </div>

            {/* Explainability Section */}
            {result.explanation && Object.keys(result.explanation).length > 0 && (
              <div className="mt-4 border-t border-gray-600 pt-4">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-medium text-gray-300 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <FaInfoCircle />
                    Why this result?
                  </span>
                  {showExplanation ? (
                    <FaChevronUp className="text-green-400" />
                  ) : (
                    <FaChevronDown className="text-green-400" />
                  )}
                </button>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3 text-sm sm:text-base"
                    >
                      {result.explanation.reasons && (
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-2">Key Indicators:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
                            {result.explanation.reasons.map((reason, idx) => (
                              <li key={idx}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.features && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                          {Object.entries(result.features).map(([key, value]) => (
                            <div
                              key={key}
                              className="bg-black/30 p-2 rounded text-xs sm:text-sm"
                            >
                              <span className="text-gray-400 capitalize">
                                {key.replace(/_/g, " ")}:
                              </span>{" "}
                              <span className="text-white font-medium">
                                {typeof value === "boolean"
                                  ? value
                                    ? "Yes"
                                    : "No"
                                  : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {result.explanation.recommendation && (
                        <div className="mt-3 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                          <p className="text-blue-200 text-sm">
                            <strong>Recommendation:</strong>{" "}
                            {result.explanation.recommendation}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
