const years = [
   {
    one: [
      {
        "curricula_detail_id": 15483,
        "course_id": 6244,
        "code": "CHE 10",
        "title": "Chemistry for Engineers",
        "units": 4,
        "grade": "1.00",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 15485,
        "course_id": 6256,
        "code": "ENGG 10",
        "title": "Pre-Calculus",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 15488,
        "course_id": 6262,
        "code": "CPE 101_K12",
        "title": "Computer Engineering as a Discipline",
        "units": 1,
        "grade": "1.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 15489,
        "course_id": 6263,
        "code": "COMPE 02",
        "title": "Programming Logic and Design",
        "units": 2,
        "grade": "1.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 15490,
        "course_id": 7800,
        "code": "ENGL 01_N",
        "title": "Intensive English",
        "units": 3,
        "grade": "1.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 15491,
        "course_id": 5912,
        "code": "PE 01",
        "title": "PATH-FIT 1 (Movement Competency Training)",
        "units": 2,
        "grade": "1.00",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 15492,
        "course_id": 5911,
        "code": "NSTP 01",
        "title": "CWTS 1/ROTC 1",
        "units": 3,
        "grade": "2.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 18390,
        "course_id": 8187,
        "code": "MATH 34_A",
        "title": "Engineering Calculus I",
        "units": 4,
        "grade": "1.50",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 19271,
        "course_id": 8186,
        "code": "ENGG 10_A",
        "title": "Pre-Calculus for Engineers",
        "units": 3,
        "grade": "1.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 19307,
        "course_id": 6246,
        "code": "MATH 34",
        "title": "Engineering Calculus I",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 26002,
        "course_id": 8564,
        "code": "PATHFit 1",
        "title": "Movement Competency Training or MCT",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      }
    ],
    two: [
      {
        "curricula_detail_id": 16652,
        "course_id": 6250,
        "code": "PHY 10",
        "title": "Physics for Engineers",
        "units": 4,
        "grade": "1.50",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16654,
        "course_id": 3483,
        "code": "CPE 130",
        "title": "Discrete Mathematics for CpE",
        "units": 3,
        "grade": "1.50",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16656,
        "course_id": 334,
        "code": "CPE 100",
        "title": "Computer Hardware Fundamentals",
        "units": 1,
        "grade": "1.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16657,
        "course_id": 5906,
        "code": "SocSc 01",
        "title": "Readings in Philippine History",
        "units": 3,
        "grade": "1.50",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16658,
        "course_id": 5908,
        "code": "Math 01",
        "title": "Mathematics in the  Modern World",
        "units": 3,
        "grade": "1.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16659,
        "course_id": 5920,
        "code": "PE 02",
        "title": "PATH-FIT 2 (Fitness Training)",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": [
          {
            "course_id": 5912,
            "code": "PE 01",
            "title": "PATH-FIT 1 (Movement Competency Training)"
          }
        ]
      },
      {
        "curricula_detail_id": 16660,
        "course_id": 5919,
        "code": "NSTP 02",
        "title": "CWTS 2/ROTC 2",
        "units": 3,
        "grade": "1.50",
        "remarks": "Passed",
        "status": 3,
        "requisites": [
          {
            "course_id": 5911,
            "code": "NSTP 01",
            "title": "CWTS 1/ROTC 1"
          }
        ]
      },
      {
        "curricula_detail_id": 16754,
        "course_id": 7965,
        "code": "MATH 35_N",
        "title": "Engineering Calculus II",
        "units": 4,
        "grade": "1.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": [
          {
            "course_id": 8186,
            "code": "ENGG 10_A",
            "title": "Pre-Calculus for Engineers"
          }
        ]
      },
      {
        "curricula_detail_id": 16756,
        "course_id": 7966,
        "code": "CPE 112_N",
        "title": "Object Oriented programmimg for CpE",
        "units": 2,
        "grade": "1.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": [
          {
            "course_id": 6263,
            "code": "COMPE 02",
            "title": "Programming Logic and Design"
          }
        ]
      },
      {
        "curricula_detail_id": 22608,
        "course_id": 8911,
        "code": "PATHFit 2_A",
        "title": "Physical Activities Toward Health and Fitness 2: Fitness Training",
        "units": 2,
        "grade": "1.00",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      }
    ]
  },
  {
    one: [
      {
        "curricula_detail_id": 16757,
        "course_id": 1287,
        "code": "Math 40",
        "title": "Differential Equation",
        "units": 3,
        "grade": "2.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16759,
        "course_id": 6420,
        "code": "CPE 113_K12",
        "title": "Data Structure & Algorithms",
        "units": 2,
        "grade": "1.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16762,
        "course_id": 7785,
        "code": "IT 11",
        "title": "Living in the Information Technology  Era",
        "units": 3,
        "grade": "1.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16763,
        "course_id": 6366,
        "code": "IE 111",
        "title": "Engineering Economics",
        "units": 3,
        "grade": "2.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16764,
        "course_id": 5915,
        "code": "Philo 01",
        "title": "Ethics",
        "units": 3,
        "grade": "1.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16765,
        "course_id": 5909,
        "code": "Hum 01",
        "title": "Arts Appreciation",
        "units": 3,
        "grade": "1.75",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 16766,
        "course_id": 5942,
        "code": "PE 03",
        "title": "PATH-FIT 3",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16767,
        "course_id": 6248,
        "code": "CAD 11",
        "title": "Computer-Aided Drafting",
        "units": 1,
        "grade": "1.50",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 17470,
        "course_id": 6421,
        "code": "EE 121_K12",
        "title": "Electrical Circuits I",
        "units": 5,
        "grade": "1.50",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      },
      {
        "curricula_detail_id": 25388,
        "course_id": 8940,
        "code": "PATHFit 3_I",
        "title": "Physical Activities Towards Health and Fitness III (Dance)",
        "units": 2,
        "grade": "1.25",
        "remarks": "Passed",
        "status": 3,
        "requisites": []
      }
    ],
    two: [
      {
        "curricula_detail_id": 16769,
        "course_id": 6425,
        "code": "CPE 114_K12",
        "title": "Software Design",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16770,
        "course_id": 5905,
        "code": "Comm 01",
        "title": "Purposive Communication",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16771,
        "course_id": 6422,
        "code": "ECE 140_K12",
        "title": "Fundamentals of Electronic Circuits",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16772,
        "course_id": 5913,
        "code": "SocSc 02",
        "title": "Understanding the Self",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16773,
        "course_id": 7786,
        "code": "NATSC 13_n",
        "title": "Environmental Science",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16774,
        "course_id": 5974,
        "code": "PI 01",
        "title": "Life and Works of Rizal",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16775,
        "course_id": 5960,
        "code": "PE 04",
        "title": "PATH-FIT 4",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": [
          {
            "course_id": 5942,
            "code": "PE 03",
            "title": "PATH-FIT 3"
          }
        ]
      },
      {
        "curricula_detail_id": 16776,
        "course_id": 7971,
        "code": "CPE 137_N",
        "title": "Numerical Methods",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 22664,
        "course_id": 8597,
        "code": "PATHFit 4_C",
        "title": "Physical Activities Towards Health and Fitness IV (Sports)",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      }
    ]
  },
  {
    one: [
      {
        "curricula_detail_id": 16777,
        "course_id": 7895,
        "code": "CPE 116_N",
        "title": "System Development I",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16778,
        "course_id": 6428,
        "code": "CPE 115_K12",
        "title": "Operating System for CpE",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16779,
        "course_id": 6429,
        "code": "CPE 150_A",
        "title": "Data and Digital Communications",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16780,
        "course_id": 6430,
        "code": "CPE 160",
        "title": "Introduction to HDL",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16781,
        "course_id": 6431,
        "code": "CPE 161",
        "title": "Feedback and Control Systems",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16782,
        "course_id": 6432,
        "code": "CPE 162",
        "title": "Fundamentals of Mixed Signal and Sensors",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16783,
        "course_id": 6247,
        "code": "MATH 50_K12",
        "title": "Engineering Data Analysis",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16784,
        "course_id": 4684,
        "code": "CPE 121",
        "title": "Computer Engineering Drafting",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16785,
        "course_id": 6427,
        "code": "CPE 132_K12",
        "title": "Logic Circuits and Design",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 19687,
        "course_id": 3961,
        "code": "CpE 122",
        "title": "Computer Engineering Drafting and Design",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      }
    ],
    two: [
      {
        "curricula_detail_id": 16786,
        "course_id": 6433,
        "code": "CPE 170",
        "title": "Basic Occupational Health and Safety",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16787,
        "course_id": 6436,
        "code": "CPE 151_K12",
        "title": "Computer Networks and Security",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16788,
        "course_id": 6437,
        "code": "CPE 163",
        "title": "Microprocessors",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16789,
        "course_id": 7967,
        "code": "CPE 133_N",
        "title": "Advance Logic Circuits and Design",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": [
          {
            "course_id": 6427,
            "code": "CPE 132_K12",
            "title": "Logic Circuits and Design"
          }
        ]
      },
      {
        "curricula_detail_id": 16790,
        "course_id": 3959,
        "code": "CPE 190",
        "title": "Methods of Research",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16792,
        "course_id": 6438,
        "code": "CPE 192_K12",
        "title": "CpE Laws and Professional Practice",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16793,
        "course_id": 7896,
        "code": "CPE 117",
        "title": "System Development II",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16794,
        "course_id": 7788,
        "code": "SOCSC 12",
        "title": "The Entrepreneurial Mind",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16795,
        "course_id": 7446,
        "code": "CPE 180_k12",
        "title": "Microelectronics 1",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      }
    ],
    "3": [
      {
        "curricula_detail_id": 16796,
        "course_id": 6440,
        "code": "CpE 194_K12",
        "title": "CpE On the Job Training (240 Hrs)",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      }
    ]
  },
  {
    one: [
      {
        "curricula_detail_id": 16797,
        "course_id": 6441,
        "code": "CPE 164",
        "title": "Embedded Systems",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16798,
        "course_id": 6442,
        "code": "CPE 134_K12",
        "title": "Computer Architecture and Organization",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16799,
        "course_id": 6443,
        "code": "CPE 165",
        "title": "Emerging Technologies in CpE",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16800,
        "course_id": 7968,
        "code": "CPE 200A_N",
        "title": "Undegraduate Thesis I",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": [
          {
            "course_id": 6437,
            "code": "CPE 163",
            "title": "Microprocessors"
          }
        ]
      },
      {
        "curricula_detail_id": 16801,
        "course_id": 6445,
        "code": "CPE 166",
        "title": "Digital Signal Processing",
        "units": 4,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16802,
        "course_id": 5914,
        "code": "STS 01",
        "title": "Science, Technology, and Society",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16803,
        "course_id": 7447,
        "code": "CPE 181_k12",
        "title": "Microelectronics 2",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      }
    ],
    two: [
      {
        "curricula_detail_id": 16804,
        "course_id": 7969,
        "code": "CPE 200B_N",
        "title": "Undergraduate Thesis II",
        "units": 2,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": [
          {
            "course_id": 7968,
            "code": "CPE 200A_N",
            "title": "Undegraduate Thesis I"
          }
        ]
      },
      {
        "curricula_detail_id": 16805,
        "course_id": 6449,
        "code": "CPE 199_K12",
        "title": "Seminars and Fieldtrips",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16806,
        "course_id": 7448,
        "code": "CPE 182_k12",
        "title": "Microelectronics III",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16807,
        "course_id": 6446,
        "code": "TCEP 1_K12",
        "title": "Technical Competency and Enhancement Program I",
        "units": 1,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16808,
        "course_id": 5907,
        "code": "SocSc 03",
        "title": "The Contemporary World",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      },
      {
        "curricula_detail_id": 16809,
        "course_id": 7970,
        "code": "ENGG 101_N",
        "title": "Technopreneurship 101",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": [
          {
            "course_id": 7788,
            "code": "SOCSC 12",
            "title": "The Entrepreneurial Mind"
          }
        ]
      },
      {
        "curricula_detail_id": 26094,
        "course_id": 9010,
        "code": "ENGG 101_c",
        "title": "Technopreneurship",
        "units": 3,
        "grade": "",
        "remarks": "",
        "status": 1,
        "requisites": []
      }
    ]
  }
]

let list = [];
for(let year of years){
  const {one, two} = year;
  for(let subjct of one){
    list.push({
      code: subjct.code,
      title: subjct.title,
      units: subjct.units,
    });
    
  }
  
  for(let subjct of two){
    list.push({
      code: subjct.code,
      title: subjct.title,
      units: subjct.units,
    });
  }
  
}

console.log(list);
