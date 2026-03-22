import React from "react";
import { FiPlay, FiPause, FiRefreshCcw, FiSquare } from "react-icons/fi";

const Controls = ({ inputVal, inputRef, paused, onInputChange, onRestart, onStop, onTogglePause }) => {
  return (
    <div className="controlsContainer fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-50 w-[calc(100%-2rem)] max-w-lg">
      <div className="flex items-center gap-2 md:gap-4 bg-white/90 p-1.5 rounded-2xl border border-slate-200 backdrop-blur-xl shadow-2xl h-[56px] w-full ring-1 ring-black/5">
        {/* Input Field on the Left */}
        <div className="relative group flex-1 min-w-0 md:min-w-[280px] flex items-center">
          <input ref={inputRef} type="text" value={inputVal} onChange={onInputChange} placeholder={paused ? "Paused" : "Type..."} disabled={paused}
            className={`w-full bg-slate-50 border ${paused ? 'border-slate-100 opacity-50' : 'border-slate-200 focus:border-emerald-500/50'} text-slate-900 placeholder-slate-400 text-sm md:text-base py-1.5 px-3 md:px-5 rounded-xl outline-none transition-all duration-300 font-sans font-medium tracking-wide`}
          />
        </div>

        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3 mr-1">
          <button onClick={onRestart} className="flex items-center justify-center w-9 h-9 bg-slate-100/50 hover:bg-amber-100 border border-slate-200 rounded-lg transition-all group text-amber-600" title="Restart">
            <FiRefreshCcw className="group-hover:rotate-180 transition-all duration-500 text-sm" />
          </button>

          <button onClick={onTogglePause} className={`flex items-center justify-center w-14 h-9 ${paused ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200'} border border-slate-200 rounded-lg transition-all group text-base`} title={paused ? "Resume" : "Pause"}>
            {paused ? <FiPlay className="fill-current" /> : <FiPause className="fill-current" />}
          </button>

          <button onClick={onStop} className="flex items-center justify-center w-9 h-9 bg-slate-50 hover:bg-rose-100 border border-slate-200 rounded-lg transition-all group text-rose-600" title="Quit">
            <FiSquare className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
