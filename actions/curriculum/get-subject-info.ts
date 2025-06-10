"use server";

import { db } from "@/db";
import { subjects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSubjectInfo(id: number) {
    console.log("asdasd");
    return (await db.select().from(subjects).where(eq(subjects.id, id)))[0];
}
