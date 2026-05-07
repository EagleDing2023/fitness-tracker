import { pgTable, uuid, timestamp, integer, text, numeric, index } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  durationSecs: integer("duration_secs"),
});

export const sets = pgTable(
  "sets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    exerciseName: text("exercise_name").notNull(),
    weightKg: numeric("weight_kg", { precision: 6, scale: 2 }).notNull().default("0"),
    reps: integer("reps").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("sets_session_idx").on(t.sessionId)]
);

export type Session = typeof sessions.$inferSelect;
export type Set = typeof sets.$inferSelect;
