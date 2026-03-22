import React, { useState, useEffect, useRef } from "react";
import { generate } from "random-words";

import Header from "../modules/Header";
import FallingWord from "../modules/FallingWord";
import Controls from "../modules/Controls";
import GameOverMsg from "../modules/GameOverMsg";

// Local Audio Assets
import correctSfx from "../assets/correct.mp3";
import wrongSfx from "../assets/wrong.mp3";

const WordTyping = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [powerUp, setPowerUp] = useState(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [accuracy, setAccuracy] = useState(100);

  const stats = useRef({ startTime: 0, correctChars: 0, totalChars: 0 });
  const inputRef = useRef(null);
  const sfx = useRef({ correct: new Audio(correctSfx), wrong: new Audio(wrongSfx) });

  useEffect(() => {
    sfx.current.correct.volume = 0.5;
    sfx.current.wrong.volume = 0.5;
  }, []);


  const getRandomWord = () => {
    setPowerUp(Math.random() < 0.1 ? ["FREEZE", "BLAST", "HEAL"][Math.floor(Math.random() * 3)] : null);
    return generate({ minLength: 3, maxLength: 8 });
  };

  const calculateStats = () => {
    if (stats.current.totalChars > 0) {
      setAccuracy(Math.round((stats.current.correctChars / stats.current.totalChars) * 100));
    }
  };

  const focusInput = () => setTimeout(() => inputRef.current?.focus(), 0);

  const startGame = () => {
    setScore(0); setLives(5); setTimeLeft(60); setInputVal(""); setIsFrozen(false); setAccuracy(100);
    stats.current = { startTime: Date.now(), correctChars: 0, totalChars: 0 };
    setCurrentWord(getRandomWord());
    setGameOver(false); setStart(true); setPaused(false);
    focusInput();
  };

  const stopGame = (manual = false) => {
    setStart(false); setCurrentWord(""); setInputVal(""); setIsFrozen(false);
    manual ? (setLives(5), setScore(0)) : setGameOver(true);
  };

  const playSfx = (type) => {
    sfx.current[type].currentTime = 0;
    sfx.current[type].play().catch(() => {});
  };

  const handleTyping = (e) => {
    if (paused) return;
    const val = e.target.value.toLowerCase().trim();
    if (val.length > inputVal.length) {
      stats.current.totalChars++;
      if (val[val.length - 1] === currentWord.toLowerCase()[val.length - 1]) stats.current.correctChars++;
    }
    setInputVal(val);
    calculateStats();

    if (val === currentWord.toLowerCase()) {
      playSfx("correct");
      setScore(s => s + 10);
      if (powerUp) {
        if (powerUp === "FREEZE") { setIsFrozen(true); setTimeout(() => setIsFrozen(false), 3000); }
        else if (powerUp === "BLAST") setScore(s => s + 20);
        else if (powerUp === "HEAL") setLives(l => Math.min(l + 1, 5));
      }
      setCurrentWord(getRandomWord());
      setInputVal("");
    }
  };

  const handleMissedWord = () => {
    if (!timerOn) setLives(l => l <= 1 ? (stopGame(), 0) : l - 1);
    playSfx("wrong");
    setCurrentWord(getRandomWord());
    setInputVal("");
  };

  const togglePause = () => setPaused(p => { if (!p) focusInput(); return !p; });
  const toggleTimer = () => { setTimerOn(t => !t); stopGame(true); };
  const getDuration = () => Math.max(1.2, 5.5 / (1 + score / 400));

  useEffect(() => {
    if (!start || !timerOn || paused) return;
    const id = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { stopGame(); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(id);
  }, [start, timerOn, paused]);

  return (
    <div className="h-dvh bg-[radial-gradient(circle_at_center,_#f8fafc_0%,_#ffffff_100%)] text-slate-900 relative overflow-hidden">
      <Header score={score} lives={lives} timerOn={timerOn} timeLeft={timeLeft} onToggleTimer={toggleTimer} accuracy={accuracy} />
      
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bg-particle w-1 h-1 bg-emerald-200/20 blur-[1px]" 
            style={{ left: `${Math.random() * 100}%`, '--duration': `${5 + Math.random() * 10}s`, '--scale': `${0.5 + Math.random() * 1.5}`, animationDelay: `${Math.random() * 5}s` }} 
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-[calc(100dvh-80px)]">
        {!start ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 font-sans px-6">
            <div className="text-center space-y-2">
              <h2 className="text-5xl font-black tracking-widest text-slate-800/20 uppercase">Ready?</h2>
              <p className="text-slate-500 text-sm tracking-widest font-bold">Speed and accuracy are key.</p>
            </div>
            <button className="group relative px-12 py-6 bg-emerald-600 font-black tracking-[0.3em] uppercase rounded-3xl hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all shadow-lg ring-1 ring-white/20" onClick={startGame}>
              <span>Start Challenge</span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 relative">
              <FallingWord currentWord={currentWord} inputVal={inputVal} duration={getDuration()} paused={paused || isFrozen} onMissed={handleMissedWord} powerUp={powerUp} />
            </div>
            <div className="p-8">
              <Controls inputVal={inputVal} inputRef={inputRef} paused={paused} onInputChange={handleTyping} onRestart={startGame} onStop={() => stopGame(true)} onTogglePause={togglePause} />
            </div>
          </>
        )}
      </div>
      {gameOver && <GameOverMsg score={score} stats={{ accuracy }} onRestart={startGame} />}
    </div>
  );
};

export default WordTyping;
