import React from "react";
import { FiTarget, FiZap } from "react-icons/fi";

const GameOverMsg = ({ score, stats, onRestart }) => {
  return (
    <div className="gameOverMsgContainer fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-white/95 backdrop-blur-3xl border border-slate-200 rounded-[2.5rem] w-full max-w-lg flex flex-col justify-center items-center gap-8 shadow-[0_40px_100px_rgba(0,0,0,0.12)] z-[100] ring-1 ring-black/5">
      <div className="text-center space-y-2">
        <h2 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 tracking-tighter drop-shadow-sm uppercase italic">
          Game Over
        </h2>
        <p className="text-slate-500 text-xs font-bold tracking-[0.4em] uppercase">
          The Sky is Clearing
        </p>
      </div>

      <div className="w-full grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center p-6 bg-amber-50 border border-amber-100 rounded-3xl">
          <FiZap className="mb-2 text-2xl text-amber-500" />
          <p className="text-4xl font-black text-slate-900 font-mono tracking-tighter">
            {score}
          </p>
          <p className="text-[10px] font-bold tracking-widest text-amber-600/60 uppercase pt-2">
            Total Score
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-blue-50 border border-blue-100 rounded-3xl">
          <FiTarget className="mb-2 text-2xl text-blue-500" />
          <p className="text-4xl font-black text-slate-900 font-mono tracking-tighter">
            {stats?.accuracy || 100}%
          </p>
          <p className="text-[10px] font-bold tracking-widest text-blue-600/60 uppercase pt-2">
            Accuracy
          </p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-5 text-sm font-black tracking-[0.3em] text-white uppercase transition-all bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-900/20 hover:bg-emerald-500 hover:scale-105 active:scale-95 ring-1 ring-black/10"
      >
        Try Again
      </button>
    </div>
  );
};

export default GameOverMsg;
