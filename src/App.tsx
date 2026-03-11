import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Cursor } from "./components/shared/Cursor";
import { RecruiterMode } from "./components/shared/RecruiterMode";
import { EasterEggs } from "./components/shared/EasterEggs";
import { Intro } from "./components/Intro/Intro";
import { Hub } from "./components/Hub/Hub";

const Journey = lazy(() => import("./components/Journey/Journey").then(m => ({ default: m.Journey })));
const QuickAccess = lazy(() => import("./components/QuickAccess/QuickAccess").then(m => ({ default: m.QuickAccess })));

function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <RecruiterMode />
      <EasterEggs />
      <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/quick" element={<QuickAccess />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
