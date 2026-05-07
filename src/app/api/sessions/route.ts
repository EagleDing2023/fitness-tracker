import { NextResponse } from "next/server";
import { db } from "@/db";
import { sessions, sets } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function POST() {
  const [session] = await db.insert(sessions).values({}).returning();
  return NextResponse.json(session, { status: 201 });
}

export async function GET() {
  const rows = await db
    .select({
      id: sessions.id,
      startedAt: sessions.startedAt,
      endedAt: sessions.endedAt,
      durationSecs: sessions.durationSecs,
      totalVolume: sql<number>`coalesce(sum(${sets.weightKg}::numeric * ${sets.reps}), 0)`,
    })
    .from(sessions)
    .leftJoin(sets, eq(sets.sessionId, sessions.id))
    .groupBy(sessions.id)
    .orderBy(desc(sessions.startedAt));

  return NextResponse.json(rows);
}
