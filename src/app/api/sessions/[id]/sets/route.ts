import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { sets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const addSetSchema = z.object({
  exerciseName: z.string().min(1),
  weightKg: z.number().min(0).default(0),
  reps: z.number().int().positive(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const rows = await db.select().from(sets).where(eq(sets.sessionId, id));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = addSetSchema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 });

  const [set] = await db
    .insert(sets)
    .values({
      sessionId: id,
      exerciseName: body.data.exerciseName,
      weightKg: String(body.data.weightKg),
      reps: body.data.reps,
    })
    .returning();

  return NextResponse.json(set, { status: 201 });
}
