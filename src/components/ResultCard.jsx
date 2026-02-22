import { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import { motion } from "framer-motion";

export default function LinkChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!url) return alert("Enter URL");

    setLoading(true);
    setResult(null);

    try {
      // 🔌 Replace with your backend URL
      const response = await axios.post("http://localhost:8000/predict", {
        url: url,
      });

      setResult(response.data);
    } catch (error) {
      console.log(error);

      // TEMP DUMMY DATA
      const isPhish = url.includes("fake") || url.includes("login");
      setResult({
        status: isPhish ? "Phishing" : "Safe",
        confidence: 94,
        riskFactors: {
          length: url.length > 30,
          specialChars: url.includes("@") || url.includes("-"),
          suspiciousWords: url.includes("login"),
        },
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center px-6 py-12">
      <div className="bg-gray-900 border border-green-500 rounded-xl p-8 w-full max-w-2xl">
        <input
          type="text"
          placeholder="https://example.com"
          className="w-full bg-black border border-gray-700 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleScan}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
        >
          Scan URL
        </button>

        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="mt-6 border-4 border-green-400 border-t-transparent rounded-full w-10 h-10 mx-auto"
          />
        )}

        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}
