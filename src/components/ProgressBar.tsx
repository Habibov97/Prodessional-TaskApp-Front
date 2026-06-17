'use client';

import { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
}

export default function SafeCircularProgress({
  percentage = 20,
  size = 100,
  strokeWidth = 12,
  strokeColor,
}: CircularProgressProps) {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentPercent(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${strokeColor} transition-all duration-700 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      <span className="absolute text-lg font-bold text-foreground">{currentPercent}%</span>
    </div>
  );
}
