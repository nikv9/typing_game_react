import React from "react";
import { Link } from "react-router-dom";
import { FiClock, FiTarget, FiHeart } from "react-icons/fi";

const Header = ({ score, lives, timerOn, timeLeft, onToggleTimer, accuracy }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center py-4 px-8 border-b border-slate-200 bg-white/80 backdrop-blur-xl gap-4 z-50 relative min-h-[80px] shadow-sm">
      {/* Left: Title */}
      <div className="flex justify-start">
        <Link
          to="/"
          className="tracking-[0.3em] text-xl font-black bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 uppercase  transition-all duration-300 whitespace-nowrap"
        >
          Typing Keys
        </Link>
      </div>

      {/* Center: Mode Selection */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => (timerOn ? onToggleTimer() : null)}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all font-bold text-[10px] tracking-wider ${!timerOn ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
          >
            <FiHeart className={!timerOn ? "animate-pulse" : ""} />
            <span>LIVES</span>
          </button>
          <button
            onClick={() => (!timerOn ? onToggleTimer() : null)}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all font-bold text-[10px] tracking-wider ${timerOn ? "bg-amber-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
          >
            <FiClock />
            <span>60s SPRINT</span>
          </button>
        </div>
      </div>

      {/* Right: Stats (Accuracy, Score, Dynamic Metric) */}
      <div className="flex items-center justify-end gap-6 font-mono text-sm tracking-widest uppercase font-bold min-w-[300px]">
        <div className="flex items-center gap-2 bg-slate-100/80 py-2 px-4 rounded-2xl border border-slate-200">
          <FiTarget className="text-blue-600" />
          <span className="text-blue-600">{accuracy}%</span>
          <span className="text-[10px] text-slate-500">ACC</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 leading-none mb-1">SCORE</span>
            <span className="text-xl font-black text-slate-900 leading-none transition-all duration-300">{score}</span>
          </div>

          <div className="w-[100px] flex justify-end">
            {!timerOn ? (
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-4 rounded-full transition-all duration-500 ${i < lives ? "bg-red-500 shadow-sm" : "bg-slate-200"}`} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-amber-600 leading-none mb-1">TIME</span>
                <span className="text-xl font-black text-amber-600 leading-none transition-all tabular-nums">{timeLeft}s</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
