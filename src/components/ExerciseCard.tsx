"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Set } from "@/db/schema";

interface ExerciseCardProps {
  exerciseName: string;
  sets: Set[];
  onDeleteSet: (id: string) => void;
}

export function ExerciseCard({ exerciseName, sets, onDeleteSet }: ExerciseCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{exerciseName}</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs">
              <th className="text-left pb-1">Set</th>
              <th className="text-left pb-1">Weight (kg)</th>
              <th className="text-left pb-1">Reps</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {sets.map((s, i) => (
              <tr key={s.id} className="border-t border-border">
                <td className="py-1 pr-4">{i + 1}</td>
                <td className="py-1 pr-4">{s.weightKg === "0" ? "BW" : s.weightKg}</td>
                <td className="py-1 pr-4">{s.reps}</td>
                <td className="py-1 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-muted-foreground hover:text-destructive"
                    onClick={() => onDeleteSet(s.id)}
                  >
                    ✕
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
