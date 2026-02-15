/**
 * CountdownGate — removable pre-load countdown (10 → 0) before showing the app.
 * To remove: delete this file and in main.tsx render <App /> (or your routes) directly
 * instead of wrapping with <CountdownGate>.
 */
import { useState, useEffect, type ReactNode } from 'react';

const START = 10;

interface CountdownGateProps {
  children: ReactNode;
}

export function CountdownGate({ children }: CountdownGateProps) {
  const [count, setCount] = useState(START);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      setShowApp(true);
      return;
    }
    const t = setInterval(() => setCount((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [count]);

  if (showApp) {
    return <>{children}</>;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      aria-live="polite"
      aria-label={`Loading in ${count} seconds`}
    >
      <div className="text-center">
        <span
          className="inline-block tabular-nums text-8xl font-bold text-white/95 md:text-9xl"
          key={count}
          style={{
            animation: 'countdownPop 0.4s ease-out',
          }}
        >
          {count}
        </span>
        <p className="mt-4 text-sm uppercase tracking-widest text-white/50">
          Loading
        </p>
      </div>
      <style>{`
        @keyframes countdownPop {
          0% { transform: scale(0.8); opacity: 0.5; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
