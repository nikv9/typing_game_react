import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

const App = () => {
  return (
    <div className="app bg-[#151721]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
