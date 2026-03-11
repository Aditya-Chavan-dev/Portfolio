import { useEffect, useRef } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export const EasterEggs = () => {
  const seq = useRef<string[]>([]);

  useEffect(() => {
    // Console message for devs
    console.log(
      "%c👋 Hey curious dev.",
      "color: #c9a96e; font-size: 18px; font-weight: bold;"
    );
    console.log(
      "%cYou inspect code too? We'd get along.\nLet's talk → " + "PLACEHOLDER@gmail.com",
      "color: #6e8efb; font-size: 13px;"
    );

    // Konami code
    const handleKey = (e: KeyboardEvent) => {
      seq.current.push(e.key);
      seq.current = seq.current.slice(-10);
      if (seq.current.join(",") === KONAMI.join(",")) {
        document.body.style.filter = "hue-rotate(180deg)";
        setTimeout(() => { document.body.style.filter = ""; }, 3000);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return null;
};
