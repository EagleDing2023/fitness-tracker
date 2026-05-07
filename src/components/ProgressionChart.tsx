"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SessionSummary {
  id: string;
  startedAt: string;
  endedAt: string | null;
  totalVolume: number;
}

interface ChartPoint {
  date: number;
  volume: number;
  label: string;
}

function Chart({ refreshKey }: { refreshKey: number }) {
  const [points, setPoints] = useState<ChartPoint[]>([]);

  useEffect(() => {
    fetch("/api/sessions")
      .then((r) => r.json())
      .then((sessions: SessionSummary[]) => {
        const data = sessions
          .filter((s) => s.endedAt)
          .map((s) => ({
            date: new Date(s.startedAt).getTime(),
            volume: Number(s.totalVolume),
            label: new Date(s.startedAt).toLocaleDateString(),
          }))
          .reverse();
        setPoints(data);
      });
  }, [refreshKey]);

  if (points.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Complete a workout to see your progression.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          type="number"
          domain={["auto", "auto"]}
          tickFormatter={(v: number) => new Date(v).toLocaleDateString()}
          scale="time"
          name="Date"
        />
        <YAxis dataKey="volume" name="Volume (kg·reps)" />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value) =>
            [`${Number(value)} kg·reps`, "Volume"]
          }
          labelFormatter={(label) =>
            new Date(Number(label)).toLocaleDateString()
          }
        />
        <Scatter data={points} fill="hsl(var(--primary))" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export const ProgressionChart = dynamic(() => Promise.resolve(Chart), { ssr: false });
