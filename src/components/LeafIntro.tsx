import React from "react";
import { motion } from "motion/react";

interface LeafIntroProps {
  onComplete: () => void;
}

export default function LeafIntro({ onComplete }: LeafIntroProps) {
  // Slow, curtain-like sweep: gentle start, smooth acceleration, soft settle at the end
  const curtainEase = [0.83, 0, 0.17, 1] as const;
  const leftTransition = { duration: 2.6, delay: 1.4, ease: curtainEase };
  const rightTransition = { duration: 2.6, delay: 1.5, ease: curtainEase };

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden">
      {/* Left leaf panel (curtain) */}
      <motion.div
        initial={{ x: 0, scaleX: 1 }}
        animate={{ x: "-100%", scaleX: [1, 1.03, 1] }}
        transition={{ ...leftTransition, scaleX: { duration: 2.6, delay: 1.4, ease: "easeInOut" } }}
        style={{ transformOrigin: "right center" }}
        className="w-1/2 h-full bg-[#FDFBF7] relative flex items-center justify-end overflow-hidden shadow-[8px_0_30px_rgba(0,0,0,0.08)]"
      >
        <LeafBranch side="left" />
      </motion.div>

      {/* Right leaf panel (curtain) */}
      <motion.div
        initial={{ x: 0, scaleX: 1 }}
        animate={{ x: "100%", scaleX: [1, 1.03, 1] }}
        transition={{ ...rightTransition, scaleX: { duration: 2.6, delay: 1.5, ease: "easeInOut" } }}
        style={{ transformOrigin: "left center" }}
        onAnimationComplete={onComplete}
        className="w-1/2 h-full bg-[#FDFBF7] relative flex items-center justify-start overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.08)]"
      >
        <LeafBranch side="right" />
      </motion.div>

      {/* Center fading label */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <span className="font-script text-3xl md:text-4xl text-[#9c8f63] tracking-wide">
          Davetiyeniz Açılıyor
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#c9bd94] mt-2">
          Esra &amp; Hasan Eren
        </span>
      </motion.div>
    </div>
  );
}

function LeafBranch({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  const leafPositions = [60, 140, 220, 300, 380, 460, 540, 620, 700, 780];

  return (
    <svg
      viewBox="0 0 220 900"
      preserveAspectRatio="xMaxYMid slice"
      className={`h-full w-[220px] md:w-[280px] ${flip ? "scale-x-[-1]" : ""}`}
      fill="none"
    >
      {/* Central climbing stem */}
      <path
        d="M205 0 C 165 120, 195 240, 155 360 C 120 470, 175 560, 140 680 C 115 770, 160 830, 130 900"
        stroke="#C9A84C"
        strokeWidth="2"
        opacity="0.55"
      />

      {leafPositions.map((y, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const cx = 200 - (i % 3) * 10;
        const rot = dir * (22 + (i % 4) * 4);
        const fill = i % 3 === 0 ? "#DCE6D2" : i % 3 === 1 ? "#CFE0C4" : "#E8E2D6";
        return (
          <g key={y} transform={`translate(${cx} ${y}) rotate(${rot})`}>
            <ellipse cx="0" cy="0" rx="40" ry="15" fill={fill} opacity="0.88" />
            <line x1="-36" y1="0" x2="36" y2="0" stroke="#B9AE86" strokeWidth="0.8" opacity="0.5" />
          </g>
        );
      })}

      {/* small gold accent dots */}
      {[100, 340, 580, 820].map((y) => (
        <circle key={y} cx="185" cy={y} r="3" fill="#D4AF37" opacity="0.6" />
      ))}
    </svg>
  );
}
