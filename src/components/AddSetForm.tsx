"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddSetFormProps {
  sessionId: string;
  onAdded: () => void;
}

export function AddSetForm({ sessionId, onAdded }: AddSetFormProps) {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!exercise || !reps) return;
    setLoading(true);
    await fetch(`/api/sessions/${sessionId}/sets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exerciseName: exercise.trim(),
        weightKg: weight ? parseFloat(weight) : 0,
        reps: parseInt(reps, 10),
      }),
    });
    setReps("");
    setLoading(false);
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end">
      <div className="flex flex-col gap-1">
        <Label htmlFor="exercise">Exercise</Label>
        <Input
          id="exercise"
          placeholder="e.g. Bench Press"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-44"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          min="0"
          step="0.5"
          placeholder="0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-24"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="reps">Reps</Label>
        <Input
          id="reps"
          type="number"
          min="1"
          placeholder="10"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-20"
        />
      </div>
      <Button type="submit" disabled={loading || !exercise || !reps}>
        + Add Set
      </Button>
    </form>
  );
}
