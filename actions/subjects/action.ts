"use server";

import { db } from "@/db";
import { subjects } from "@/db/schema";
import { Subject } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const SubjectFormSchema = z.object({
    id: z.number(),
    code: z
        .string()
        .min(4, { message: "Subject code must be at least 4 characters." }),
    title: z.string().min(5, { message: "Subject title is required." }),
    units: z
        .number()
        .min(1, { message: "Units cannot be zero (0)." })
        .max(5, "Units must not exceed 5."),
});

export async function saveSubject(prev: any, formData: FormData) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const data: Subject = {
        id: Number(formData.get("id")),
        code: formData.get("code") as string,
        title: formData.get("title") as string,
        units: Number(formData.get("units")),
    };

    console.log(data);

    const validation = SubjectFormSchema.safeParse(data);

    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            inputs: data,
        };
    }

    const { id, code, title, units } = validation.data;
    console.log(validation.data);

    try {
        let result;
        if (id == 0) {
            result = await db.insert(subjects).values([{ code, title, units }]);
            console.log(result);
        } else {
            result = await db
                .update(subjects)
                .set({
                    code: validation.data.code,
                    title: validation.data.title,
                })
                .where(eq(subjects.id, validation.data.id));
        }

        if (result[0].affectedRows <= 0) {
            return {
                inputs: data,
                success: false,
                message: "Failed to save subject.",
            };
        }
    } catch (error) {
        console.error("❌ System Error:", error);
    }

    if (id != 0) {
        redirect("/subjects");
    }

    return {
        success: true,
        message: "Saved successfully.",
    };
}

export async function getSubjects() {
    const result = await db.select().from(subjects);
    return result;
}
