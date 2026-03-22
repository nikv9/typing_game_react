import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Elegant Soft Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 mb-2">
            FALLING CLOUDS
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
        </div>

        <p className="text-lg md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          A high-stakes typing challenge. Master THE KEYBOARD, clear the clouds,
          and reach for the highest score.
        </p>

        <div className="pt-8">
          <Link
            to="/word_typing"
            className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-emerald-600 rounded-3xl hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(16,185,129,0.4)] ring-1 ring-white/30"
          >
            <span className="relative text-2xl tracking-widest uppercase font-black">
              Start Game
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/30" />
            </div>
          </Link>
        </div>

        <div className="pt-12 flex justify-center gap-8 text-slate-400 text-sm font-semibold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Fast
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Accurate
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> Intense
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 left-10 text-slate-900/5 text-9xl font-black select-none pointer-events-none hidden lg:block">
        TYPE
      </div>
      <div className="absolute top-10 right-10 text-slate-900/5 text-9xl font-black select-none pointer-events-none hidden lg:block">
        FAST
      </div>
    </div>
  );
};

export default Home;
