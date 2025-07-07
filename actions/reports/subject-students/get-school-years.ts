"use server";

import { db } from "@/db";
import { enrollments } from "@/db/schema";

export async function getScoolYears() {
    return (await db.select().from(enrollments).groupBy(enrollments.sy)).map(
        (item) => item.sy
    );
}
