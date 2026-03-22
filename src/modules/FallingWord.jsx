import React from "react";

const FallingWord = ({ currentWord, inputVal, duration, paused, onMissed, powerUp }) => {
  const isLarge = currentWord.length > 7;
  
  return (
    <div className="fallingWordContainer relative w-full h-full my-2 mx-auto overflow-hidden">
      <div
        key={currentWord}
        className="absolute left-1/2 transform -translate-x-1/2 animate-fall flex flex-col items-center"
        style={{ animationDuration: `${duration}s`, animationPlayState: paused ? "paused" : "running" }}
        onAnimationEnd={(e) => e.target === e.currentTarget && onMissed()}
      >
        <div className="relative group px-6">
          <div className={`font-black select-none cursor-default tracking-widest flex transition-all duration-300 ${isLarge ? 'text-2xl' : 'text-3xl'}`}>
            {currentWord.split("").map((char, index) => {
              const typed = inputVal[index];
              const isCorrect = typed && char.toLowerCase() === typed.toLowerCase();
              const isActive = index === inputVal.length && !paused;

              const colorClass = isCorrect ? "text-emerald-700" : typed ? "text-rose-600" : isActive ? "text-emerald-600" : "text-slate-900/20";
              const popClass = isCorrect ? "animate-letter-pop" : "";
              const activeClass = isActive ? "underline underline-offset-[12px] decoration-4 decoration-emerald-500/40 animate-pulse" : "";

              return (
                <span key={index} className={`${colorClass} ${popClass} ${activeClass} transition-all duration-300`}>
                  {char}
                </span>
              );
            })}
          </div>

          {powerUp && (
            <div className="absolute -top-8 -right-8 bg-gradient-to-br from-yellow-400 to-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-xl ring-4 ring-white animate-pulse z-30">
              {powerUp === "FREEZE" ? "❄️" : powerUp === "BLAST" ? "💥" : "❤️"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FallingWord;
