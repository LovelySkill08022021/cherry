import {
    curricula,
    curriculum_students,
    curriculum_subjects,
    grades,
    prerequisites,
    students,
    subjects,
} from "./db/schema";

type Curriculum = typeof curricula.$inferSelect;
type CurriculumForm = typeof curricula.$inferInsert;

type CurriculumSubjectForm = typeof curriculum_subjects.$inferInsert;
type CurriculumSubject = typeof curriculum_subjects.$inferSelect;

type CurriculumStudentForm = typeof curriculum_students.$inferInsert;
type CurriculumStudent = typeof curriculum_students.$inferSelect;

type Grade = typeof grades.$inferSelect;
type GradeForm = typeof grades.$inferInsert;

type Subject = typeof subjects.$inferSelect;
type SubjectForm = typeof subjects.$inferInsert;

type Student = typeof students.$inferSelect;
type StudentForm = typeof students.$inferInsert;

type Prerequisite = typeof prerequisites.$inferSelect;
type PrerequisiteForm = typeof prerequisites.$inferInsert;
