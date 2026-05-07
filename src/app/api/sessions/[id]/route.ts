import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { sessions, sets } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, id),
    with: { sets: true },
  });
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(session);
}

export async function PATCH(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const [session] = await db
    .update(sessions)
    .set({
      endedAt: sql`now()`,
      durationSecs: sql`extract(epoch from (now() - ${sessions.startedAt}))::int`,
    })
    .where(eq(sessions.id, id))
    .returning();
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(session);
}
