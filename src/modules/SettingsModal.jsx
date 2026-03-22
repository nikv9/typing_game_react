import React from "react";
import { FiX, FiVolume2, FiVolumeX, FiMusic } from "react-icons/fi";

const SettingsModal = ({ settings, onUpdate, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-black/40">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-sm rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black tracking-tighter uppercase text-white/90">Settings</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="flex items-center gap-4">
                <FiMusic className={settings.music ? "text-emerald-400 scale-110" : "text-white/20"} />
                <span className="font-bold tracking-widest text-sm uppercase">Background Music</span>
              </div>
              <button 
                onClick={() => onUpdate({ ...settings, music: !settings.music })}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.music ? 'bg-emerald-500' : 'bg-zinc-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.music ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="flex items-center gap-4">
                <FiVolume2 className={settings.sfx ? "text-blue-400 scale-110" : "text-white/20"} />
                <span className="font-bold tracking-widest text-sm uppercase">Sound Effects</span>
              </div>
              <button 
                onClick={() => onUpdate({ ...settings, sfx: !settings.sfx })}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.sfx ? 'bg-blue-500' : 'bg-zinc-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.sfx ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 px-1">
                <span>Volume</span>
                <span>{Math.round(settings.volume * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={settings.volume}
                onChange={(e) => onUpdate({ ...settings, volume: parseFloat(e.target.value) })}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-colors"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
