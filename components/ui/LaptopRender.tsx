"use client";

interface LaptopRenderProps {
  accent?: string;
  className?: string;
  float?: boolean;
  /** subtle CSS tilt, e.g. "-4deg" */
  angle?: string;
}

/**
 * High-fidelity static render of an MR laptop (open, front view).
 * Zero GPU cost — used for cards, mobile fallbacks and ambient scenes.
 */
export function LaptopRender({
  accent = "#2b50ff",
  className = "",
  float = false,
  angle = "0deg",
}: LaptopRenderProps) {
  const gid = `mr-${accent.replace("#", "")}`;
  return (
    <div
      className={`relative select-none ${float ? "animate-float-slow" : ""} ${className}`}
      style={{ transform: `rotate(${angle})` }}
      aria-hidden
    >
      <svg viewBox="0 0 420 264" fill="none" className="h-auto w-full drop-shadow-[0_28px_40px_rgba(24,34,64,0.18)]">
        <defs>
          <linearGradient id={`${gid}-wall`} x1="60" y1="20" x2="360" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f6f8ff" />
            <stop offset="0.55" stopColor="#e9edff" />
            <stop offset="1" stopColor="#dfe5f8" />
          </linearGradient>
          <linearGradient id={`${gid}-deck`} x1="30" y1="182" x2="390" y2="212" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#eceef1" />
            <stop offset="0.5" stopColor="#dfe2e7" />
            <stop offset="1" stopColor="#cfd3d9" />
          </linearGradient>
          <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.42" r="0.75">
            <stop offset="0" stopColor={accent} stopOpacity="0.55" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${gid}-lid`} x1="46" y1="12" x2="374" y2="176" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f0f1f4" />
            <stop offset="1" stopColor="#d6d9df" />
          </linearGradient>
        </defs>

        {/* Lid */}
        <rect x="46" y="10" width="328" height="168" rx="14" fill={`url(#${gid}-lid)`} />
        <rect x="52.5" y="16.5" width="315" height="155" rx="9" stroke="#b9bdc6" strokeWidth="1" opacity="0.7" />
        {/* Display */}
        <rect x="58" y="22" width="304" height="144" rx="6" fill="#14161c" />
        <rect x="63" y="27" width="294" height="134" rx="4" fill={`url(#${gid}-wall)`} />
        {/* Wallpaper glow + abstract UI */}
        <circle cx="210" cy="86" r="86" fill={`url(#${gid}-glow)`} />
        <rect x="84" y="44" width="96" height="8" rx="4" fill="#101216" opacity="0.85" />
        <rect x="84" y="58" width="64" height="6" rx="3" fill="#3f444d" opacity="0.45" />
        <g opacity="0.9">
          <rect x="252" y="118" width="88" height="30" rx="6" fill="#ffffff" opacity="0.85" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={260 + i * 26} y={132 - [10, 16, 7][i]} width="12" height={[10, 16, 7][i] + 8} rx="2" fill={accent} opacity={0.35 + i * 0.25} />
          ))}
        </g>
        <rect x="84" y="128" width="120" height="20" rx="10" fill="#ffffff" opacity="0.75" />
        <circle cx="94" cy="138" r="4" fill={accent} />
        <rect x="104" y="135" width="72" height="6" rx="3" fill="#3f444d" opacity="0.4" />
        {/* Camera notch */}
        <rect x="196" y="23" width="28" height="4" rx="2" fill="#000" opacity="0.65" />
        {/* MR logo on bezel chin */}
        <text x="210" y="161" textAnchor="middle" fontFamily="var(--font-geist-sans)" fontSize="7" fontWeight="700" letterSpacing="2" fill="#8a8f98">MR</text>

        {/* Hinge */}
        <rect x="70" y="177" width="280" height="7" rx="3.5" fill="#b6bac2" />
        <rect x="150" y="178.5" width="120" height="4" rx="2" fill="#9ba0aa" />

        {/* Base deck */}
        <path d="M52 184 h316 l38 26 q4 4 -3 4 H17 q-7 0 -3 -4 Z" fill={`url(#${gid}-deck)`} />
        {/* Keyboard well */}
        <path d="M112 190 h196 l10 9 H102 Z" fill="#c3c7ce" opacity="0.85" />
        <g opacity="0.55">
          {Array.from({ length: 4 }).map((_, r) => (
            <g key={r}>
              {Array.from({ length: 13 }).map((_, c) => {
                const rowInset = r * 4;
                return (
                  <rect
                    key={c}
                    x={116 + c * 15 + rowInset}
                    y={191.5 + r * 2}
                    width="11"
                    height="1.6"
                    rx="0.8"
                    fill="#7d828c"
                  />
                );
              })}
            </g>
          ))}
        </g>
        {/* Trackpad hint */}
        <rect x="188" y="203" width="44" height="6" rx="2" fill="#c3c7ce" />
        {/* Front lip */}
        <rect x="12" y="212" width="396" height="3" rx="1.5" fill="#aab0b9" />

        {/* Ground shadow */}
        <ellipse cx="210" cy="230" rx="180" ry="10" fill="#181c26" opacity="0.07" />
      </svg>
    </div>
  );
}
