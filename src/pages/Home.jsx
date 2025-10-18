import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const Home = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAIFacts = async () => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents:
          "Give 3 short, interesting random facts. Each fact should be one sentence. Return them as plain text separated by new lines.",
      });
      console.log(response);

      const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const factList = text
        .split("\n")
        .map((f) => f.replace(/^[0-9.\-•]+/, "").trim())
        .filter(Boolean)
        .slice(0, 3);

      setFacts(factList);
    } catch (err) {
      console.error("AI fact error:", err);
      setFacts([
        "We've reached today's free AI limit. New facts will be available tomorrow.",
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAIFacts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-black text-white flex flex-col p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold animate-pulse">
          Falling Clouds - Typing Game
        </h1>
        <Link
          to="/word_typing"
          className="bg-yellow-300 text-gray-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-400"
        >
          Go to Play Ground
        </Link>
      </div>

      <div className="flex flex-1 flex-col justify-centerd items-start px-4 md:!mt-15">
        <h2 className="font-semibold !text-start !mt-2">
          ✨ AI Generated Facts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl !mx-austo !my-2">
          {loading ? (
            <p>AI is thinking...</p>
          ) : (
            facts.map((fact, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600 p-1 rounded-xl shadow-xl transform hover:scale-105 transition duration-300"
              >
                <div className="bg-black text-white p-6 rounded-lg h-full flex items-center justify-center text-center text-sm">
                  {fact}
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && (
          <button
            onClick={fetchAIFacts}
            className="text-sm underline cursor-pointer hover:text-yellow-300 self-start"
          >
            Generate new AI facts
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
