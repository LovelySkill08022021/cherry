import { db } from "../index";
import { subjects } from "../schema";

async function seed() {
    try {
        const all_subjects = [
            { code: "CHE 10", title: "Chemistry for Engineers", units: 4 },
            { code: "ENGG 10", title: "Pre-Calculus", units: 3 },
            {
                code: "CPE 101_K12",
                title: "Computer Engineering as a Discipline",
                units: 1,
            },
            {
                code: "COMPE 02",
                title: "Programming Logic and Design",
                units: 2,
            },
            { code: "ENGL 01_N", title: "Intensive English", units: 3 },
            {
                code: "PE 01",
                title: "PATH-FIT 1 (Movement Competency Training)",
                units: 2,
            },
            { code: "NSTP 01", title: "CWTS 1/ROTC 1", units: 3 },
            { code: "MATH 34_A", title: "Engineering Calculus I", units: 4 },
            {
                code: "ENGG 10_A",
                title: "Pre-Calculus for Engineers",
                units: 3,
            },
            { code: "MATH 34", title: "Engineering Calculus I", units: 3 },
            {
                code: "PATHFit 1",
                title: "Movement Competency Training or MCT",
                units: 2,
            },
            { code: "PHY 10", title: "Physics for Engineers", units: 4 },
            {
                code: "CPE 130",
                title: "Discrete Mathematics for CpE",
                units: 3,
            },
            {
                code: "CPE 100",
                title: "Computer Hardware Fundamentals",
                units: 1,
            },
            {
                code: "SocSc 01",
                title: "Readings in Philippine History",
                units: 3,
            },
            {
                code: "Math 01",
                title: "Mathematics in the  Modern World",
                units: 3,
            },
            { code: "PE 02", title: "PATH-FIT 2 (Fitness Training)", units: 2 },
            { code: "NSTP 02", title: "CWTS 2/ROTC 2", units: 3 },
            { code: "MATH 35_N", title: "Engineering Calculus II", units: 4 },
            {
                code: "CPE 112_N",
                title: "Object Oriented programmimg for CpE",
                units: 2,
            },
            {
                code: "PATHFit 2_A",
                title: "Physical Activities Toward Health and Fitness 2: Fitness Training",
                units: 2,
            },
            { code: "Math 40", title: "Differential Equation", units: 3 },
            {
                code: "CPE 113_K12",
                title: "Data Structure & Algorithms",
                units: 2,
            },
            {
                code: "IT 11",
                title: "Living in the Information Technology  Era",
                units: 3,
            },
            { code: "IE 111", title: "Engineering Economics", units: 3 },
            { code: "Philo 01", title: "Ethics", units: 3 },
            { code: "Hum 01", title: "Arts Appreciation", units: 3 },
            { code: "PE 03", title: "PATH-FIT 3", units: 2 },
            { code: "CAD 11", title: "Computer-Aided Drafting", units: 1 },
            { code: "EE 121_K12", title: "Electrical Circuits I", units: 5 },
            {
                code: "PATHFit 3_I",
                title: "Physical Activities Towards Health and Fitness III (Dance)",
                units: 2,
            },
            { code: "CPE 114_K12", title: "Software Design", units: 4 },
            { code: "Comm 01", title: "Purposive Communication", units: 3 },
            {
                code: "ECE 140_K12",
                title: "Fundamentals of Electronic Circuits",
                units: 4,
            },
            { code: "SocSc 02", title: "Understanding the Self", units: 3 },
            { code: "NATSC 13_n", title: "Environmental Science", units: 3 },
            { code: "PI 01", title: "Life and Works of Rizal", units: 3 },
            { code: "PE 04", title: "PATH-FIT 4", units: 2 },
            { code: "CPE 137_N", title: "Numerical Methods", units: 3 },
            {
                code: "PATHFit 4_C",
                title: "Physical Activities Towards Health and Fitness IV (Sports)",
                units: 2,
            },
            { code: "CPE 116_N", title: "System Development I", units: 1 },
            {
                code: "CPE 115_K12",
                title: "Operating System for CpE",
                units: 3,
            },
            {
                code: "CPE 150_A",
                title: "Data and Digital Communications",
                units: 3,
            },
            { code: "CPE 160", title: "Introduction to HDL", units: 1 },
            {
                code: "CPE 161",
                title: "Feedback and Control Systems",
                units: 3,
            },
            {
                code: "CPE 162",
                title: "Fundamentals of Mixed Signal and Sensors",
                units: 3,
            },
            {
                code: "MATH 50_K12",
                title: "Engineering Data Analysis",
                units: 3,
            },
            {
                code: "CPE 121",
                title: "Computer Engineering Drafting",
                units: 1,
            },
            {
                code: "CPE 132_K12",
                title: "Logic Circuits and Design",
                units: 4,
            },
            {
                code: "CpE 122",
                title: "Computer Engineering Drafting and Design",
                units: 1,
            },
            {
                code: "CPE 170",
                title: "Basic Occupational Health and Safety",
                units: 3,
            },
            {
                code: "CPE 151_K12",
                title: "Computer Networks and Security",
                units: 4,
            },
            { code: "CPE 163", title: "Microprocessors", units: 4 },
            {
                code: "CPE 133_N",
                title: "Advance Logic Circuits and Design",
                units: 1,
            },
            { code: "CPE 190", title: "Methods of Research", units: 2 },
            {
                code: "CPE 192_K12",
                title: "CpE Laws and Professional Practice",
                units: 2,
            },
            { code: "CPE 117", title: "System Development II", units: 1 },
            { code: "SOCSC 12", title: "The Entrepreneurial Mind", units: 3 },
            { code: "CPE 180_k12", title: "Microelectronics 1", units: 3 },
            { code: "CPE 164", title: "Embedded Systems", units: 4 },
            {
                code: "CPE 134_K12",
                title: "Computer Architecture and Organization",
                units: 4,
            },
            {
                code: "CPE 165",
                title: "Emerging Technologies in CpE",
                units: 3,
            },
            { code: "CPE 200A_N", title: "Undegraduate Thesis I", units: 1 },
            { code: "CPE 166", title: "Digital Signal Processing", units: 4 },
            {
                code: "STS 01",
                title: "Science, Technology, and Society",
                units: 3,
            },
            { code: "CPE 181_k12", title: "Microelectronics 2", units: 3 },
            { code: "CPE 200B_N", title: "Undergraduate Thesis II", units: 2 },
            { code: "CPE 199_K12", title: "Seminars and Fieldtrips", units: 1 },
            { code: "CPE 182_k12", title: "Microelectronics III", units: 3 },
            {
                code: "TCEP 1_K12",
                title: "Technical Competency and Enhancement Program I",
                units: 1,
            },
            { code: "SocSc 03", title: "The Contemporary World", units: 3 },
            { code: "ENGG 101_N", title: "Technopreneurship 101", units: 3 },
            { code: "ENGG 101_c", title: "Technopreneurship", units: 3 },
        ];

        await db.insert(subjects).values(all_subjects);
        console.log("✅ Subjects seeded successfully!");
    } catch (error) {
        console.error("❌ Seeding subjects failed:", error);
    }
}

seed();
