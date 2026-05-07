"use client";

import { useCallback, useEffect, useState } from "react";
import { WorkoutTimer } from "./WorkoutTimer";
import { ExerciseCard } from "./ExerciseCard";
import { AddSetForm } from "./AddSetForm";
import type { Set } from "@/db/schema";

interface SessionPanelProps {
  onSessionEnd: () => void;
}

type GroupedSets = Record<string, Set[]>;

export function SessionPanel({ onSessionEnd }: SessionPanelProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sets, setSets] = useState<Set[]>([]);

  const fetchSets = useCallback(async (id: string) => {
    const res = await fetch(`/api/sessions/${id}/sets`);
    const data: Set[] = await res.json();
    setSets(data);
  }, []);

  useEffect(() => {
    if (sessionId) fetchSets(sessionId);
  }, [sessionId, fetchSets]);

  async function handleStart() {
    const res = await fetch("/api/sessions", { method: "POST" });
    const data = await res.json();
    setSessionId(data.id);
  }

  async function handleEnd() {
    if (!sessionId) return;
    await fetch(`/api/sessions/${sessionId}`, { method: "PATCH" });
    setSessionId(null);
    setSets([]);
    onSessionEnd();
  }

  async function handleDeleteSet(id: string) {
    await fetch(`/api/sets/${id}`, { method: "DELETE" });
    if (sessionId) fetchSets(sessionId);
  }

  const grouped: GroupedSets = sets.reduce((acc, s) => {
    (acc[s.exerciseName] ??= []).push(s);
    return acc;
  }, {} as GroupedSets);

  return (
    <div className="space-y-6">
      <WorkoutTimer sessionId={sessionId} onStart={handleStart} onEnd={handleEnd} />

      {sessionId && (
        <div className="space-y-4">
          <AddSetForm
            sessionId={sessionId}
            onAdded={() => fetchSets(sessionId)}
          />
          {Object.entries(grouped).map(([name, exerciseSets]) => (
            <ExerciseCard
              key={name}
              exerciseName={name}
              sets={exerciseSets}
              onDeleteSet={handleDeleteSet}
            />
          ))}
        </div>
      )}
    </div>
  );
}
