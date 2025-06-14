import {
    bigint,
    char,
    float,
    mysqlTable,
    tinyint,
    varchar,
} from "drizzle-orm/mysql-core";

export const curricula = mysqlTable("curricula", {
    id: bigint({ mode: "number", unsigned: true })
        .primaryKey()
        .autoincrement()
        .notNull(),
    label: varchar({ length: 50 }).notNull(),
});

export const subjects = mysqlTable("subjects", {
    id: bigint({ mode: "number", unsigned: true })
        .primaryKey()
        .autoincrement()
        .notNull(),
    code: char({ length: 20 }).notNull(),
    title: varchar({ length: 200 }).notNull(),
    units: tinyint().notNull(),
});

export const curriculum_subjects = mysqlTable("curriculum_subjects", {
    id: bigint({ mode: "number", unsigned: true })
        .primaryKey()
        .autoincrement()
        .notNull(),
    curriculum_id: bigint({ mode: "number", unsigned: true }).notNull(),
    subject_id: bigint({ mode: "number", unsigned: true }),
    semester: tinyint().notNull(),
    year_level: tinyint().notNull(),
});

export const prerequisites = mysqlTable("prerequisites", {
    id: bigint({ mode: "number", unsigned: true })
        .primaryKey()
        .autoincrement()
        .notNull(),
    curriculum_id: bigint({ mode: "number", unsigned: true }).notNull(),
    subject_id: bigint({ mode: "number", unsigned: true }).notNull(),
    prerequisite: bigint({
        mode: "number",
        unsigned: true,
    }).notNull(),
    type: char({ length: 5 }),
});

export const students = mysqlTable("students", {
    id: bigint({ mode: "number", unsigned: true })
        .primaryKey()
        .autoincrement()
        .notNull(),
    student_number: char({ length: 20 }).notNull(),
    last_name: char({ length: 50 }).notNull(),
    first_name: char({ length: 50 }).notNull(),
    middle_name: char({ length: 50 }),
    standing: tinyint().notNull().default(1),
    year_level: tinyint().notNull().default(1),
    section: char({ length: 2 }),
});

export const curriculum_students = mysqlTable("curriculum_students", {
    id: bigint({ mode: "number", unsigned: true })
        .primaryKey()
        .autoincrement()
        .notNull(),
    student_id: bigint({ mode: "number", unsigned: true }).notNull(),
    curriculum_id: bigint({ mode: "number", unsigned: true }).notNull(),
});

export const grades = mysqlTable("grades", {
    id: bigint({ mode: "number", unsigned: true })
        .primaryKey()
        .autoincrement()
        .notNull(),
    student_id: bigint({ mode: "number", unsigned: true }).notNull(),
    subject_id: bigint({ mode: "number", unsigned: true }).notNull(),
    value: float().notNull(),
    no_of_takes: tinyint({ unsigned: true }).notNull().default(1),
});
