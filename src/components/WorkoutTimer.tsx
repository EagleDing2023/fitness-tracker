"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

function formatElapsed(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

interface WorkoutTimerProps {
  sessionId: string | null;
  onStart: () => Promise<void>;
  onEnd: () => Promise<void>;
}

export function WorkoutTimer({ sessionId, onStart, onEnd }: WorkoutTimerProps) {
  const startTimeRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed(Date.now() - (startTimeRef.current ?? Date.now()));
    }, 500);
    return () => clearInterval(id);
  }, [running]);

  async function handleStart() {
    await onStart();
    startTimeRef.current = Date.now();
    setElapsed(0);
    setRunning(true);
  }

  async function handleEnd() {
    setRunning(false);
    await onEnd();
  }

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-4xl tabular-nums">{formatElapsed(elapsed)}</span>
      {!sessionId ? (
        <Button onClick={handleStart} size="lg">
          Start Workout
        </Button>
      ) : (
        <Button onClick={handleEnd} variant="destructive" size="lg">
          End Workout
        </Button>
      )}
    </div>
  );
}
