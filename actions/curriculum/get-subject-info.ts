"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { subjects } from "@/db/schema";

export async function getSubjectInfo(id: number) {
    return (await db.select().from(subjects).where(eq(subjects.id, id)))[0];
}
