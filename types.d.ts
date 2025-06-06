import { curricula, curriculum_subjects, grades, subjects } from "./db/schema";

type Curriculum = typeof curricula.$inferSelect;
type CurriculumForm = typeof curricula.$inferInsert;

type CurriculumSubjectsForm = typeof curriculum_subjects.$inferInsert;
type CurriculumSubjects = typeof curriculum_subjects.$inferSelect;

type Grade = typeof grades.$inferSelect;
type GradeForm = typeof grades.$inferInsert;

type Subject = typeof subjects.$inferSelect;
type SubjectForm = typeof subjects.$inferInsert;
