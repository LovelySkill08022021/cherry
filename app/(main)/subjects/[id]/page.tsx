import { db } from "@/db";
import Form from "./Form";
import { subjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Subject } from "@/types";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    let data: Subject;
    if (id != 0) {
        const result = await db
            .select()
            .from(subjects)
            .where(eq(subjects.id, id));
        data = result[0];
    } else {
        data = { id, code: "", title: "", units: 0 };
    }

    return (
        <>
            <div className="mb-5">
                <span className="font-semibold text-lg">Create subjects</span>
            </div>
            <Form data={data} />
        </>
    );
}
