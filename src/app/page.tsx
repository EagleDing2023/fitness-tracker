"use client";

import { useState } from "react";
import { SessionPanel } from "@/components/SessionPanel";
import { ProgressionChart } from "@/components/ProgressionChart";

export default function Home() {
  const [chartKey, setChartKey] = useState(0);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 space-y-10">
      <h1 className="text-2xl font-bold tracking-tight">Fitness Tracker</h1>

      <section>
        <SessionPanel onSessionEnd={() => setChartKey((k) => k + 1)} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Progression</h2>
        <ProgressionChart refreshKey={chartKey} />
      </section>
    </main>
  );
}
