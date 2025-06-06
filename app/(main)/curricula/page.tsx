import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { curricula } from "@/db/schema";
import Link from "next/link";
import Form from "./page-components/Form";

export default async function page() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await db.select().from(curricula);

    return (
        <>
            <Form mode="add" data={{ id: 0, label: "" }} />

            <div className="w-[500px]">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Label</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((curriculum) => (
                            <TableRow key={curriculum.id}>
                                <TableCell>
                                    <Link
                                        className="hover:text-blue-400"
                                        href={`/curricula/${curriculum.id}`}
                                    >
                                        {curriculum.label}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <Form mode="edit" data={curriculum} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
